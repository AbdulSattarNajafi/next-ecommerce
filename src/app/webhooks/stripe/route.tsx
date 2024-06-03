import db from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import PurchaseReceiptEmail from '@/email/PurchaseReceipt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get('stripe-signature') as string,
        process.env.STRIP_WEBHOOK_SECRET as string
    );

    if (event.type === 'charge.succeeded') {
        const charge = event.data.object;
        const productId = charge.metadata.productId;
        const email = charge.billing_details.email;
        const pricePaidInCents = charge.amount;

        const product = await db.product.findUnique({ where: { id: productId } });

        if (product == null || email == null) {
            return new NextResponse('Bad request', { status: 400 });
        }

        const userField = {
            email,
            orders: { create: { productId, pricePaidInCents } },
        };

        const {
            orders: [order],
        } = await db.user.upsert({
            where: { email },
            create: userField,
            update: userField,
            select: { orders: { orderBy: { createdAt: 'desc' }, take: 1 } },
        });

        const downloadVerification = await db.downloadVerification.create({
            data: { productId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
        });

        await resend.emails.send({
            from: `Support <${process.env.SENDER_EMAIL}>`,
            to: email,
            subject: 'Confirmation Order',
            react: (
                <PurchaseReceiptEmail
                    order={order}
                    product={product}
                    downloadVerificationId={downloadVerification.id}
                />
            ),
        });
    }

    return new NextResponse();
}

// re_F4sDJs9n_BCJJaAoAT7JxRTxK2WdYEHFG;

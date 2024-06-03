import { Body, Container, Head, Heading, Html, Preview, Tailwind } from '@react-email/components';
import OrderInformation from './components/OrderInformation';

type PurchaseReceiptEmailProps = {
    order: {
        id: string;
        createdAt: Date;
        pricePaidInCents: number;
    };
    product: {
        name: string;
        imagePath: string;
        description: string;
    };
    downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 223.32,
    },
    product: {
        name: 'Product Name',
        imagePath:
            '/products/7cc4410a-ca10-4459-b021-d33e3933c5ab-campaign-creators-gMsnXqILjp4-unsplash.jpg',
        description: 'Some description text',
    },
    downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
    order,
    product,
    downloadVerificationId,
}: PurchaseReceiptEmailProps) {
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head />
                <Body className='font-sans bg-white'>
                    <Container className='max-w-xl'>
                        <Heading>Purshace Receipt</Heading>
                        <OrderInformation
                            order={order}
                            product={product}
                            downloadVerificationId={downloadVerificationId}
                        />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

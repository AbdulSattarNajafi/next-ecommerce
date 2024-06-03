import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
} from '@react-email/components';
import OrderInformation from './components/OrderInformation';
import React from 'react';

type OrderHistoryEmailProps = {
    orders: {
        id: string;
        createdAt: Date;
        pricePaidInCents: number;
        downloadVerificationId: string;
        product: {
            name: string;
            imagePath: string;
            description: string;
        };
    }[];
};

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 223.32,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: 'Product Name',
                imagePath:
                    '/products/7cc4410a-ca10-4459-b021-d33e3933c5ab-campaign-creators-gMsnXqILjp4-unsplash.jpg',
                description: 'Some description text',
            },
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 2243.32,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: 'Product Name 2',
                imagePath:
                    '/products/c584d98d-747f-437f-8538-f695d1dc4230-halima-bouchouicha-tFb0S3RoVEs-unsplash.jpg',
                description: 'Some description text of product 2',
            },
        },
    ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className='font-sans bg-white'>
                    <Container className='max-w-xl'>
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => {
                            return (
                                <React.Fragment key={order.id}>
                                    <OrderInformation
                                        order={order}
                                        product={order.product}
                                        downloadVerificationId={order.downloadVerificationId}
                                    />
                                    {index < orders.length - 1 && <Hr />}
                                </React.Fragment>
                            );
                        })}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

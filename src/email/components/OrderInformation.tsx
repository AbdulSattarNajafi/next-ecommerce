import { formatCurrency } from '@/lib/formatters';
import { Button, Column, Img, Row, Section, Text } from '@react-email/components';

type OrderInformationProps = {
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

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

const OrderInformation = ({ order, product, downloadVerificationId }: OrderInformationProps) => {
    return (
        <>
            <Section>
                <Row>
                    <Column>
                        <Text className='mb-0 text-gray-700 whitespace-nowrap text-nowrap mr-4'>
                            Order ID
                        </Text>
                        <Text className='mt-0 mr-4'>{order.id}</Text>
                    </Column>
                    <Column>
                        <Text className='mb-0 text-gray-700 whitespace-nowrap text-nowrap mr-4'>
                            Purchase on
                        </Text>
                        <Text className='mt-0 mr-4'>{dateFormatter.format(order.createdAt)}</Text>
                    </Column>
                    <Column>
                        <Text className='mb-0 text-gray-700 whitespace-nowrap text-nowrap mr-4'>
                            Price Paid
                        </Text>
                        <Text className='mt-0 mr-4'>
                            {formatCurrency(order.pricePaidInCents / 100)}
                        </Text>
                    </Column>
                </Row>
            </Section>

            <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 m-4'>
                <Img
                    className='rounded-lg'
                    width='100%'
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
                    alt={product.name}
                />
                <Row className='mt-8'>
                    <Column className='align-bottom'>
                        <Text className='tex-lg font-bold m-0 mr-4'>{product.name}</Text>
                    </Column>
                    <Column align='right'>
                        <Button
                            href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
                            className='text-lg text-white bg-black px-6 py-2 rounded'
                        >
                            Download
                        </Button>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Text className='text-gray-500 mb-0'>{product.description}</Text>
                    </Column>
                </Row>
            </Section>
        </>
    );
};

export default OrderInformation;

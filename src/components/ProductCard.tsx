import { formatCurrency } from '@/lib/formatters';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

type ProductCardProps = {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
};

const ProductCard = ({ id, imagePath, name, priceInCents, description }: ProductCardProps) => {
    return (
        <Card className='flex flex-col overflow-hidden'>
            <div className='relative w-full h-auto aspect-video'>
                <Image src={imagePath} fill alt={name} />
            </div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
            </CardHeader>

            <CardContent className='flex-grow'>
                <p className='line-clamp-4'>{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size='lg' className='w-full'>
                    <Link href={`/products/${id}/purchase`}>Purchase</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;

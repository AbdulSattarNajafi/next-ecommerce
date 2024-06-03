import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Button } from '@/components/ui/button';
import db from '@/db/db';
import { cache } from '@/lib/cache';
import { Product } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const getMostPopularProducts = cache(
    () => {
        return db.product.findMany({
            where: { isAvailableForPurchase: true },
            orderBy: { orders: { _count: 'desc' } },
            take: 6,
        });
    },
    ['/', 'getMostPopularProducts'],
    { revalidate: 1000 * 60 * 60 * 24 }
);

const getNewestProducts = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
    });
}, ['/', 'getNewestProducts']);

const HomePage = () => {
    return (
        <main className='space-y-12'>
            <ProductGridSection productFetcher={getMostPopularProducts} title='Most Popular' />
            <ProductGridSection productFetcher={getNewestProducts} title='Newest' />
        </main>
    );
};

export default HomePage;

type ProductGridSectionProps = {
    productFetcher: () => Promise<Product[]>;
    title: string;
};

function ProductGridSection({ productFetcher, title }: ProductGridSectionProps) {
    return (
        <div className='space-y-4'>
            <div className='flex gap-4'>
                <h2 className='text-3xl font-bold'>{title}</h2>
                <Button variant='outline' asChild>
                    <Link href='/products' className='space-x-2'>
                        <span>View All</span>
                        <ArrowRight className='size-4' />
                    </Link>
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Suspense
                    fallback={
                        <>
                            {Array.from({ length: 3 }, (_, index) => {
                                return <ProductCardSkeleton key={index} />;
                            })}
                        </>
                    }
                >
                    <ProductSuspense productFetcher={productFetcher} />
                </Suspense>
            </div>
        </div>
    );
}

async function ProductSuspense({ productFetcher }: { productFetcher: () => Promise<Product[]> }) {
    return (await productFetcher()).map((product) => <ProductCard key={product.id} {...product} />);
}
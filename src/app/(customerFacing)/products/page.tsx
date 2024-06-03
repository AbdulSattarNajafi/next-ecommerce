import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import React, { Suspense } from 'react';
import { Product } from '@prisma/client';
import db from '@/db/db';
import { cache } from '@/lib/cache';

const getProducts = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: {
            name: 'asc',
        },
    });
}, ['/products', 'getProducts']);

const ProductsPage = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Suspense
                fallback={
                    <>
                        {Array.from({ length: 6 }, (_, index) => {
                            return <ProductCardSkeleton key={index} />;
                        })}
                    </>
                }
            >
                <ProductsSuspense />
            </Suspense>
        </div>
    );
};

export default ProductsPage;

async function ProductsSuspense() {
    new Promise((resolve) => setTimeout(resolve, 2000));
    const products = await getProducts();

    return products.map((product) => <ProductCard key={product.id} {...product} />);
}

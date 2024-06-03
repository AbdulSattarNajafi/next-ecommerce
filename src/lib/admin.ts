import db from '@/db/db';

export async function getSalesData() {
    const data = await db.order.aggregate({ _sum: { pricePaidInCents: true }, _count: true });

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count,
    };
}

export async function getUsersData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ]);

    return {
        userCount,
        averageValuePerUser:
            userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    };
}

export async function getProductsData() {
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } }),
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return { activeCount, inactiveCount };
}

export async function getProducts() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } },
        },
        orderBy: { name: 'asc' },
    });

    return products;
}

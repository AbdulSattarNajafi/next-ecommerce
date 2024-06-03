import { Button } from '@/components/ui/button';
import PageHeader from '../_components/PageHeader';
import Link from 'next/link';
import db from '@/db/db';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { DeleteDropdownItem } from './_components/OrderActions';

function getOrders() {
    return db.order.findMany({
        select: {
            id: true,
            pricePaidInCents: true,
            product: { select: { name: true } },
            user: { select: { email: true } },
        },
        orderBy: { createdAt: 'desc' },
    });
}

const OrdersPage = () => {
    return (
        <>
            <PageHeader>Sales</PageHeader>
            <OrdersTable />
        </>
    );
};

export default OrdersPage;

async function OrdersTable() {
    const orders = await getOrders();

    if (orders.length === 0) return <p className='text-cebter'>No order found</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Price Paid</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>{formatCurrency(order.pricePaidInCents / 100)}</TableCell>

                        <TableCell className='text-center'>
                            <DropdownMenuTrigger>
                                <MoreVertical />
                                <span className='sr-only'>Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DeleteDropdownItem id={order.id} />
                            </DropdownMenuContent>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

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
import { DeleteDropdownItem } from './_components/UserActions';

function getUsers() {
    return db.user.findMany({
        select: { id: true, email: true, orders: { select: { pricePaidInCents: true } } },
    });
}

const UsersPage = () => {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <UsersTable />
        </>
    );
};

export default UsersPage;

async function UsersTable() {
    const users = await getUsers();

    if (users.length === 0) return <p className='text-cebter'>No user found</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatNumber(user.orders.length)}</TableCell>
                        <TableCell>
                            {formatCurrency(
                                user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100
                            )}
                        </TableCell>

                        <TableCell className='text-center'>
                            <DropdownMenuTrigger>
                                <MoreVertical />
                                <span className='sr-only'>Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DeleteDropdownItem id={user.id} />
                            </DropdownMenuContent>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

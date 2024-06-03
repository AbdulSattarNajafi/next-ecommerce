import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getProducts } from '@/lib/admin';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { CheckCircle2, MoreVertical, XCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { ActiveToggleDropdownItem, DeleteDropdownItem } from './ProductActions';

const ProductTable = async () => {
    const products = await getProducts();

    if (products.length === 0) {
        return <p className='text-center'>No products found!</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => {
                    return (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.isAvailableForPurchase ? (
                                    <>
                                        <span className='sr-only'>Available</span>
                                        <CheckCircle2 />
                                    </>
                                ) : (
                                    <>
                                        <span className='sr-only'>Unavailable</span>
                                        <XCircleIcon className='stroke-destructive' />
                                    </>
                                )}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                            <TableCell>{formatNumber(product._count.orders)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical />
                                        <span className='sr-only'>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <a
                                                download
                                                href={`/admin/products/${product.id}/download`}
                                            >
                                                Download
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <ActiveToggleDropdownItem
                                            id={product.id}
                                            isAvailableForPurchase={product.isAvailableForPurchase}
                                        />
                                        <DropdownMenuSeparator />
                                        <DeleteDropdownItem
                                            id={product.id}
                                            disabled={product._count.orders > 0}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default ProductTable;

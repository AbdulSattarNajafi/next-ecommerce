'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteProduct, toggleProductAvailablity } from '../../_actions/products';

export const ActiveToggleDropdownItem = ({
    id,
    isAvailableForPurchase,
}: {
    id: string;
    isAvailableForPurchase: boolean;
}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await toggleProductAvailablity(id, !isAvailableForPurchase);
                    router.refresh();
                })
            }
        >
            {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
    );
};

export const DeleteDropdownItem = ({ id, disabled }: { id: string; disabled: boolean }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() =>
                startTransition(async () => {
                    await deleteProduct(id);
                    router.refresh();
                })
            }
        >
            Delete
        </DropdownMenuItem>
    );
};

'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteOrder } from '../../_actions/orders';

export const DeleteDropdownItem = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await deleteOrder(id);
                    router.refresh();
                })
            }
        >
            Delete
        </DropdownMenuItem>
    );
};

'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteUser } from '../../_actions/user';

export const DeleteDropdownItem = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await deleteUser(id);
                    router.refresh();
                })
            }
        >
            Delete
        </DropdownMenuItem>
    );
};

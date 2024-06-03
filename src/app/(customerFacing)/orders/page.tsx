'use client';

import { emailOrderHistory } from '@/actions/orders';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';

const OrdersPage = () => {
    const [data, action] = useFormState(emailOrderHistory, {});

    return (
        <form action={action} className='max-w-2xl w-full mx-auto'>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        Enter your email and we will email you your orders history and download
                        links
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' name='email' id='email' required />
                    </div>
                    {data.error && <div className='text-destructive'>{data.error}</div>}
                </CardContent>
                <CardFooter>{data.message ? <p>{data.message}</p> : <SubmitButton />}</CardFooter>
            </Card>
        </form>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button className='w-full' size='lg' disabled={pending} type='submit'>
            {pending ? 'sending...' : 'Send'}
        </Button>
    );
}

export default OrdersPage;

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/formatters';
import { useState } from 'react';
import { addProduct, updateProduct } from '../../_actions/products';
import SubmitButton from './SubmitButton';
import { useFormState } from 'react-dom';
import { Product } from '@prisma/client';
import Image from 'next/image';

const ProductForm = ({ product }: { product?: Product | null }) => {
    const [error, action] = useFormState(
        product == null ? addProduct : updateProduct.bind(null, product.id),
        {}
    );
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

    return (
        <form className='space-y-8' action={action}>
            <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                    type='text'
                    id='name'
                    name='name'
                    defaultValue={product?.name || ''}
                    required
                />
                {error.name && <div className='text-destructive'>{error.name}</div>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor='priceInCents'>Price In Cents</Label>
                <Input
                    type='number'
                    id='priceInCents'
                    name='priceInCents'
                    required
                    value={priceInCents}
                    onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
                />
                <div className='text-muted-foreground'>
                    {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error.priceInCents && <div className='text-destructive'>{error.priceInCents}</div>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                    id='description'
                    name='description'
                    defaultValue={product?.description || ''}
                    required
                />
                {error.description && <div className='text-destructive'>{error.description}</div>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor='file'>File</Label>
                <Input type='file' id='file' name='file' required={product == null} />
                {product != null && <div className='text-muted-foreground'>{product.filePath}</div>}
                {error.file && <div className='text-destructive'>{error.file}</div>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='file' id='image' name='image' required={product == null} />
                {product != null && (
                    <Image src={product.imagePath} width={200} height={200} alt={product.name} />
                )}
                {error.image && <div className='text-destructive'>{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    );
};

export default ProductForm;

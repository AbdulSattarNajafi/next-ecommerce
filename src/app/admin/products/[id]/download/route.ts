import db from '@/db/db';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const product = await db.product.findUnique({
        where: { id },
        select: { filePath: true, name: true },
    });

    if (product == null) return notFound();

    const { size } = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extenstion = product.filePath.split('.').pop();

    return new NextResponse(file, {
        headers: {
            'Content-Disposition': `attachment; filename="${product.name}.${extenstion}"`,
            'Content-Length': size.toString(),
        },
    });
}

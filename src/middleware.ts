import { NextRequest, NextResponse } from 'next/server';
import { isValidPassword } from './lib/isValidPassword';

export async function middleware(request: NextRequest) {
    if ((await isAuthenticated(request)) === false) {
        return new NextResponse('Unauthorized', {
            status: 401,
            headers: {
                'www-Authenticate': 'Basic',
            },
        });
    }
}

async function isAuthenticated(request: NextRequest) {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');

    if (authHeader == null) return false;

    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');

    return (
        username === process.env.ADMIN_USERNAME &&
        (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))
    );
}

export const config = {
    matcher: '/admin/:path*',
};

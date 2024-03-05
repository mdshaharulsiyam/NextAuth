
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const requestForNextAuth = {
        headers: {
            cookie: request.headers.get('cookie'),
        },
    };
    const session = await getSession({ req: requestForNextAuth });
    // console.log(session)
    if (request.nextUrl.pathname === '/' && !session?.user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && session?.user) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/:path*', '/',]
}
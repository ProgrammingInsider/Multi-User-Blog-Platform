import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);

export async function middleware(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        await jwtVerify(accessToken, secret);
        return NextResponse.next();
    } catch (err: unknown) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/create-post/:path*','/dashboard/:path*','/subscribers/:path*'],
};



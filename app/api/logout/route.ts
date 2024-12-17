import { NextResponse } from 'next/server';

export const GET = () => {
    const response = NextResponse.json({ isLoggedOut: true });
    response.cookies.set('accessToken', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0), // Expire immediately
    });
    return response;
};

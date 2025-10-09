import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';

    // Public paths that anyone can access
    const publicPaths = ['/login', '/signup'];

    // Protected paths that require login
    const protectedPaths = ['/profile'];

    const isPublic = publicPaths.includes(path);
    const isProtected = protectedPaths.some(p => path.startsWith(p));

    // If user is logged in and tries to access a public page, redirect home
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // If user is not logged in and tries to access a protected page, redirect to login
    if (!isPublic && isProtected && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }


    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',           // Home page
        '/profile/:path*', // Match all dynamic profile routes like /profile/123
        '/login',
        '/signup',
    ],
};

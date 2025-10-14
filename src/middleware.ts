import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ✅ allow verifyemail to always pass through (no redirect)
  const isVerifyEmailPath = path.startsWith('/verifyemail');
  const isPublicPath = path === '/login' || path === '/signup';

  const token = request.cookies.get('token')?.value;

  // 🚫 Logged-in users trying to access login/signup → redirect home
  if (!isVerifyEmailPath && isPublicPath && token && token !== '' && token !== 'undefined') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // 🚫 Not logged-in users trying to access protected paths → redirect login
  if (!isPublicPath && !isVerifyEmailPath && (!token || token === '' || token === 'undefined')) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // ✅ Everything else continues
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup', '/verifyemail/:path*'],
};

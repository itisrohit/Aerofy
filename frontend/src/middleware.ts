import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtVerify} from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
export async function middleware(request: NextRequest) {
     console.log("Cookies in request:", request.cookies.getAll());
    let isAuthenticated = false;
    const authCookie = request.cookies.get('token');
    console.log("Auth cookie found:", authCookie);
    
    if (authCookie?.value && authCookie.value !== 'undefined') {
        try {
            const secret = new TextEncoder().encode(JWT_SECRET);
            await jwtVerify(authCookie.value, secret);
            isAuthenticated = true;
        } catch (error) {
            console.error("JWT verification failed:", error);
            isAuthenticated = false;
        }
    }
    
    const protectedPaths = ['/send', '/receive', '/profile', '/adrop'];
    const authPaths = ['/auth'];

    const path = request.nextUrl.pathname;

    const isProtectedPath = protectedPaths.some(route => path === route || path.startsWith(`${route}/`));
    const isAuthRoute = authPaths.some(route => path === route || path.startsWith(`${route}/`));

    // Redirect unauthenticated users from protected routes to login
    if (isProtectedPath && !isAuthenticated) {
        const redirectUrl = new URL('/auth', request.url);
        redirectUrl.searchParams.set('from', path);
        return NextResponse.redirect(redirectUrl);
    }
    
    // Redirect authenticated users from auth routes to app
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/send', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/send', '/send/:path*',
    '/receive', '/receive/:path*', 
    '/profile', '/profile/:path*',
    '/adrop', '/adrop/:path*',
    '/auth', '/auth/:path*'
  ]
};
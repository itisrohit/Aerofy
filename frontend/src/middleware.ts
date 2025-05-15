import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
export async function middleware(request: NextRequest) {
    let isAuthenticated = false;
   try {
        
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
                cookie: request.headers.get('cookie') || ''
            }
        });
        console.log("cookieResponse", response)
        if (response.ok) {
            const data = await response.json();
            isAuthenticated = data.verified === true;
        }
    } catch (error) {
        console.error("Auth verification failed:", error);
        isAuthenticated = false;
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

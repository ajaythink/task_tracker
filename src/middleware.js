import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
   

  const isPublicPath = path === '/auth/login' || path === '/auth/register';
   
  const token = request.cookies.get('token')?.value || ""; // Get the token from cookies

  if (isPublicPath && token) {
    // Clear the token cookie and allow access to the public path
    const response = NextResponse.next(); // Allow rendering the requested page
    response.cookies.delete('token'); // Clear the token cookie
    return response;
  }

  if (!isPublicPath && !token) {
    // Redirect to login if accessing a protected path without a token
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  // Allow access to protected paths if the token exists
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: ['/auth/login', '/auth/register', '/dashboard/:path*'],
};
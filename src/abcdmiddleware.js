// import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside

// export function middleware(request) {
  
//   const path = request.nextUrl.pathname;
//   console.log("path: ", path);
//   const isPublicPath = path === '/auth/login' || path === '/auth/register'; 
//   console.log("middleware called" );
//   const token = request.cookies.get('token')?.value || ""; // Get the token from cookies

//   if(isPublicPath && token){
//     return NextResponse.redirect(new URL (path, request.nextUrl));
//   }

//   if(!isPublicPath && !token){
//     return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
//   }
//   return NextResponse.redirect(new URL('/dashboard/profile', request.url))
// }
 
// See "Matching Paths" below to learn more
// purpose of this config is to match the paths that we want to protect with middleware 
// and also the paths that we want to redirect to the login page if the user is not authenticated
// for example, if the user is not authenticated and tries to access the dashboard page, they will be redirected to the login page    
// export const config = {
//   matcher:['/auth/login', '/auth/register', '/dashboard/:path*'],
// }
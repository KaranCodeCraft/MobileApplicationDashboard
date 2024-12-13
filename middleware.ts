import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const url = request.nextUrl;
    // console.log("token"+token);
    
    if(token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname.startsWith('/login')
    )){
        // console.log("inside it");
        
        return NextResponse.redirect(new URL('/home', request.url));
    }
    if (
      !token &&
      (url.pathname === "/sign-in" ||
        url.pathname === "/sign-up" ||
        url.pathname === "/verify")
    ) {
      return NextResponse.next(); // Let the request continue
    }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
    matcher: ['/sign-in','/sign-up','/login','/dashboard/:path*']
}
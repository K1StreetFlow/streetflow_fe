import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.cookies.has("tokenCustomer")) {
    if (
      request.nextUrl.pathname.startsWith("/auth/user/login") ||
      request.nextUrl.pathname.startsWith("/auth/user/register")
    ) {
      return NextResponse.redirect(new URL("/product", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith("/auth/user/login") ||
      request.nextUrl.pathname.startsWith("/auth/user/register")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/user/login", request.url));
  }
}

export const config = {
  matcher: [
    "/carts/:path*",
    "/waiting-payment/:path*",
    "/order/:path*",
    "/review/:path*",
    "/profile/:path*",
    "/auth/user/:path*",
  ],
};

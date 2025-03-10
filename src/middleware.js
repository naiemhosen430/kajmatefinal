import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accesstoken")?.value || null;

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/register",
    "/message",
    "/Search",
    "/setting",
    "/dashboard",
    "/select/:path*",
  ],
};

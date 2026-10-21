import { NextResponse, NextRequest } from "next/server";
import { createRedirectUrl } from "./lib/redirect";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (pathname.startsWith("/admin") && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/member") && !refreshToken) {
    const destination = `${pathname}${search}`;
    const loginUrl = createRedirectUrl("/login", destination);

    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/member/:path*"],
};

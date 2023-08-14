import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get("next-auth.session-token")?.value;
  if (!userToken) {
     NextResponse.redirect(new URL("/auth/login", request.url));
    return ;
  } else {
   NextResponse.redirect(new URL("/protected", request.url));
    return ;
  }
}

export const config = { matcher: ["/protected/:path*"] };

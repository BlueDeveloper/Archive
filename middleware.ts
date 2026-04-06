import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("auth");
  const pathname = req.nextUrl.pathname.replace(/\/$/, "");
  const isLoginPage = pathname === "/dashboard/login";

  if (cookie?.value === "authenticated") {
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (isLoginPage) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/dashboard/login", req.url));
}

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export function middleware(req: NextRequest) {
  // 로컬 개발 시 인증 우회
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

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

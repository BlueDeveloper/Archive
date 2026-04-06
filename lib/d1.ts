import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export function db() {
  const { env } = getRequestContext();
  return getDb(env.DB);
}

/** API 라우트에서 인증 쿠키 확인 */
export function requireAuth(req: NextRequest): NextResponse | null {
  const cookie = req.cookies.get("auth");
  if (cookie?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

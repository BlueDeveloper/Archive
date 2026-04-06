import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password: string };

  const DEFAULT_PASSWORD = "blue129323";
  let correctPassword = DEFAULT_PASSWORD;
  try {
    const { env } = getRequestContext();
    const envPw = (env.AUTH_PASSWORD ?? "").trim() || (env.DASHBOARD_PASSWORD ?? "").trim();
    correctPassword = envPw || DEFAULT_PASSWORD;
  } catch {
    // 로컬 dev 환경: getRequestContext 사용 불가, 기본값 사용
    const envPw = (process.env.AUTH_PASSWORD ?? "").trim() || (process.env.DASHBOARD_PASSWORD ?? "").trim();
    correctPassword = envPw || DEFAULT_PASSWORD;
  }

  if (password === correctPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

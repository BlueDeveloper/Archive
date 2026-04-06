import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown;
    if (
      !body ||
      typeof body !== "object" ||
      !("password" in body) ||
      typeof (body as { password: unknown }).password !== "string"
    ) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const { password } = body as { password: string };

    let correctPassword = "";
    try {
      const { env } = getRequestContext();
      correctPassword =
        (env.AUTH_PASSWORD ?? "").trim() || (env.DASHBOARD_PASSWORD ?? "").trim();
    } catch {
      correctPassword =
        (process.env.AUTH_PASSWORD ?? "").trim() ||
        (process.env.DASHBOARD_PASSWORD ?? "").trim();
    }

    if (!correctPassword) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (password === correctPassword) {
      const res = NextResponse.json({ ok: true });
      res.cookies.set("auth", "authenticated", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

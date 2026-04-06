import { NextRequest, NextResponse } from "next/server";
import { db, requireAuth } from "@/lib/d1";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// POST /api/auth — 로그인
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

    const row = await db()
      .select()
      .from(settings)
      .where(eq(settings.key, "admin_password_hash"))
      .limit(1);

    if (!row[0]) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const inputHash = await hashPassword(password);
    if (inputHash !== row[0].value) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/auth — 비밀번호 변경 (인증 필요)
export async function PUT(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json() as unknown;
    if (
      !body ||
      typeof body !== "object" ||
      !("newPassword" in body) ||
      typeof (body as { newPassword: unknown }).newPassword !== "string"
    ) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const { newPassword } = body as { newPassword: string };
    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password too short (min 8)" }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);
    await db()
      .update(settings)
      .set({ value: newHash })
      .where(eq(settings.key, "admin_password_hash"));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/auth — 로그아웃
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return res;
}

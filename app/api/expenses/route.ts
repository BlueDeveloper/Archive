import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db";
import { expenses } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const result = await db.select().from(expenses);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const body = await req.json() as any;
  const result = await db.insert(expenses).values(body).returning();
  return NextResponse.json(result[0], { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: number };
  await db.delete(expenses).where(eq(expenses.id, id));
  return NextResponse.json({ ok: true });
}

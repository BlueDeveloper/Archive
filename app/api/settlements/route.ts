import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db";
import { settlements } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const result = await db.select().from(settlements);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const body = await req.json() as any;
  const result = await db.insert(settlements).values(body).returning();
  return NextResponse.json(result[0], { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown> & { id: number };
  const { id, ...data } = body;
  const result = await db.update(settlements).set(data).where(eq(settlements.id, id)).returning();
  return NextResponse.json(result[0]);
}

export async function DELETE(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: number };
  await db.delete(settlements).where(eq(settlements.id, id));
  return NextResponse.json({ ok: true });
}

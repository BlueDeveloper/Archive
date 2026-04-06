import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const result = await db.select().from(projects);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const body = await req.json() as any;
  const result = await db.insert(projects).values(body).returning();
  return NextResponse.json(result[0], { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const body = await req.json() as Record<string, unknown> & { id: number };
  const { id, ...data } = body;
  data.updatedAt = new Date().toISOString();
  const result = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
  return NextResponse.json(result[0]);
}

export async function DELETE(req: NextRequest) {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const { id } = await req.json() as { id: number };
  await db.delete(projects).where(eq(projects.id, id));
  return NextResponse.json({ ok: true });
}

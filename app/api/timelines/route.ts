import { NextRequest, NextResponse } from "next/server";
import { db, requireAuth } from "@/lib/d1";
import { timelines } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

export const runtime = "edge";

type TimelineInsert = InferInsertModel<typeof timelines>;

export async function GET(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const result = await db().select().from(timelines);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json() as Record<string, unknown>;

    if (!body.projectId || typeof body.projectId !== "number") {
      return NextResponse.json({ error: "projectId는 필수 항목입니다" }, { status: 400 });
    }
    if (!body.date || typeof body.date !== "string") {
      return NextResponse.json({ error: "date는 필수 항목입니다" }, { status: 400 });
    }
    if (!body.description || typeof body.description !== "string") {
      return NextResponse.json({ error: "description은 필수 항목입니다" }, { status: 400 });
    }

    const values: TimelineInsert = {
      projectId: body.projectId,
      date: body.date,
      description: body.description,
      color: (body.color as string) ?? "green",
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    };

    const result = await db().insert(timelines).values(values).returning();
    if (!result[0]) return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    return NextResponse.json(result[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json() as Record<string, unknown>;
    if (!body.id || typeof body.id !== "number") {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const allowed = ["projectId", "date", "description", "color", "sortOrder"] as const;
    const updateData: Record<string, unknown> = {};
    for (const key of allowed) { if (key in body) updateData[key] = body[key]; }
    const result = await db()
      .update(timelines)
      .set(updateData as Partial<TimelineInsert>)
      .where(eq(timelines.id, body.id as number))
      .returning();
    if (!result[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json() as { id: unknown };
    if (!body.id || typeof body.id !== "number") {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await db().delete(timelines).where(eq(timelines.id, body.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

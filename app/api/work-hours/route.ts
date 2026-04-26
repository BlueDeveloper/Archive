import { NextRequest, NextResponse } from "next/server";
import { db, requireAuth } from "@/lib/d1";
import { workHours } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

export const runtime = "edge";

type WorkHoursInsert = InferInsertModel<typeof workHours>;

export async function GET(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const result = await db().select().from(workHours);
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
    if (!body.source || typeof body.source !== "string") {
      return NextResponse.json({ error: "source는 필수 항목입니다" }, { status: 400 });
    }
    if (typeof body.totalHours !== "number") {
      return NextResponse.json({ error: "totalHours는 필수 항목입니다" }, { status: 400 });
    }

    const values: WorkHoursInsert = {
      projectId: body.projectId,
      source: body.source,
      totalHours: body.totalHours,
      commits: typeof body.commits === "number" ? body.commits : null,
      workDays: typeof body.workDays === "number" ? body.workDays : null,
      avgHoursPerDay: typeof body.avgHoursPerDay === "number" ? body.avgHoursPerDay : null,
      hourlyRate: typeof body.hourlyRate === "number" ? body.hourlyRate : null,
      fileCount: typeof body.fileCount === "number" ? body.fileCount : null,
      note: (body.note as string) ?? null,
    };

    const result = await db().insert(workHours).values(values).returning();
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
    const allowed = ["projectId", "source", "totalHours", "commits", "workDays", "avgHoursPerDay", "hourlyRate", "fileCount", "note"] as const;
    const updateData: Record<string, unknown> = {};
    for (const key of allowed) { if (key in body) updateData[key] = body[key]; }
    const result = await db()
      .update(workHours)
      .set(updateData as Partial<WorkHoursInsert>)
      .where(eq(workHours.id, body.id as number))
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
    await db().delete(workHours).where(eq(workHours.id, body.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

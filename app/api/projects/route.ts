import { NextRequest, NextResponse } from "next/server";
import { db, requireAuth } from "@/lib/d1";
import { projects, settlements } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

export const runtime = "edge";

type ProjectInsert = InferInsertModel<typeof projects>;

export async function GET(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const result = await db().select().from(projects);
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

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json({ error: "name은 필수 항목입니다" }, { status: 400 });
    }
    if (!body.client || typeof body.client !== "string") {
      return NextResponse.json({ error: "client는 필수 항목입니다" }, { status: 400 });
    }
    if (!body.type || typeof body.type !== "string") {
      return NextResponse.json({ error: "type은 필수 항목입니다" }, { status: 400 });
    }

    const values: ProjectInsert = {
      name: body.name,
      client: body.client,
      type: body.type,
      folder: (body.folder as string) ?? null,
      platform: (body.platform as string) ?? null,
      status: (body.status as string) ?? "진행중",
      statusSub: (body.statusSub as string) ?? null,
      amount: typeof body.amount === "number" ? body.amount : 0,
      amountDetail: (body.amountDetail as string) ?? null,
      deployMethod: (body.deployMethod as string) ?? null,
      techStack: (body.techStack as string) ?? null,
      contractDate: (body.contractDate as string) ?? null,
      endDate: (body.endDate as string) ?? null,
      asInfo: (body.asInfo as string) ?? null,
      note: (body.note as string) ?? null,
      service: (body.service as string) ?? null,
      settlementStatus: (body.settlementStatus as string) ?? "미정산",
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    };

    const result = await db().insert(projects).values(values).returning();
    if (!result[0]) return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    return NextResponse.json(result[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

const PROJECT_UPDATABLE_FIELDS = [
  "name", "client", "folder", "type", "platform", "status", "statusSub",
  "amount", "amountDetail", "deployMethod", "techStack", "contractDate",
  "endDate", "asInfo", "note", "service", "settlementStatus", "sortOrder",
] as const;

export async function PUT(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json() as Record<string, unknown>;
    if (!body.id || typeof body.id !== "number") {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    for (const key of PROJECT_UPDATABLE_FIELDS) {
      if (key in body) updateData[key] = body[key];
    }
    const result = await db()
      .update(projects)
      .set(updateData as Partial<ProjectInsert>)
      .where(eq(projects.id, body.id as number))
      .returning();
    if (!result[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // settlementStatus 변경 시 해당 프로젝트의 settlement 레코드 category도 동기화
    if ("settlementStatus" in body) {
      const newCategory = body.settlementStatus === "정산완료" ? "확정" : "미확정";
      await db()
        .update(settlements)
        .set({ category: newCategory })
        .where(eq(settlements.projectId, body.id as number));
    }

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
    await db().delete(projects).where(eq(projects.id, body.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

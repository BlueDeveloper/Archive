import { NextRequest, NextResponse } from "next/server";
import { db, requireAuth } from "@/lib/d1";
import { expenses } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

export const runtime = "edge";

type ExpenseInsert = InferInsertModel<typeof expenses>;

export async function GET(req: NextRequest) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  try {
    const result = await db().select().from(expenses);
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

    if (!body.category || typeof body.category !== "string") {
      return NextResponse.json({ error: "category는 필수 항목입니다" }, { status: 400 });
    }
    if (!body.label || typeof body.label !== "string") {
      return NextResponse.json({ error: "label은 필수 항목입니다" }, { status: 400 });
    }
    if (typeof body.amount !== "number") {
      return NextResponse.json({ error: "amount는 필수 항목입니다" }, { status: 400 });
    }

    const values: ExpenseInsert = {
      category: body.category,
      label: body.label,
      amount: body.amount,
      date: (body.date as string) ?? null,
    };

    const result = await db().insert(expenses).values(values).returning();
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
    const allowed = ["category", "label", "amount", "date"] as const;
    const updateData: Record<string, unknown> = {};
    for (const key of allowed) { if (key in body) updateData[key] = body[key]; }
    const result = await db()
      .update(expenses)
      .set(updateData as Partial<ExpenseInsert>)
      .where(eq(expenses.id, body.id as number))
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
    await db().delete(expenses).where(eq(expenses.id, body.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

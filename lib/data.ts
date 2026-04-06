import type { DashboardData } from "@/lib/types";

export async function fetchDashboardData(): Promise<DashboardData> {
  let db: Awaited<ReturnType<typeof import("@/db").getDb>>;

  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const { env } = getRequestContext();
    const { getDb } = await import("@/db");
    db = getDb(env.DB);
  } catch {
    return {
      projects: [],
      settlements: [],
      expenses: [],
      workHours: [],
      deadlines: [],
    };
  }

  const allProjects = await db.query.projects.findMany({
    orderBy: (p, { asc }) => [asc(p.sortOrder)],
  });

  const allTimelines = await db.query.timelines.findMany({
    orderBy: (t, { asc }) => [asc(t.sortOrder)],
  });

  const allSettlements = await db.query.settlements.findMany();
  const allExpenses = await db.query.expenses.findMany();
  const allWorkHours = await db.query.workHours.findMany();
  const allDeadlines = await db.query.deadlines.findMany({
    orderBy: (d, { asc }) => [asc(d.sortOrder)],
  });

  const projectsWithTimelines = allProjects.map((p) => ({
    ...p,
    timelines: allTimelines.filter((t) => t.projectId === p.id),
  }));

  const workHoursWithProject = allWorkHours.map((wh) => {
    const proj = allProjects.find((p) => p.id === wh.projectId);
    return {
      ...wh,
      projectName: proj?.name,
      client: proj?.client,
      projectAmount: proj?.amount,
    };
  });

  return {
    projects: projectsWithTimelines,
    settlements: allSettlements,
    expenses: allExpenses,
    workHours: workHoursWithProject,
    deadlines: allDeadlines,
  };
}

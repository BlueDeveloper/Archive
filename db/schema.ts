import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  client: text("client").notNull(),
  folder: text("folder"),
  type: text("type").notNull(),
  platform: text("platform"),
  status: text("status").notNull().default("진행중"),
  statusSub: text("status_sub"),
  amount: integer("amount").notNull().default(0),
  deployMethod: text("deploy_method"),
  techStack: text("tech_stack"),
  contractDate: text("contract_date"),
  endDate: text("end_date"),
  asInfo: text("as_info"),
  note: text("note"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").notNull().default("(datetime('now'))"),
  updatedAt: text("updated_at").notNull().default("(datetime('now'))"),
});

export const timelines = sqliteTable("timelines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  color: text("color").default("green"),
  sortOrder: integer("sort_order").default(0),
});

export const settlements = sqliteTable("settlements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull(),
  category: text("category").notNull(),
  label: text("label").notNull(),
  amount: integer("amount").notNull(),
  date: text("date"),
});

export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(),
  label: text("label").notNull(),
  amount: integer("amount").notNull(),
  date: text("date"),
});

export const workHours = sqliteTable("work_hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull(),
  source: text("source").notNull(),
  totalHours: real("total_hours").notNull(),
  commits: integer("commits"),
  workDays: integer("work_days"),
  avgHoursPerDay: real("avg_hours_per_day"),
  hourlyRate: integer("hourly_rate"),
  fileCount: integer("file_count"),
  note: text("note"),
});

export const deadlines = sqliteTable("deadlines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id"),
  label: text("label").notNull(),
  description: text("description"),
  date: text("date").notNull(),
  type: text("type").default("deadline"),
  sortOrder: integer("sort_order").default(0),
});

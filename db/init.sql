CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  folder TEXT,
  type TEXT NOT NULL,
  platform TEXT,
  status TEXT NOT NULL DEFAULT '진행중',
  status_sub TEXT,
  amount INTEGER NOT NULL DEFAULT 0,
  amount_detail TEXT,
  deploy_method TEXT,
  tech_stack TEXT,
  contract_date TEXT,
  end_date TEXT,
  as_info TEXT,
  note TEXT,
  service TEXT,
  settlement_status TEXT DEFAULT '미정산',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS timelines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT DEFAULT 'green',
  sort_order INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS timelines_project_id_idx ON timelines(project_id);

CREATE TABLE IF NOT EXISTS settlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  label TEXT NOT NULL,
  amount INTEGER NOT NULL,
  date TEXT
);
CREATE INDEX IF NOT EXISTS settlements_project_id_idx ON settlements(project_id);

CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  label TEXT NOT NULL,
  amount INTEGER NOT NULL,
  date TEXT
);

CREATE TABLE IF NOT EXISTS work_hours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  source TEXT NOT NULL,
  total_hours REAL NOT NULL,
  commits INTEGER,
  work_days INTEGER,
  avg_hours_per_day REAL,
  hourly_rate INTEGER,
  file_count INTEGER,
  note TEXT
);
CREATE INDEX IF NOT EXISTS work_hours_project_id_idx ON work_hours(project_id);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS deadlines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER,
  label TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  type TEXT DEFAULT 'deadline',
  sort_order INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS deadlines_project_id_idx ON deadlines(project_id);

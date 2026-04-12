export interface Project {
  id: number;
  name: string;
  client: string;
  folder: string | null;
  type: string;
  platform: string | null;
  status: string;
  statusSub: string | null;
  amount: number;
  deployMethod: string | null;
  techStack: string | null;
  contractDate: string | null;
  endDate: string | null;
  asInfo: string | null;
  note: string | null;
  service: string | null;
  sortOrder: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Timeline {
  id: number;
  projectId: number;
  date: string;
  description: string;
  color: string | null;
  sortOrder: number | null;
}

export interface Settlement {
  id: number;
  projectId: number;
  category: string;
  label: string;
  amount: number;
  date: string | null;
}

export interface Expense {
  id: number;
  category: string;
  label: string;
  amount: number;
  date: string | null;
}

export interface WorkHourData {
  id: number;
  projectId: number;
  source: string;
  totalHours: number;
  commits: number | null;
  workDays: number | null;
  avgHoursPerDay: number | null;
  hourlyRate: number | null;
  fileCount: number | null;
  note: string | null;
}

export interface Deadline {
  id: number;
  projectId: number | null;
  label: string;
  description: string | null;
  date: string;
  type: string | null;
  sortOrder: number | null;
}

export interface DashboardData {
  projects: (Project & { timelines: Timeline[] })[];
  settlements: Settlement[];
  expenses: Expense[];
  workHours: (WorkHourData & { projectName?: string; client?: string; projectAmount?: number })[];
  deadlines: Deadline[];
}

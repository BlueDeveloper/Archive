import ProjectListView from "@/components/dashboard/ProjectListView";
import { fetchDashboardData } from "@/lib/data";

export const runtime = "edge";

export default async function ProjectsPage() {
  const data = await fetchDashboardData();
  return <ProjectListView projects={data.projects} />;
}

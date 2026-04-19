import ScheduleView from "@/components/dashboard/ScheduleView";
import { fetchDashboardData } from "@/lib/data";

export const runtime = "edge";

export default async function SchedulePage() {
  const data = await fetchDashboardData();

  return <ScheduleView projects={data.projects} />;
}

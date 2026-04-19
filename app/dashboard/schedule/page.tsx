import Calendar from "@/components/dashboard/Calendar";
import { fetchDashboardData } from "@/lib/data";
import styles from "@/components/dashboard/Section.module.css";

export const runtime = "edge";

export default async function SchedulePage() {
  const data = await fetchDashboardData();

  return (
    <>
      <div className={styles.section}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        일정
      </div>
      <Calendar projects={data.projects} />
    </>
  );
}

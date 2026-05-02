import InsightsExpanded from "@/components/dashboard/InsightsExpanded";
import { fetchDashboardData } from "@/lib/data";
import styles from "@/components/dashboard/Section.module.css";

export const runtime = "edge";

export default async function InsightsPage() {
  const data = await fetchDashboardData();

  return (
    <>
      <div className={styles.section}>
        <span className={`${styles.dot} ${styles.dotAccent}`} />
        비즈니스 인사이트
      </div>
      <InsightsExpanded
        projects={data.projects}
        settlements={data.settlements}
        expenses={data.expenses}
        workHours={data.workHours}
      />
    </>
  );
}

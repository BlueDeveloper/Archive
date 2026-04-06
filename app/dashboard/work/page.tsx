import WorkHours from "@/components/dashboard/WorkHours";
import { fetchDashboardData } from "@/lib/data";
import styles from "@/components/dashboard/Section.module.css";

export const runtime = "edge";

export default async function WorkPage() {
  const data = await fetchDashboardData();

  const totalRevenue = data.settlements.reduce((s, r) => s + r.amount, 0);
  const totalExpense = data.expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpense;

  return (
    <>
      <div className={styles.section}>
        <span className={`${styles.dot} ${styles.dotAccent}`} />
        작업시간 분석
      </div>
      <WorkHours
        workHours={data.workHours}
        totalRevenue={totalRevenue}
        netProfit={netProfit}
      />
    </>
  );
}

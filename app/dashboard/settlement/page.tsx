import Stats from "@/components/dashboard/Stats";
import { fetchDashboardData } from "@/lib/data";
import styles from "@/components/dashboard/Section.module.css";

export const runtime = "edge";

export default async function SettlementPage() {
  const data = await fetchDashboardData();

  return (
    <>
      <div className={styles.section}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        정산현황
      </div>
      <Stats data={data} />
    </>
  );
}

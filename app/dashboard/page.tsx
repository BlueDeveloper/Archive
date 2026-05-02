import Stats from "@/components/dashboard/Stats";
import Insights from "@/components/dashboard/Insights";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { fetchDashboardData, DashboardDataError } from "@/lib/data";
import styles from "@/components/dashboard/Section.module.css";
import pageStyles from "./page.module.css";

export const runtime = "edge";

export default async function DashboardHome() {
  let data;
  try {
    data = await fetchDashboardData();
  } catch (e) {
    const message = e instanceof DashboardDataError ? e.message : "알 수 없는 오류";
    return (
      <div className={pageStyles.errorContainer ?? ""}>
        <h2>데이터 로딩 실패</h2>
        <p>{message}</p>
        <p>페이지를 새로고침하거나, 잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  const { projects } = data;

  const done = projects.filter(
    (p) => p.status === "완료" || p.status === "AS"
  );
  const inProgress = projects.filter((p) => p.status === "진행중");
  const doneOnly = projects.filter((p) => p.status === "완료");
  const asOnly = projects.filter((p) => p.status === "AS");

  const today = new Date()
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");

  return (
    <>
      <p className={pageStyles.updateInfo}>
        최종 업데이트: {today} | 총 {projects.length}건 (완료 {doneOnly.length} /
        진행중 {inProgress.length} / AS {asOnly.length})
      </p>

      <Stats data={data} />

      <div className={styles.section}>
        <span className={`${styles.dot} ${styles.dotAccent}`} />
        비즈니스 인사이트 요약
      </div>
      <Insights
        projects={projects}
        settlements={data.settlements}
        expenses={data.expenses}
      />

      {inProgress.length > 0 && (
        <>
          <div className={styles.section}>
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            진행중 프로젝트
          </div>
          <div className={styles.projectGrid}>
            {inProgress.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </>
      )}

      {done.length > 0 && (
        <>
          <div className={styles.section}>
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            완료 프로젝트
          </div>
          <div className={styles.projectGrid}>
            {done.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </>
      )}

    </>
  );
}

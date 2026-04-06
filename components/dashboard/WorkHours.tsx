import styles from "./WorkHours.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { WorkHourData } from "@/lib/types";

interface WorkHourWithProject extends WorkHourData {
  projectName?: string;
  client?: string;
  projectAmount?: number;
}

interface Props {
  workHours: WorkHourWithProject[];
  totalRevenue?: number;
  netProfit?: number;
}

export default function WorkHours({ workHours, totalRevenue, netProfit }: Props) {
  const maxHours = Math.max(...workHours.map((w) => w.totalHours), 1);

  const totalHours = workHours.reduce((s, w) => s + w.totalHours, 0);
  const totalDays = workHours.reduce((s, w) => s + (w.workDays || 0), 0);

  const avgHourlyRevenue =
    totalRevenue && totalHours > 0
      ? Math.round(totalRevenue / totalHours)
      : 0;
  const avgHourlyProfit =
    netProfit && totalHours > 0 ? Math.round(netProfit / totalHours) : 0;

  return (
    <>
      <div className={styles.grid}>
        {workHours.map((wh) => {
          const isGit = wh.source === "git";
          const pct = (wh.totalHours / maxHours) * 100;
          const fillGrad = isGit
            ? "linear-gradient(90deg, var(--green), var(--accent))"
            : "linear-gradient(90deg, var(--yellow), var(--orange))";
          const numColor = isGit ? "var(--green)" : "var(--yellow)";

          const hoursDisplay = isGit
            ? wh.totalHours
            : `~${wh.totalHours}`;

          const unitText = isGit
            ? "시간"
            : wh.source === "file" && wh.note?.includes("진행중")
              ? "시간 (진행중)"
              : "시간 (추정)";

          return (
            <div className={styles.card} key={wh.id}>
              <div className={isGit ? styles.barGit : styles.barFile} />
              <div className={styles.inner}>
                <div className={styles.top}>
                  <div>
                    <div className={styles.name}>
                      {wh.projectName || `프로젝트 #${wh.projectId}`}
                    </div>
                    {wh.client && <div className={styles.cli}>{wh.client}</div>}
                  </div>
                  <span className={isGit ? styles.badgeGit : styles.badgeFile}>
                    {isGit ? "Git 커밋 분석" : "파일 타임스탬프"}
                  </span>
                </div>
                <div className={styles.big}>
                  <span className={styles.bigNum} style={{ color: numColor }}>
                    {hoursDisplay}
                  </span>
                  <span className={styles.bigUnit}>{unitText}</span>
                </div>
                <div className={styles.track}>
                  <div
                    className={styles.fill}
                    style={{ width: `${pct}%`, background: fillGrad }}
                  />
                </div>
                <div className={styles.meta}>
                  {wh.commits != null && (
                    <div>
                      <div className={styles.metaLabel}>커밋 수</div>
                      <div className={styles.metaValue}>{wh.commits}회</div>
                    </div>
                  )}
                  {wh.fileCount != null && (
                    <div>
                      <div className={styles.metaLabel}>
                        {wh.source === "git" ? "커밋 수" : "소스 파일"}
                      </div>
                      <div className={styles.metaValue}>
                        {wh.fileCount}
                        {wh.source === "git" ? "회" : "개"}
                      </div>
                    </div>
                  )}
                  {wh.workDays != null && (
                    <div>
                      <div className={styles.metaLabel}>작업일수</div>
                      <div className={styles.metaValue}>{wh.workDays}일</div>
                    </div>
                  )}
                  {wh.avgHoursPerDay != null && (
                    <div>
                      <div className={styles.metaLabel}>일평균</div>
                      <div className={styles.metaValue}>
                        {wh.avgHoursPerDay}시간
                      </div>
                    </div>
                  )}
                  {wh.hourlyRate != null && (
                    <div>
                      <div className={styles.metaLabel}>시급 환산</div>
                      <div
                        className={`${styles.metaValue} ${wh.hourlyRate && wh.hourlyRate > 0 ? styles.metaValueGreen : styles.metaValueDim}`}
                      >
                        {wh.hourlyRate > 0
                          ? `~${formatMoney(wh.hourlyRate)}원`
                          : "측정중"}
                      </div>
                    </div>
                  )}
                  {wh.note && (
                    <div>
                      <div className={styles.metaLabel}>비고</div>
                      <div className={styles.metaValue}>{wh.note}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summary}>
        <h3>작업시간 종합 요약</h3>
        <div className={styles.summaryNote}>
          Git 커밋 기반 = 비교적 정확 | 파일 타임스탬프 = 대략 추정 (~ 표기)
        </div>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <div className={styles.summaryVal}>~{totalHours.toFixed(1)}</div>
            <div className={styles.summaryLabel}>총 추정 작업시간</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryVal}>~{totalDays}일</div>
            <div className={styles.summaryLabel}>총 작업일수</div>
          </div>
          {avgHourlyRevenue > 0 && (
            <div className={styles.summaryItem}>
              <div className={`${styles.summaryVal} ${styles.summaryValGreen}`}>
                ~{formatMoney(avgHourlyRevenue)}원
              </div>
              <div className={styles.summaryLabel}>평균 시급 (전체 매출)</div>
            </div>
          )}
          {avgHourlyProfit > 0 && (
            <div className={styles.summaryItem}>
              <div className={`${styles.summaryVal} ${styles.summaryValTeal}`}>
                ~{formatMoney(avgHourlyProfit)}원
              </div>
              <div className={styles.summaryLabel}>평균 시급 (순수익)</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import styles from "./Insights.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { Settlement, Expense, Project } from "@/lib/types";

interface Props {
  projects: Project[];
  settlements: Settlement[];
  expenses: Expense[];
}

export default function Insights({ projects, settlements, expenses }: Props) {
  const confirmed = settlements.filter((s) => s.category === "확정");
  const pending = settlements.filter((s) => s.category !== "확정");

  const confirmedRevenue = confirmed.reduce((s, r) => s + r.amount, 0);
  const pendingRevenue = pending.reduce((s, r) => s + r.amount, 0);
  const totalRevenue = confirmedRevenue + pendingRevenue;
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const confirmedProfit = confirmedRevenue - totalExpense;
  const totalProfit = totalRevenue - totalExpense;

  // 마진율
  const marginRate = confirmedRevenue > 0 ? (confirmedProfit / confirmedRevenue) * 100 : 0;

  // ROI (투자수익률)
  const roi = totalExpense > 0 ? (confirmedProfit / totalExpense) * 100 : 0;
  const roiExpected = totalExpense > 0 ? (totalProfit / totalExpense) * 100 : 0;

  // 건당 CAC (고객획득비용)
  const totalProjects = projects.length;
  const cac = totalProjects > 0 ? totalExpense / totalProjects : 0;

  // 객단가
  const avgDealSize = totalProjects > 0 ? totalRevenue / totalProjects : 0;

  // CAC 대비 매출 비율
  const cacRatio = cac > 0 ? avgDealSize / cac : 0;

  // 월평균 (첫 비용/정산 날짜 ~ 오늘)
  const allDates = [
    ...expenses.map((e) => e.date),
    ...settlements.map((s) => s.date),
  ].filter(Boolean) as string[];
  allDates.sort((a, b) => a.localeCompare(b));
  const firstDate = allDates[0];
  let months = 1;
  if (firstDate) {
    const start = new Date(firstDate);
    const now = new Date();
    months = Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth() + 1);
  }
  const monthlyRevenue = confirmedRevenue / months;
  const monthlyProfit = confirmedProfit / months;

  // 세금 예비 적립 (매출의 10%)
  const taxReserve = Math.round(confirmedRevenue * 0.1);

  // 진행중 프로젝트
  const inProgressCount = projects.filter((p) => p.status === "진행중").length;

  // 주의 & 성장레버
  const warnings: { icon: string; text: string }[] = [];
  const levers: { icon: string; text: string }[] = [];

  // 주의점
  warnings.push({
    icon: "TAX",
    text: `세금 적립 권장: ${formatMoney(taxReserve)}원 (확정 매출의 10%)`,
  });

  if (pendingRevenue > confirmedRevenue) {
    warnings.push({
      icon: "CASH",
      text: `미수금(${formatMoney(pendingRevenue)}원)이 확정 매출보다 많음 — 현금흐름 주의`,
    });
  }

  if (confirmedRevenue > 0 && totalExpense > confirmedRevenue * 0.3) {
    warnings.push({
      icon: "COST",
      text: `플랫폼 비용이 확정 매출의 ${((totalExpense / confirmedRevenue) * 100).toFixed(0)}% — 비용 효율 점검`,
    });
  }

  if (inProgressCount === 0 && pendingRevenue === 0) {
    warnings.push({
      icon: "PIPE",
      text: "진행중 프로젝트 0건 — 신규 수주 파이프라인 확보 필요",
    });
  }

  // 성장레버
  levers.push({
    icon: "UP",
    text: `객단가 올리기: 현재 ${formatMoney(Math.round(avgDealSize))}원 → 100만원+ 프로젝트 수주`,
  });

  levers.push({
    icon: "RPT",
    text: `회전율 올리기: 현재 월 ${(totalProjects / months).toFixed(1)}건 → 월 5건 목표`,
  });

  if (cacRatio < 10) {
    levers.push({
      icon: "CAC",
      text: `CAC 효율 개선: 현재 건당 ${formatMoney(Math.round(cac))}원 → 리피트/소개 비중 높이기`,
    });
  }

  levers.push({
    icon: "AS",
    text: "기존 고객 AS → 유지보수 월정액 전환 (안정 수익원 확보)",
  });

  return (
    <div className={styles.wrapper}>
      {/* KPI 그리드 */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>확정 마진율</span>
          <span className={`${styles.kpiValue} ${marginRate >= 60 ? styles.good : styles.warn}`}>
            {marginRate.toFixed(1)}%
          </span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>투자수익률 (ROI)</span>
          <span className={`${styles.kpiValue} ${roi >= 100 ? styles.good : styles.warn}`}>
            {roi.toFixed(0)}%
          </span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>예상 ROI</span>
          <span className={`${styles.kpiValue} ${styles.teal}`}>
            {roiExpected.toFixed(0)}%
          </span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>건당 CAC</span>
          <span className={styles.kpiValue}>{formatMoney(Math.round(cac))}원</span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>평균 객단가</span>
          <span className={styles.kpiValue}>{formatMoney(Math.round(avgDealSize))}원</span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>CAC 대비 매출</span>
          <span className={`${styles.kpiValue} ${cacRatio >= 3 ? styles.good : styles.warn}`}>
            {cacRatio.toFixed(1)}배
          </span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>월평균 매출</span>
          <span className={styles.kpiValue}>{formatMoney(Math.round(monthlyRevenue))}원</span>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>월평균 순수익</span>
          <span className={`${styles.kpiValue} ${styles.good}`}>
            {formatMoney(Math.round(monthlyProfit))}원
          </span>
        </div>
      </div>

      {/* 주의점 & 성장레버 */}
      <div className={styles.alertGrid}>
        <div className={styles.alertCard}>
          <h4 className={styles.alertTitle}>
            <span className={styles.alertDot + " " + styles.dotWarn} />
            주의점
          </h4>
          {warnings.map((w, i) => (
            <div className={styles.alertRow} key={i}>
              <span className={styles.alertIcon + " " + styles.iconWarn}>{w.icon}</span>
              <span className={styles.alertText}>{w.text}</span>
            </div>
          ))}
        </div>
        <div className={styles.alertCard}>
          <h4 className={styles.alertTitle}>
            <span className={styles.alertDot + " " + styles.dotGrow} />
            성장 레버
          </h4>
          {levers.map((l, i) => (
            <div className={styles.alertRow} key={i}>
              <span className={styles.alertIcon + " " + styles.iconGrow}>{l.icon}</span>
              <span className={styles.alertText}>{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

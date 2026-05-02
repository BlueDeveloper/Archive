import styles from "./InsightsExpanded.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { Settlement, Expense, Project, WorkHourData } from "@/lib/types";

interface Props {
  projects: Project[];
  settlements: Settlement[];
  expenses: Expense[];
  workHours: (WorkHourData & { projectName?: string; client?: string; projectAmount?: number })[];
}

interface KpiItem {
  label: string;
  value: string;
  description: string;
  color: "good" | "warn" | "teal" | "neutral";
}

export default function InsightsExpanded({ projects, settlements, expenses, workHours }: Props) {
  const confirmed = settlements.filter((s) => s.category === "확정");
  const pending = settlements.filter((s) => s.category !== "확정");

  const confirmedRevenue = confirmed.reduce((s, r) => s + r.amount, 0);
  const pendingRevenue = pending.reduce((s, r) => s + r.amount, 0);
  const totalRevenue = confirmedRevenue + pendingRevenue;
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const confirmedProfit = confirmedRevenue - totalExpense;
  const totalProfit = totalRevenue - totalExpense;

  const marginRate = confirmedRevenue > 0 ? (confirmedProfit / confirmedRevenue) * 100 : 0;
  const roi = totalExpense > 0 ? (confirmedProfit / totalExpense) * 100 : 0;
  const roiExpected = totalExpense > 0 ? (totalProfit / totalExpense) * 100 : 0;

  const totalProjects = projects.length;
  const cac = totalProjects > 0 ? totalExpense / totalProjects : 0;
  const avgDealSize = totalProjects > 0 ? totalRevenue / totalProjects : 0;
  const cacRatio = cac > 0 ? avgDealSize / cac : 0;

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

  const taxReserve = Math.round(confirmedRevenue * 0.1);
  const inProgressCount = projects.filter((p) => p.status === "진행중").length;

  // 총 작업시간 & 시급
  const totalHours = workHours.reduce((s, w) => s + w.totalHours, 0);
  const effectiveHourlyRate = totalHours > 0 ? Math.round(confirmedProfit / totalHours) : 0;

  const kpis: KpiItem[] = [
    {
      label: "확정 마진율",
      value: `${marginRate.toFixed(1)}%`,
      description: "확정 매출에서 투자비용을 제외한 순수익 비율. 60% 이상이면 건전합니다.",
      color: marginRate >= 60 ? "good" : "warn",
    },
    {
      label: "투자수익률 (ROI)",
      value: `${roi.toFixed(0)}%`,
      description: "투자한 비용 대비 얼마나 수익을 냈는지. 100% 이상이면 투자금을 회수한 상태입니다.",
      color: roi >= 100 ? "good" : "warn",
    },
    {
      label: "예상 ROI (미정산 포함)",
      value: `${roiExpected.toFixed(0)}%`,
      description: "미정산 수익까지 포함한 예상 투자수익률. 파이프라인의 잠재 가치를 보여줍니다.",
      color: "teal",
    },
    {
      label: "건당 고객획득비용 (CAC)",
      value: `${formatMoney(Math.round(cac))}원`,
      description: "프로젝트 1건을 수주하는 데 든 평균 비용. 숨고 포인트, 광고비 등이 포함됩니다.",
      color: "neutral",
    },
    {
      label: "평균 객단가",
      value: `${formatMoney(Math.round(avgDealSize))}원`,
      description: "프로젝트 1건의 평균 계약 금액. 높을수록 효율적인 영업을 하고 있습니다.",
      color: "neutral",
    },
    {
      label: "CAC 대비 매출",
      value: `${cacRatio.toFixed(1)}배`,
      description: "고객 획득에 쓴 비용 대비 매출 비율. 3배 이상이면 건전한 구조입니다.",
      color: cacRatio >= 3 ? "good" : "warn",
    },
    {
      label: "월평균 매출",
      value: `${formatMoney(Math.round(monthlyRevenue))}원`,
      description: `영업 시작(${firstDate || "-"})부터 현재까지 ${months}개월간의 월평균 확정 매출입니다.`,
      color: "neutral",
    },
    {
      label: "월평균 순수익",
      value: `${formatMoney(Math.round(monthlyProfit))}원`,
      description: "월평균 확정 매출에서 투자비용을 차감한 실제 순수익입니다.",
      color: "good",
    },
    {
      label: "실질 시급",
      value: `${formatMoney(effectiveHourlyRate)}원`,
      description: `총 ${totalHours.toFixed(1)}시간 투입 기준. 확정 순수익을 총 작업시간으로 나눈 값입니다.`,
      color: effectiveHourlyRate >= 30000 ? "good" : "warn",
    },
    {
      label: "세금 적립 권장액",
      value: `${formatMoney(taxReserve)}원`,
      description: "확정 매출의 10%를 종합소득세 대비 적립 권장 금액으로 산정합니다.",
      color: "warn",
    },
  ];

  // 주의점 & 성장 레버
  const warnings: { icon: string; text: string; detail: string }[] = [];
  const levers: { icon: string; text: string; detail: string }[] = [];

  warnings.push({
    icon: "TAX",
    text: `세금 적립 권장: ${formatMoney(taxReserve)}원`,
    detail: "확정 매출의 10%를 종합소득세 대비 적립하세요.",
  });

  if (pendingRevenue > confirmedRevenue) {
    warnings.push({
      icon: "CASH",
      text: `미수금(${formatMoney(pendingRevenue)}원)이 확정 매출보다 많음`,
      detail: "현금흐름 위험. 미정산 건 회수에 집중하세요.",
    });
  }

  if (confirmedRevenue > 0 && totalExpense > confirmedRevenue * 0.3) {
    warnings.push({
      icon: "COST",
      text: `비용 비율 ${((totalExpense / confirmedRevenue) * 100).toFixed(0)}%`,
      detail: "플랫폼 비용이 매출의 30%를 초과합니다. 비용 효율을 점검하세요.",
    });
  }

  if (inProgressCount === 0 && pendingRevenue === 0) {
    warnings.push({
      icon: "PIPE",
      text: "진행중 프로젝트 0건",
      detail: "신규 수주 파이프라인이 비어 있습니다. 영업 활동을 강화하세요.",
    });
  }

  levers.push({
    icon: "UP",
    text: `객단가 올리기 (현재 ${formatMoney(Math.round(avgDealSize))}원)`,
    detail: "100만원+ 프로젝트를 수주하면 동일 CAC에서 수익이 크게 개선됩니다.",
  });

  levers.push({
    icon: "RPT",
    text: `회전율 올리기 (현재 월 ${(totalProjects / months).toFixed(1)}건)`,
    detail: "월 5건 목표. 소규모 반복 프로젝트로 파이프라인을 채우세요.",
  });

  if (cacRatio < 10) {
    levers.push({
      icon: "CAC",
      text: `CAC 효율 개선 (건당 ${formatMoney(Math.round(cac))}원)`,
      detail: "리피트/소개 비중을 높이면 획득 비용 없이 매출이 증가합니다.",
    });
  }

  levers.push({
    icon: "AS",
    text: "유지보수 월정액 전환",
    detail: "기존 고객 A/S를 월정액 유지보수로 전환하면 안정적인 MRR을 확보합니다.",
  });

  return (
    <div className={styles.wrapper}>
      {/* KPI 대형 그리드 */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${styles.kpiCard} ${styles[kpi.color]}`}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={styles.kpiDesc}>{kpi.description}</div>
          </div>
        ))}
      </div>

      {/* 주의점 & 성장레버 */}
      <div className={styles.alertGrid}>
        <div className={styles.alertCard}>
          <h4 className={styles.alertTitle}>
            <span className={`${styles.alertDot} ${styles.dotWarn}`} />
            주의점
          </h4>
          {warnings.map((w, i) => (
            <div className={styles.alertRow} key={i}>
              <span className={`${styles.alertIcon} ${styles.iconWarn}`}>{w.icon}</span>
              <div className={styles.alertContent}>
                <span className={styles.alertText}>{w.text}</span>
                <span className={styles.alertDetail}>{w.detail}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.alertCard}>
          <h4 className={styles.alertTitle}>
            <span className={`${styles.alertDot} ${styles.dotGrow}`} />
            성장 레버
          </h4>
          {levers.map((l, i) => (
            <div className={styles.alertRow} key={i}>
              <span className={`${styles.alertIcon} ${styles.iconGrow}`}>{l.icon}</span>
              <div className={styles.alertContent}>
                <span className={styles.alertText}>{l.text}</span>
                <span className={styles.alertDetail}>{l.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

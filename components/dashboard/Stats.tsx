import styles from "./Stats.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { DashboardData } from "@/lib/types";

interface Props {
  data: DashboardData;
}

export default function Stats({ data }: Props) {
  const { projects, settlements, expenses } = data;

  const total = projects.length;
  const turnkey = projects.filter((p) => p.type === "턴키").length;
  const modify = total - turnkey;

  const totalRevenue = settlements.reduce((s, r) => s + r.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

  const confirmedSettlements = settlements.filter((s) => s.category === "확정");
  const confirmedRevenue = confirmedSettlements.reduce((s, r) => s + r.amount, 0);
  const confirmedProfit = confirmedRevenue - totalExpense;

  const expectedProfit = totalRevenue - totalExpense;

  const inProgress = projects.filter((p) => p.status === "진행중");
  const done = projects.filter((p) => p.status === "완료");
  const as = projects.filter((p) => p.status === "AS");

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <div className={styles.label}>총 프로젝트</div>
        <div className={styles.value}>{total}건</div>
        <div className={styles.desc}>
          턴키 {turnkey} / 기구축수정 {modify}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>총 매출</div>
        <div className={styles.value}>{formatMoney(totalRevenue)}</div>
        <div className={styles.desc}>확정 + 예정 합산</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>플랫폼 비용</div>
        <div className={`${styles.value} ${styles.valueRed}`}>
          -{formatMoney(totalExpense)}
        </div>
        <div className={styles.desc}>
          숨고 포인트 {expenses.length}회
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>순수익 (확정)</div>
        <div className={`${styles.value} ${styles.valueGreen}`}>
          {formatMoney(confirmedProfit)}
        </div>
        <div className={styles.desc}>완료 프로젝트 기준</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>순수익 (전체 예상)</div>
        <div className={`${styles.value} ${styles.valueTeal}`}>
          {formatMoney(expectedProfit)}
        </div>
        <div className={styles.desc}>진행중 포함 예상치</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>진행중</div>
        <div className={`${styles.value} ${styles.valueYellow}`}>
          {inProgress.length}건
        </div>
        <div className={styles.desc}>
          {inProgress.map((p) => p.client).join(", ")}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>완료 / AS</div>
        <div className={`${styles.value} ${styles.valueAccent}`}>
          {done.length} / {as.length}건
        </div>
        <div className={styles.desc}>완료 후 AS 포함</div>
      </div>
    </div>
  );
}

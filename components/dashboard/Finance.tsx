import styles from "./Finance.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { Settlement, Expense } from "@/lib/types";

interface Props {
  settlements: Settlement[];
  expenses: Expense[];
}

export default function Finance({ settlements, expenses }: Props) {
  const confirmed = settlements.filter((s) => s.category === "확정");
  const pending = settlements.filter((s) => s.category === "예정");

  const confirmedTotal = confirmed.reduce((s, r) => s + r.amount, 0);
  const pendingTotal = pending.reduce((s, r) => s + r.amount, 0);
  const expenseTotal = expenses.reduce((s, e) => s + e.amount, 0);

  const totalRevenue = confirmedTotal + pendingTotal;
  const netProfit = totalRevenue - expenseTotal;

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.colorGreen}>완료/확정 매출</h3>
          {confirmed.map((s) => (
            <div className={styles.row} key={s.id}>
              <span className={styles.rowLabel}>{s.label}</span>
              <span>{formatMoney(s.amount)}</span>
            </div>
          ))}
          <div className={styles.total}>
            <span>확정 매출 소계</span>
            <span className={styles.colorGreen}>
              {formatMoney(confirmedTotal)}
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.colorYellow}>진행중 매출 (예정)</h3>
          {pending.map((s) => (
            <div className={styles.row} key={s.id}>
              <span className={styles.rowLabel}>{s.label}</span>
              <span>{formatMoney(s.amount)}</span>
            </div>
          ))}
          <div className={styles.total}>
            <span>예정 매출 소계</span>
            <span className={styles.colorYellow}>
              {formatMoney(pendingTotal)}
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.colorRed}>
            숨고 포인트 충전 내역 (견적 발송 비용)
          </h3>
          {expenses.map((e) => (
            <div className={styles.row} key={e.id}>
              <span className={styles.rowLabel}>{e.label}</span>
              <span className={styles.colorRed}>
                -{formatMoney(e.amount)}
              </span>
            </div>
          ))}
          <div className={styles.total}>
            <span>포인트 비용 합계</span>
            <span className={styles.colorRed}>
              -{formatMoney(expenseTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.profit}>
        <div className={styles.profitRow}>
          <span className={styles.profitLabel}>확정 매출</span>
          <span className={styles.profitVal}>
            {formatMoney(confirmedTotal)}
          </span>
        </div>
        <div className={styles.profitRow}>
          <span className={styles.profitLabel}>예정 매출</span>
          <span className={styles.profitVal}>{formatMoney(pendingTotal)}</span>
        </div>
        <div className={styles.profitRow}>
          <span className={styles.profitLabel}>플랫폼 비용</span>
          <span className={`${styles.profitVal} ${styles.colorRed}`}>
            -{formatMoney(expenseTotal)}
          </span>
        </div>
        <div className={styles.profitTotal}>
          <span>전체 예상 순수익</span>
          <span className={styles.colorTeal}>
            {formatMoney(netProfit)}
          </span>
        </div>
      </div>
    </>
  );
}

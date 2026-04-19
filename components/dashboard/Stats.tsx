"use client";

import { useState } from "react";
import styles from "./Stats.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { DashboardData, Settlement, Expense } from "@/lib/types";

interface Props {
  data: DashboardData;
}

function DetailModal({
  title,
  color,
  items,
  onClose,
}: {
  title: string;
  color: string;
  items: { label: string; amount: number }[];
  onClose: () => void;
}) {
  const total = items.reduce((s, i) => s + i.amount, 0);
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles[color]}>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {items.map((item, i) => (
            <div className={styles.modalRow} key={i}>
              <span className={styles.modalLabel}>{item.label}</span>
              <span className={styles.modalAmount}>
                {color === "colorRed" ? "-" : ""}
                {formatMoney(item.amount)}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.modalTotal}>
          <span>합계</span>
          <span className={styles[color]}>
            {color === "colorRed" ? "-" : ""}
            {formatMoney(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Stats({ data }: Props) {
  const { projects, settlements, expenses } = data;

  const [modal, setModal] = useState<"expense" | "confirmed" | "pending" | null>(null);

  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "진행중");
  const done = projects.filter((p) => p.status === "완료");
  const as = projects.filter((p) => p.status === "AS");

  const totalRevenue = settlements.reduce((s, r) => s + r.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

  const confirmedSettlements = settlements.filter((s) => s.category === "확정");
  const pendingSettlements = settlements.filter((s) => s.category === "예정");
  const confirmedRevenue = confirmedSettlements.reduce((s, r) => s + r.amount, 0);
  const pendingRevenue = pendingSettlements.reduce((s, r) => s + r.amount, 0);

  const totalProfit = confirmedRevenue + pendingRevenue;
  const confirmedNetProfit = confirmedRevenue - totalExpense;
  const totalNetProfit = totalProfit - totalExpense;

  const expenseItems = expenses.map((e) => ({ label: e.label, amount: e.amount }));
  const confirmedItems = confirmedSettlements.map((s) => ({ label: s.label, amount: s.amount }));
  const pendingItems = pendingSettlements.map((s) => ({ label: s.label, amount: s.amount }));

  return (
    <>
      {/* Row 1: 프로젝트 현황 */}
      <div className={styles.row4}>
        <div className={styles.card}>
          <div className={styles.label}>총 프로젝트</div>
          <div className={styles.value}>{total}건</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>진행중</div>
          <div className={`${styles.value} ${styles.valueYellow}`}>{inProgress.length}건</div>
          <div className={styles.desc}>
            {inProgress.map((p) => p.client).join(", ") || "-"}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>완료</div>
          <div className={`${styles.value} ${styles.valueGreen}`}>{done.length}건</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>A/S</div>
          <div className={`${styles.value} ${styles.valueOrange}`}>{as.length}건</div>
        </div>
      </div>

      {/* Row 2: 매출 현황 */}
      <div className={styles.row3}>
        <div className={styles.card}>
          <div className={styles.label}>총 매출</div>
          <div className={styles.value}>{formatMoney(totalRevenue)}</div>
          <div className={styles.desc}>확정 + 예정 합산</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>정산완료 수익</div>
          <div className={`${styles.value} ${styles.valueGreen}`}>{formatMoney(confirmedRevenue)}</div>
          <button className={styles.detailBtn} onClick={() => setModal("confirmed")}>
            상세보기
          </button>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>미정산 수익</div>
          <div className={`${styles.value} ${styles.valueYellow}`}>{formatMoney(pendingRevenue)}</div>
          <button className={styles.detailBtn} onClick={() => setModal("pending")}>
            상세보기
          </button>
        </div>
      </div>

      {/* Row 3: 순수익 */}
      <div className={styles.row3}>
        <div className={`${styles.card} ${styles.cardTeal}`}>
          <div className={styles.label}>수익 합산</div>
          <div className={`${styles.value} ${styles.valueTeal}`}>{formatMoney(totalProfit)}</div>
          <div className={styles.desc}>정산완료 + 미정산</div>
        </div>
        <div className={`${styles.card} ${styles.cardTeal}`}>
          <div className={styles.label}>정산완료 순수익</div>
          <div className={`${styles.value} ${styles.valueTeal}`}>{formatMoney(confirmedNetProfit)}</div>
          <div className={styles.desc}>정산완료 - 투자비용</div>
        </div>
        <div className={`${styles.card} ${styles.cardTeal}`}>
          <div className={styles.label}>수입합산 순수익</div>
          <div className={`${styles.value} ${styles.valueTeal}`}>{formatMoney(totalNetProfit)}</div>
          <div className={styles.desc}>수익합산 - 투자비용</div>
        </div>
      </div>

      {/* Row 4: 투자비용 */}
      <div className={styles.row1}>
        <div className={`${styles.card} ${styles.cardRed}`}>
          <div className={styles.cardInline}>
            <div>
              <div className={styles.label}>투자비용</div>
              <div className={`${styles.value} ${styles.valueRed}`}>-{formatMoney(totalExpense)}</div>
            </div>
            <button className={styles.detailBtn} onClick={() => setModal("expense")}>
              상세보기
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === "expense" && (
        <DetailModal
          title="투자비용 상세"
          color="colorRed"
          items={expenseItems}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "confirmed" && (
        <DetailModal
          title="정산완료 매출 상세"
          color="colorGreen"
          items={confirmedItems}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "pending" && (
        <DetailModal
          title="미정산 매출 (예정) 상세"
          color="colorYellow"
          items={pendingItems}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

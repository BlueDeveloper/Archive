"use client";

import { useState } from "react";
import styles from "./Stats.module.css";
import { formatMoney } from "@/lib/dashboard-utils";
import type { DashboardData, Expense } from "@/lib/types";

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

const CATEGORY_OPTIONS = ["숨고포인트", "기타", "투자비"];

function ExpenseModal({
  initialExpenses,
  onClose,
}: {
  initialExpenses: Expense[];
  onClose: () => void;
}) {
  const [items, setItems] = useState<Expense[]>(initialExpenses);
  const [adding, setAdding] = useState(false);
  const [newCategory, setNewCategory] = useState("숨고포인트");
  const [newLabel, setNewLabel] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const total = items.reduce((s, e) => s + e.amount, 0);

  async function handleAdd() {
    if (!newLabel.trim() || newAmount <= 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: newCategory,
          label: newLabel.trim(),
          amount: newAmount,
          date: newDate || null,
        }),
      });
      if (res.ok) {
        const created = (await res.json()) as Expense;
        setItems([...items, created]);
        setAdding(false);
        setNewLabel("");
        setNewAmount(0);
        setNewDate(new Date().toISOString().slice(0, 10));
        setNewCategory("숨고포인트");
      }
    } finally {
      setSaving(false);
    }
  }

  function startEdit(e: Expense) {
    setEditId(e.id);
    setEditLabel(e.label);
    setEditAmount(e.amount);
    setEditDate(e.date || "");
    setEditCategory(e.category);
  }

  async function handleUpdate() {
    if (editId === null) return;
    setSaving(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editId,
          category: editCategory,
          label: editLabel.trim(),
          amount: editAmount,
          date: editDate || null,
        }),
      });
      if (res.ok) {
        const updated = (await res.json()) as Expense;
        setItems(items.map((i) => (i.id === editId ? updated : i)));
        setEditId(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    setSaving(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles.modalWide}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.colorRed}>투자비용 상세</h3>
          <button className={styles.modalClose} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {/* Table header */}
          <div className={styles.expenseHeader}>
            <span className={styles.expenseColDate}>날짜</span>
            <span className={styles.expenseColCat}>분류</span>
            <span className={styles.expenseColLabel}>항목</span>
            <span className={styles.expenseColAmount}>금액</span>
            <span className={styles.expenseColAction}></span>
          </div>

          {items.map((item) =>
            editId === item.id ? (
              <div className={styles.expenseEditRow} key={item.id}>
                <input
                  type="date"
                  className={styles.expenseInput}
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />
                <select
                  className={styles.expenseSelect}
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  className={styles.expenseInput}
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                />
                <input
                  className={styles.expenseInput}
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(Number(e.target.value))}
                />
                <div className={styles.expenseActions}>
                  <button className={styles.saveBtn} onClick={handleUpdate} disabled={saving}>
                    저장
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setEditId(null)}>
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.expenseRow} key={item.id}>
                <span className={styles.expenseColDate}>{item.date || "-"}</span>
                <span className={styles.expenseColCat}>{item.category}</span>
                <span className={styles.expenseColLabel}>{item.label}</span>
                <span className={styles.expenseColAmount}>-{formatMoney(item.amount)}</span>
                <span className={styles.expenseColAction}>
                  <button className={styles.editBtn} onClick={() => startEdit(item)}>수정</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>삭제</button>
                </span>
              </div>
            )
          )}

          {/* Add form */}
          {adding ? (
            <div className={styles.expenseEditRow}>
              <input
                type="date"
                className={styles.expenseInput}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <select
                className={styles.expenseSelect}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                className={styles.expenseInput}
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="항목명"
              />
              <input
                className={styles.expenseInput}
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(Number(e.target.value))}
                placeholder="금액"
              />
              <div className={styles.expenseActions}>
                <button className={styles.saveBtn} onClick={handleAdd} disabled={saving}>
                  추가
                </button>
                <button className={styles.cancelBtn} onClick={() => setAdding(false)}>
                  취소
                </button>
              </div>
            </div>
          ) : (
            <button className={styles.addBtn} onClick={() => setAdding(true)}>
              + 투자비용 추가
            </button>
          )}
        </div>

        <div className={styles.modalTotal}>
          <span>합계</span>
          <span className={styles.colorRed}>-{formatMoney(total)}</span>
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

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

  // settlements 기준으로 매출 분류 (Insights/WorkHours와 동일 기준)
  const confirmedSettlements = settlements.filter((s) => s.category === "확정");
  const pendingSettlements = settlements.filter((s) => s.category !== "확정");

  const confirmedRevenue = confirmedSettlements.reduce((s, r) => s + r.amount, 0);
  const pendingRevenue = pendingSettlements.reduce((s, r) => s + r.amount, 0);
  const totalRevenue = confirmedRevenue + pendingRevenue;

  const confirmedNetProfit = confirmedRevenue - totalExpense;
  const totalNetProfit = totalRevenue - totalExpense;

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
          <div className={styles.desc}>정산완료 + 미정산</div>
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
          <div className={`${styles.value} ${styles.valueTeal}`}>{formatMoney(totalRevenue)}</div>
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
        <ExpenseModal
          initialExpenses={expenses}
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

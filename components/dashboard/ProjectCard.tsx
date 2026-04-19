"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProjectCard.module.css";
import { formatMoney, formatDate, parseJsonArray } from "@/lib/dashboard-utils";
import type { Project, Timeline } from "@/lib/types";

interface Props {
  project: Project & { timelines: Timeline[] };
}

interface AmountItem {
  label: string;
  amount: number;
}

function statusBadge(status: string) {
  switch (status) {
    case "완료":
      return styles.badgeDone;
    case "진행중":
      return styles.badgeIng;
    case "AS":
    case "A/S":
      return styles.badgeAs;
    default:
      return styles.badge;
  }
}

function statusLabel(status: string) {
  return status === "AS" ? "A/S" : status;
}

function subBadge() {
  return styles.badgeAs;
}

const colorMap: Record<string, string> = {
  green: "var(--green)",
  yellow: "var(--yellow)",
  red: "var(--red)",
  orange: "var(--orange)",
  dim: "var(--dim)",
};

function parseAmountDetail(json: string | null): AmountItem[] {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

const SETTLEMENT_OPTIONS = ["미정산", "정산완료"];
const COLOR_OPTIONS = ["green", "yellow", "red", "orange", "dim"];

export default function ProjectCard({ project }: Props) {
  const tags = parseJsonArray(project.techStack);
  const [detailOpen, setDetailOpen] = useState(false);
  const [settlementStatus, setSettlementStatus] = useState(project.settlementStatus || "미정산");
  const [settlementSaving, setSettlementSaving] = useState(false);
  const [tlList, setTlList] = useState<Timeline[]>(project.timelines);
  const [editTlId, setEditTlId] = useState<number | null>(null);
  const [editTlDate, setEditTlDate] = useState("");
  const [editTlDesc, setEditTlDesc] = useState("");
  const [editTlColor, setEditTlColor] = useState("green");
  const [addingTl, setAddingTl] = useState(false);
  const [newTlDate, setNewTlDate] = useState(new Date().toISOString().slice(0, 10));
  const [newTlDesc, setNewTlDesc] = useState("");
  const [newTlColor, setNewTlColor] = useState("green");
  const [tlSaving, setTlSaving] = useState(false);
  const details = parseAmountDetail(project.amountDetail);
  const hasDetail = details.length > 0;

  const handleSettlementChange = async (value: string) => {
    setSettlementStatus(value);
    setSettlementSaving(true);
    try {
      await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, settlementStatus: value }),
      });
    } catch {
      setSettlementStatus(settlementStatus);
    } finally {
      setSettlementSaving(false);
    }
  };

  const handleDetailToggle = () => {
    if (hasDetail) setDetailOpen((prev) => !prev);
  };

  const startTlEdit = (tl: Timeline) => {
    setEditTlId(tl.id);
    setEditTlDate(tl.date);
    setEditTlDesc(tl.description);
    setEditTlColor(tl.color || "green");
  };

  const handleTlUpdate = async () => {
    if (editTlId === null || !editTlDesc.trim()) return;
    setTlSaving(true);
    try {
      const res = await fetch("/api/timelines", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editTlId, date: editTlDate, description: editTlDesc.trim(), color: editTlColor }),
      });
      if (res.ok) {
        const updated = (await res.json()) as Timeline;
        setTlList(tlList.map((t) => (t.id === editTlId ? updated : t)));
        setEditTlId(null);
      }
    } finally {
      setTlSaving(false);
    }
  };

  const handleTlDelete = async (id: number) => {
    setTlSaving(true);
    try {
      const res = await fetch("/api/timelines", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setTlList(tlList.filter((t) => t.id !== id));
    } finally {
      setTlSaving(false);
    }
  };

  const handleTlAdd = async () => {
    if (!newTlDesc.trim()) return;
    setTlSaving(true);
    try {
      const res = await fetch("/api/timelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          date: newTlDate,
          description: newTlDesc.trim(),
          color: newTlColor,
          sortOrder: tlList.length,
        }),
      });
      if (res.ok) {
        const created = (await res.json()) as Timeline;
        setTlList([...tlList, created]);
        setAddingTl(false);
        setNewTlDesc("");
        setNewTlDate(new Date().toISOString().slice(0, 10));
        setNewTlColor("green");
      }
    } finally {
      setTlSaving(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.nameRow}>
            <span className={styles.name}>{project.name}</span>
            <Link href={`/dashboard/projects/${project.id}/edit`} className={styles.editBtn}>
              편집
            </Link>
          </div>
          <div className={styles.client}>
            {project.client}
            {project.folder && (
              <>
                {" | "}
                <span className={styles.folder}>{project.folder}</span>
              </>
            )}
          </div>
        </div>
        <div className={styles.badgeRow}>
          <span className={statusBadge(project.status)}>{statusLabel(project.status)}</span>
          {project.statusSub && (
            <>
              {" "}
              <span className={subBadge()}>{project.statusSub}</span>
            </>
          )}
          <select
            className={`${styles.settlementSelect} ${settlementStatus === "정산완료" ? styles.settlementDone : styles.settlementPending}`}
            value={settlementStatus}
            onChange={(e) => handleSettlementChange(e.target.value)}
            disabled={settlementSaving}
          >
            {SETTLEMENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.rowKey}>유형</span>
          <span className={styles.rowVal}>{project.type}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowKey}>플랫폼</span>
          <span className={styles.rowVal}>{project.platform || "없음"}</span>
        </div>
        <div
          className={`${styles.row} ${hasDetail ? styles.rowClickable : ""}`}
          onClick={handleDetailToggle}
          role={hasDetail ? "button" : undefined}
          tabIndex={hasDetail ? 0 : undefined}
          onKeyDown={hasDetail ? (e) => { if (e.key === "Enter" || e.key === " ") handleDetailToggle(); } : undefined}
        >
          <span className={styles.rowKey}>
            견적
            {hasDetail && (
              <span className={`${styles.expandIcon} ${detailOpen ? styles.expandIconOpen : ""}`}>&#9660;</span>
            )}
          </span>
          <span
            className={`${styles.rowVal} ${project.status === "완료" ? styles.rowValGreen : styles.rowValYellow}`}
          >
            {formatMoney(project.amount)}원
          </span>
        </div>
        {detailOpen && hasDetail && (
          <div className={styles.detailWrap}>
            {details.map((item, i) => (
              <div className={styles.detailRow} key={i}>
                <span className={styles.detailLabel}>{item.label}</span>
                <span className={styles.detailAmount}>{formatMoney(item.amount)}원</span>
              </div>
            ))}
          </div>
        )}
        <div className={styles.row}>
          <span className={styles.rowKey}>배포</span>
          <span className={styles.rowVal}>{project.deployMethod || "없음"}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowKey}>계약기간</span>
          <span className={styles.rowVal}>
            {project.contractDate
              ? `${formatDate(project.contractDate)}${project.endDate ? ` ~ ${formatDate(project.endDate)}` : ""}`
              : "없음"}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowKey}>A/S</span>
          <span className={styles.rowVal}>{project.asInfo || "없음"}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowKey}>서비스</span>
          <span className={styles.rowVal}>{project.service || "없음"}</span>
        </div>
      </div>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.timeline}>
        {tlList.map((tl) =>
          editTlId === tl.id ? (
            <div className={styles.tlEditRow} key={tl.id}>
              <select
                className={styles.tlColorSelect}
                value={editTlColor}
                onChange={(e) => setEditTlColor(e.target.value)}
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="date"
                className={styles.tlInput}
                value={editTlDate}
                onChange={(e) => setEditTlDate(e.target.value)}
              />
              <input
                className={styles.tlInput}
                value={editTlDesc}
                onChange={(e) => setEditTlDesc(e.target.value)}
              />
              <div className={styles.tlActions}>
                <button className={styles.tlSaveBtn} onClick={handleTlUpdate} disabled={tlSaving}>저장</button>
                <button className={styles.tlCancelBtn} onClick={() => setEditTlId(null)}>취소</button>
              </div>
            </div>
          ) : (
            <div className={styles.tlItem} key={tl.id}>
              <span
                className={styles.tlDot}
                style={{ background: colorMap[tl.color || "green"] || "var(--green)" }}
              />
              <span className={styles.tlDate}>{formatDate(tl.date)}</span>
              <span className={styles.tlDesc}>{tl.description}</span>
              <span className={styles.tlBtns}>
                <button className={styles.tlEditBtn} onClick={() => startTlEdit(tl)}>수정</button>
                <button className={styles.tlDelBtn} onClick={() => handleTlDelete(tl.id)}>삭제</button>
              </span>
            </div>
          )
        )}

        {addingTl ? (
          <div className={styles.tlEditRow}>
            <select
              className={styles.tlColorSelect}
              value={newTlColor}
              onChange={(e) => setNewTlColor(e.target.value)}
            >
              {COLOR_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="date"
              className={styles.tlInput}
              value={newTlDate}
              onChange={(e) => setNewTlDate(e.target.value)}
            />
            <input
              className={styles.tlInput}
              value={newTlDesc}
              onChange={(e) => setNewTlDesc(e.target.value)}
              placeholder="설명"
            />
            <div className={styles.tlActions}>
              <button className={styles.tlSaveBtn} onClick={handleTlAdd} disabled={tlSaving}>추가</button>
              <button className={styles.tlCancelBtn} onClick={() => setAddingTl(false)}>취소</button>
            </div>
          </div>
        ) : (
          <button className={styles.tlAddBtn} onClick={() => setAddingTl(true)}>+ 타임라인 추가</button>
        )}
      </div>
    </div>
  );
}

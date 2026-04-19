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

export default function ProjectCard({ project }: Props) {
  const tags = parseJsonArray(project.techStack);
  const [detailOpen, setDetailOpen] = useState(false);
  const [settlementStatus, setSettlementStatus] = useState(project.settlementStatus || "미정산");
  const [settlementSaving, setSettlementSaving] = useState(false);
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

      {project.timelines.length > 0 && (
        <div className={styles.timeline}>
          {project.timelines.map((tl) => (
            <div className={styles.tlItem} key={tl.id}>
              <span
                className={styles.tlDot}
                style={{
                  background: colorMap[tl.color || "green"] || "var(--green)",
                }}
              />
              <span className={styles.tlDate}>{formatDate(tl.date)}</span>
              <span>{tl.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

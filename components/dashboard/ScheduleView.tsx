"use client";

import { useState, useMemo } from "react";
import styles from "./ScheduleView.module.css";
import { formatDate, daysUntil } from "@/lib/dashboard-utils";
import type { Project, Timeline } from "@/lib/types";

type ProjectWithTimelines = Project & { timelines: Timeline[] };

interface Props {
  projects: ProjectWithTimelines[];
}

const STATUS_COLOR: Record<string, string> = {
  "진행중": "var(--yellow)",
  "완료": "var(--green)",
  "AS": "var(--orange)",
};

const STATUS_BG: Record<string, string> = {
  "진행중": "rgba(251, 191, 36, 0.2)",
  "완료": "rgba(52, 211, 153, 0.2)",
  "AS": "rgba(251, 146, 60, 0.2)",
};

const TL_COLOR: Record<string, string> = {
  green: "var(--green)",
  yellow: "var(--yellow)",
  red: "var(--red)",
  orange: "var(--orange)",
  dim: "var(--dim)",
};

/* ━━━━━ HISTORY VIEW ━━━━━ */
function HistoryView({ projects }: { projects: ProjectWithTimelines[] }) {
  type Ev = { id: string; date: string; label: string; sub: string; color: string; status: string; client: string; tag: string };
  const evs: Ev[] = [];
  for (const p of projects) {
    if (p.contractDate) evs.push({ id: `cs-${p.id}`, date: p.contractDate, label: `${p.client} — 계약시작`, sub: p.name, color: "var(--accent)", status: p.status, client: p.client, tag: "계약" });
    if (p.endDate) evs.push({ id: `ce-${p.id}`, date: p.endDate, label: `${p.client} — 종료예정`, sub: p.name, color: "var(--teal)", status: p.status, client: p.client, tag: "종료" });
    for (const tl of p.timelines) {
      evs.push({ id: `tl-${tl.id}`, date: tl.date, label: `${p.client} — ${tl.description}`, sub: p.name, color: TL_COLOR[tl.color || "green"] || "var(--green)", status: p.status, client: p.client, tag: "마일스톤" });
    }
  }
  evs.sort((a, b) => a.date.localeCompare(b.date));

  const grouped = new Map<string, Ev[]>();
  for (const ev of evs) {
    const k = ev.date.substring(0, 7);
    if (!grouped.has(k)) grouped.set(k, []);
    grouped.get(k)!.push(ev);
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const currentMonth = todayStr.substring(0, 7);

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const mk of grouped.keys()) {
      init[mk] = mk < currentMonth;
    }
    return init;
  });

  const toggleMonth = (mk: string) => {
    setCollapsed((prev) => ({ ...prev, [mk]: !prev[mk] }));
  };

  return (
    <div className={styles.hWrap}>
      {Array.from(grouped.entries()).map(([mk, list]) => {
        const [y, m] = mk.split("-");
        const isCollapsed = collapsed[mk] ?? false;
        const isCurrent = mk === currentMonth;
        const eventCount = list.length;

        return (
          <div key={mk} className={styles.hMonth}>
            <button
              className={`${styles.hMonthTag} ${isCurrent ? styles.hMonthCurrent : ""}`}
              onClick={() => toggleMonth(mk)}
            >
              <span>{y}년 {Number(m)}월</span>
              <span className={styles.hMonthMeta}>
                <span className={styles.hMonthCount}>{eventCount}건</span>
                <span className={styles.hMonthArrow}>{isCollapsed ? "▶" : "▼"}</span>
              </span>
            </button>
            {!isCollapsed && (
              <div className={styles.hLine}>
                {list.map((ev) => {
                  const d = daysUntil(ev.date);
                  const past = d < 0;
                  const isToday = ev.date === todayStr;
                  const dd = past ? `D+${Math.abs(d)}` : d === 0 ? "D-Day" : `D-${d}`;
                  return (
                    <div key={ev.id} className={`${styles.hCard} ${past ? styles.hPast : ""} ${isToday ? styles.hNow : ""}`}>
                      <div className={styles.hDot} style={{ background: ev.color }} />
                      <div className={styles.hBody}>
                        <div className={styles.hHead}>
                          <span className={styles.hDate}>{formatDate(ev.date)}</span>
                          <span className={styles.hTag}>{ev.tag}</span>
                          <span className={styles.hDd} style={{ color: ev.color }}>{dd}</span>
                        </div>
                        <div className={styles.hTitle}>{ev.label}</div>
                        <div className={styles.hSub}>
                          {ev.sub}
                          <span className={styles.hStatus} style={{ color: STATUS_COLOR[ev.status] || "var(--dim)", background: STATUS_BG[ev.status] || "rgba(128,128,128,0.1)" }}>
                            {ev.status === "AS" ? "A/S" : ev.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ━━━━━ MAIN ━━━━━ */
export default function ScheduleView({ projects }: Props) {
  return (
    <div className={styles.wrap}>
      <HistoryView projects={projects} />
    </div>
  );
}

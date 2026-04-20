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

type ViewMode = "gantt" | "history";

/* ──── 유틸 ──── */
function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function computeRange(projects: ProjectWithTimelines[]) {
  let min = new Date();
  let max = new Date();
  for (const p of projects) {
    for (const d of [p.contractDate, p.endDate]) {
      if (d) {
        const dt = new Date(d);
        if (dt < min) min = dt;
        if (dt > max) max = dt;
      }
    }
    for (const tl of p.timelines) {
      const dt = new Date(tl.date);
      if (dt < min) min = dt;
      if (dt > max) max = dt;
    }
  }
  // 앞뒤 1개월 여유
  const start = new Date(min.getFullYear(), min.getMonth() - 1, 1);
  const end = new Date(max.getFullYear(), max.getMonth() + 2, 0);
  const months: { y: number; m: number; label: string; days: number }[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    const daysInMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
    months.push({
      y: cur.getFullYear(),
      m: cur.getMonth(),
      label: `${String(cur.getMonth() + 1)}월`,
      days: daysInMonth,
    });
    cur.setMonth(cur.getMonth() + 1);
  }
  const totalDays = daysBetween(start, end) + 1;
  return { start, end, months, totalDays };
}

/* ━━━━━ GANTT VIEW ━━━━━ */
function GanttView({ projects }: { projects: ProjectWithTimelines[] }) {
  const filtered = projects.filter((p) => p.contractDate || p.timelines.length > 0);
  const range = useMemo(() => computeRange(filtered), [filtered]);
  const { start, totalDays, months } = range;

  const pct = (dateStr: string) => (daysBetween(start, new Date(dateStr)) / totalDays) * 100;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayPct = (daysBetween(start, today) / totalDays) * 100;

  if (filtered.length === 0) {
    return <div className={styles.empty}>계약기간이 설정된 프로젝트가 없습니다</div>;
  }

  return (
    <div className={styles.gantt}>
      {/* ─ 월 헤더 ─ */}
      <div className={styles.gRow}>
        <div className={styles.gLabel} />
        <div className={styles.gTrackWrap}>
        <div className={styles.gTrack}>
          {months.map((m, i) => {
            const mStart = new Date(m.y, m.m, 1);
            const left = (daysBetween(start, mStart) / totalDays) * 100;
            const width = (m.days / totalDays) * 100;
            return (
              <span key={i} className={styles.gMonth} style={{ left: `${left}%`, width: `${width}%` }}>
                {m.label}
              </span>
            );
          })}
          {todayPct >= 0 && todayPct <= 100 && (
            <div className={styles.gToday} style={{ left: `${todayPct}%` }}>
              <span className={styles.gTodayTag}>오늘</span>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* ─ 프로젝트 행들 ─ */}
      {filtered.map((p) => {
        const hasBar = p.contractDate && p.endDate;
        const color = STATUS_COLOR[p.status] || "var(--dim)";
        const bg = STATUS_BG[p.status] || "rgba(128,128,128,0.15)";

        const barL = hasBar ? pct(p.contractDate!) : 0;
        const barR = hasBar ? pct(p.endDate!) : 0;
        const barW = barR - barL;

        const endDays = p.endDate ? daysUntil(p.endDate) : null;
        const dDay = endDays !== null
          ? endDays < 0 ? `D+${Math.abs(endDays)}` : endDays === 0 ? "D-Day" : `D-${endDays}`
          : null;

        return (
          <div className={styles.gRow} key={p.id}>
            {/* 좌측 라벨 */}
            <div className={styles.gLabel}>
              <span className={styles.gName}>{p.client}</span>
              <span className={styles.gSub}>{p.name}</span>
              <span className={styles.gMeta}>
                <span className={styles.gBadge} style={{ color, background: bg }}>
                  {p.status === "AS" ? "A/S" : p.status}
                </span>
                {dDay && <span className={styles.gDday} style={{ color }}>{dDay}</span>}
              </span>
            </div>

            {/* 트랙 — 바 영역 + 마일스톤 영역 분리 */}
            <div className={styles.gTrackWrap}>
              {/* 바 영역 */}
              <div className={styles.gTrack}>
                {months.map((m, i) => {
                  const mStart = new Date(m.y, m.m, 1);
                  const left = (daysBetween(start, mStart) / totalDays) * 100;
                  return <div key={i} className={styles.gGrid} style={{ left: `${left}%` }} />;
                })}
                {todayPct >= 0 && todayPct <= 100 && (
                  <div className={styles.gTodayLine} style={{ left: `${todayPct}%` }} />
                )}
                {hasBar && (
                  <div
                    className={styles.gBar}
                    style={{ left: `${barL}%`, width: `${Math.max(barW, 0.3)}%`, background: bg, borderLeftColor: color }}
                  />
                )}
              </div>

              {/* 마일스톤 영역 */}
              {p.timelines.length > 0 && (
                <div className={styles.gMilestones}>
                  {months.map((m, i) => {
                    const mStart = new Date(m.y, m.m, 1);
                    const left = (daysBetween(start, mStart) / totalDays) * 100;
                    return <div key={i} className={styles.gGrid} style={{ left: `${left}%` }} />;
                  })}
                  {todayPct >= 0 && todayPct <= 100 && (
                    <div className={styles.gTodayLine} style={{ left: `${todayPct}%` }} />
                  )}
                  {p.timelines.map((tl) => {
                    const pos = pct(tl.date);
                    if (pos < -2 || pos > 102) return null;
                    const c = TL_COLOR[tl.color || "green"] || "var(--green)";
                    return (
                      <div key={tl.id} className={styles.gDot} style={{ left: `${pos}%` }}>
                        <span className={styles.gDotInner} style={{ background: c }} />
                        <span className={styles.gDotLabel}>{tl.description}</span>
                        <div className={styles.gTip}>
                          <strong>{formatDate(tl.date)}</strong>
                          {tl.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

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

  return (
    <div className={styles.hWrap}>
      {Array.from(grouped.entries()).map(([mk, list]) => {
        const [y, m] = mk.split("-");
        return (
          <div key={mk} className={styles.hMonth}>
            <div className={styles.hMonthTag}>{y}년 {Number(m)}월</div>
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
          </div>
        );
      })}
    </div>
  );
}

/* ━━━━━ MAIN ━━━━━ */
export default function ScheduleView({ projects }: Props) {
  const [view, setView] = useState<ViewMode>("gantt");

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${view === "gantt" ? styles.tabOn : ""}`} onClick={() => setView("gantt")}>타임라인</button>
        <button className={`${styles.tab} ${view === "history" ? styles.tabOn : ""}`} onClick={() => setView("history")}>히스토리</button>
      </div>

      {view === "gantt" && <GanttView projects={projects} />}
      {view === "history" && <HistoryView projects={projects} />}
    </div>
  );
}

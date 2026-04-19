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
  "진행중": "rgba(251, 191, 36, 0.18)",
  "완료": "rgba(52, 211, 153, 0.18)",
  "AS": "rgba(251, 146, 60, 0.18)",
};

const TL_COLOR_MAP: Record<string, string> = {
  green: "var(--green)",
  yellow: "var(--yellow)",
  red: "var(--red)",
  orange: "var(--orange)",
  dim: "var(--dim)",
};

type ViewMode = "gantt" | "calendar";

// Gantt 타임라인에 필요한 월 범위 계산
function getMonthRange(projects: ProjectWithTimelines[]) {
  let minDate = new Date();
  let maxDate = new Date();

  for (const p of projects) {
    if (p.contractDate) {
      const d = new Date(p.contractDate);
      if (d < minDate) minDate = d;
    }
    if (p.endDate) {
      const d = new Date(p.endDate);
      if (d > maxDate) maxDate = d;
    }
    for (const tl of p.timelines) {
      const d = new Date(tl.date);
      if (d < minDate) minDate = d;
      if (d > maxDate) maxDate = d;
    }
  }

  // 앞뒤 1개월 여유
  minDate = new Date(minDate.getFullYear(), minDate.getMonth() - 1, 1);
  maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 2, 0);

  const months: { year: number; month: number; label: string }[] = [];
  const cur = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  while (cur <= maxDate) {
    months.push({
      year: cur.getFullYear(),
      month: cur.getMonth(),
      label: `${cur.getFullYear()}.${String(cur.getMonth() + 1).padStart(2, "0")}`,
    });
    cur.setMonth(cur.getMonth() + 1);
  }
  return { minDate, maxDate, months };
}

function daysBetween(d1: Date, d2: Date) {
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

// ============ GANTT VIEW ============
function GanttView({ projects }: { projects: ProjectWithTimelines[] }) {
  const projectsWithDates = projects.filter((p) => p.contractDate || p.timelines.length > 0);
  const { minDate, months } = useMemo(() => getMonthRange(projectsWithDates), [projectsWithDates]);

  const totalDays = useMemo(() => {
    if (months.length === 0) return 1;
    const lastMonth = months[months.length - 1];
    const lastDate = new Date(lastMonth.year, lastMonth.month + 1, 0);
    return daysBetween(minDate, lastDate) || 1;
  }, [minDate, months]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOffset = daysBetween(minDate, today) / totalDays * 100;

  const toPercent = (dateStr: string) => {
    const d = new Date(dateStr);
    return daysBetween(minDate, d) / totalDays * 100;
  };

  if (projectsWithDates.length === 0) {
    return <div className={styles.empty}>계약기간이 설정된 프로젝트가 없습니다</div>;
  }

  return (
    <div className={styles.ganttWrap}>
      {/* 월 헤더 */}
      <div className={styles.ganttHeader}>
        <div className={styles.ganttLabelCol}></div>
        <div className={styles.ganttTimeline}>
          {months.map((m) => {
            const start = new Date(m.year, m.month, 1);
            const end = new Date(m.year, m.month + 1, 0);
            const left = daysBetween(minDate, start) / totalDays * 100;
            const width = daysBetween(start, end) / totalDays * 100;
            return (
              <div
                key={m.label}
                className={styles.ganttMonth}
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                {m.label}
              </div>
            );
          })}
          {/* 오늘 마커 */}
          {todayOffset >= 0 && todayOffset <= 100 && (
            <div className={styles.todayLine} style={{ left: `${todayOffset}%` }}>
              <span className={styles.todayLabel}>TODAY</span>
            </div>
          )}
        </div>
      </div>

      {/* 프로젝트 행 */}
      {projectsWithDates.map((p) => {
        const hasRange = p.contractDate && p.endDate;
        const barLeft = hasRange ? toPercent(p.contractDate!) : 0;
        const barRight = hasRange ? toPercent(p.endDate!) : 0;
        const barWidth = barRight - barLeft;
        const statusColor = STATUS_COLOR[p.status] || "var(--dim)";
        const statusBg = STATUS_BG[p.status] || "rgba(128,128,128,0.18)";

        const endDays = p.endDate ? daysUntil(p.endDate) : null;
        const dDayText = endDays !== null
          ? endDays < 0 ? `D+${Math.abs(endDays)}` : endDays === 0 ? "D-Day" : `D-${endDays}`
          : null;

        return (
          <div className={styles.ganttRow} key={p.id}>
            {/* 프로젝트 정보 */}
            <div className={styles.ganttLabelCol}>
              <div className={styles.ganttProjectName}>{p.client}</div>
              <div className={styles.ganttProjectSub}>{p.name}</div>
              <div className={styles.ganttMeta}>
                <span className={styles.ganttStatus} style={{ color: statusColor, background: statusBg }}>
                  {p.status === "AS" ? "A/S" : p.status}
                </span>
                {dDayText && (
                  <span className={styles.ganttDday} style={{ color: statusColor }}>{dDayText}</span>
                )}
              </div>
            </div>

            {/* 타임라인 바 */}
            <div className={styles.ganttTimeline}>
              {/* 월 구분선 */}
              {months.map((m) => {
                const start = new Date(m.year, m.month, 1);
                const left = daysBetween(minDate, start) / totalDays * 100;
                return <div key={m.label} className={styles.ganttGridLine} style={{ left: `${left}%` }} />;
              })}

              {/* 오늘 마커 */}
              {todayOffset >= 0 && todayOffset <= 100 && (
                <div className={styles.todayLineRow} style={{ left: `${todayOffset}%` }} />
              )}

              {/* 계약기간 바 */}
              {hasRange && (
                <div
                  className={styles.ganttBar}
                  style={{
                    left: `${barLeft}%`,
                    width: `${Math.max(barWidth, 0.5)}%`,
                    background: statusBg,
                    borderColor: statusColor,
                  }}
                >
                  <span className={styles.ganttBarText} style={{ color: statusColor }}>
                    {formatDate(p.contractDate!)} ~ {formatDate(p.endDate!)}
                  </span>
                </div>
              )}

              {/* 타임라인 마일스톤 도트 */}
              {p.timelines.map((tl) => {
                const pos = toPercent(tl.date);
                if (pos < 0 || pos > 100) return null;
                const dotColor = TL_COLOR_MAP[tl.color || "green"] || "var(--green)";
                return (
                  <div
                    key={tl.id}
                    className={styles.ganttMilestone}
                    style={{ left: `${pos}%` }}
                    title={`${formatDate(tl.date)} - ${tl.description}`}
                  >
                    <div className={styles.ganttMilestoneDot} style={{ background: dotColor }} />
                    <span className={styles.ganttMilestoneLabel}>{tl.description}</span>
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

// ============ HISTORY LIST VIEW (D-Day 카드) ============
function HistoryView({ projects }: { projects: ProjectWithTimelines[] }) {
  // 모든 이벤트를 시간순으로 수집
  type HistoryItem = {
    id: string;
    date: string;
    label: string;
    description: string;
    type: "contract-start" | "contract-end" | "timeline";
    color: string;
    projectName: string;
    client: string;
    status: string;
  };

  const items: HistoryItem[] = [];

  for (const p of projects) {
    if (p.contractDate) {
      items.push({
        id: `cs-${p.id}`,
        date: p.contractDate,
        label: "계약시작",
        description: p.name,
        type: "contract-start",
        color: "var(--accent)",
        projectName: p.name,
        client: p.client,
        status: p.status,
      });
    }
    if (p.endDate) {
      items.push({
        id: `ce-${p.id}`,
        date: p.endDate,
        label: "종료예정",
        description: p.name,
        type: "contract-end",
        color: "var(--teal)",
        projectName: p.name,
        client: p.client,
        status: p.status,
      });
    }
    for (const tl of p.timelines) {
      items.push({
        id: `tl-${tl.id}`,
        date: tl.date,
        label: tl.description,
        description: p.name,
        type: "timeline",
        color: TL_COLOR_MAP[tl.color || "green"] || "var(--green)",
        projectName: p.name,
        client: p.client,
        status: p.status,
      });
    }
  }

  items.sort((a, b) => a.date.localeCompare(b.date));

  // 월별 그룹핑
  const grouped = new Map<string, HistoryItem[]>();
  for (const item of items) {
    const key = item.date.substring(0, 7); // YYYY-MM
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(item);
  }

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className={styles.historyWrap}>
      {Array.from(grouped.entries()).map(([monthKey, monthItems]) => {
        const [y, m] = monthKey.split("-");
        return (
          <div className={styles.historyMonth} key={monthKey}>
            <div className={styles.historyMonthLabel}>{y}년 {Number(m)}월</div>
            <div className={styles.historyLine}>
              {monthItems.map((item) => {
                const days = daysUntil(item.date);
                const isPast = days < 0;
                const isToday = item.date === todayStr;
                const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;

                return (
                  <div
                    key={item.id}
                    className={`${styles.historyItem} ${isPast ? styles.historyPast : ""} ${isToday ? styles.historyToday : ""}`}
                  >
                    <div className={styles.historyDot} style={{ background: item.color }} />
                    <div className={styles.historyContent}>
                      <div className={styles.historyTop}>
                        <span className={styles.historyDate}>{formatDate(item.date)}</span>
                        <span className={styles.historyDday} style={{ color: item.color }}>{dDayText}</span>
                      </div>
                      <div className={styles.historyTitle}>{item.client} — {item.label}</div>
                      <div className={styles.historyDesc}>
                        {item.description}
                        <span
                          className={styles.historyStatus}
                          style={{
                            color: STATUS_COLOR[item.status] || "var(--dim)",
                            background: STATUS_BG[item.status] || "rgba(128,128,128,0.1)",
                          }}
                        >
                          {item.status === "AS" ? "A/S" : item.status}
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

// ============ MAIN ============
export default function ScheduleView({ projects }: Props) {
  const [view, setView] = useState<ViewMode>("gantt");

  return (
    <div className={styles.wrap}>
      {/* 뷰 토글 */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.toggleBtn} ${view === "gantt" ? styles.toggleActive : ""}`}
          onClick={() => setView("gantt")}
        >
          타임라인
        </button>
        <button
          className={`${styles.toggleBtn} ${view === "calendar" ? styles.toggleActive : ""}`}
          onClick={() => setView("calendar")}
        >
          히스토리
        </button>
      </div>

      {/* 범례 */}
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--accent)" }} />
          <span>계약시작</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--teal)" }} />
          <span>종료예정</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: "var(--orange)" }} />
          <span>마일스톤</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendBar} style={{ background: "rgba(251, 191, 36, 0.18)", borderColor: "var(--yellow)" }} />
          <span>진행중</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendBar} style={{ background: "rgba(52, 211, 153, 0.18)", borderColor: "var(--green)" }} />
          <span>완료</span>
        </div>
      </div>

      {view === "gantt" && <GanttView projects={projects} />}
      {view === "calendar" && <HistoryView projects={projects} />}
    </div>
  );
}

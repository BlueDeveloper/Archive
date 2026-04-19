"use client";

import { useState } from "react";
import styles from "./Calendar.module.css";
import { daysUntil, deadlineColor, formatDate } from "@/lib/dashboard-utils";
import type { Project, Timeline } from "@/lib/types";

type ProjectWithTimelines = Project & { timelines: Timeline[] };

interface CalendarEvent {
  id: string;
  label: string;
  description: string | null;
  date: string;
  type: "contract-start" | "contract-end" | "timeline" | "personal";
  color?: string;
  projectName?: string;
  projectStatus?: string;
}

const PERSONAL_EVENTS: CalendarEvent[] = [
  {
    id: "lease",
    label: "전세계약 만료",
    description: "보증금 2.4억",
    date: "2028-01-01",
    type: "personal",
  },
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const TYPE_LABELS: Record<string, string> = {
  "contract-start": "계약시작",
  "contract-end": "종료예정",
  "timeline": "타임라인",
  "personal": "개인",
};

const TYPE_COLORS: Record<string, string> = {
  "contract-start": "var(--accent)",
  "contract-end": "var(--teal)",
  "timeline": "var(--orange)",
  "personal": "var(--dim)",
};

interface Props {
  projects: ProjectWithTimelines[];
}

function buildEvents(projects: ProjectWithTimelines[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (const p of projects) {
    if (p.contractDate) {
      events.push({
        id: `contract-start-${p.id}`,
        label: `${p.client} - ${p.name}`,
        description: `계약시작${p.endDate ? ` (~ ${formatDate(p.endDate)})` : ""}`,
        date: p.contractDate,
        type: "contract-start",
        projectName: p.name,
        projectStatus: p.status,
      });
    }

    if (p.endDate) {
      events.push({
        id: `contract-end-${p.id}`,
        label: `${p.client} - ${p.name}`,
        description: `종료예정${p.contractDate ? ` (${formatDate(p.contractDate)} ~)` : ""}`,
        date: p.endDate,
        type: "contract-end",
        projectName: p.name,
        projectStatus: p.status,
      });
    }

    for (const tl of p.timelines) {
      events.push({
        id: `tl-${tl.id}`,
        label: `${p.client} - ${tl.description}`,
        description: p.name,
        date: tl.date,
        type: "timeline",
        color: tl.color || "orange",
        projectName: p.name,
        projectStatus: p.status,
      });
    }
  }

  events.push(...PERSONAL_EVENTS);
  return events;
}

function getContractRanges(projects: ProjectWithTimelines[]) {
  return projects
    .filter((p) => p.contractDate && p.endDate)
    .map((p) => ({
      projectId: p.id,
      name: `${p.client} - ${p.name}`,
      start: p.contractDate!,
      end: p.endDate!,
      status: p.status,
    }));
}

function getEventBgColor(ev: CalendarEvent): string {
  if (ev.type === "timeline") {
    const colorMap: Record<string, string> = {
      green: "var(--green)",
      yellow: "var(--yellow)",
      red: "var(--red)",
      orange: "var(--orange)",
      dim: "var(--dim)",
    };
    return colorMap[ev.color || "orange"] || "var(--orange)";
  }
  return TYPE_COLORS[ev.type] || "var(--dim)";
}

export default function Calendar({ projects }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const allEvents = buildEvents(projects);
  const contractRanges = getContractRanges(projects);

  const eventMap = new Map<string, CalendarEvent[]>();
  for (const ev of allEvents) {
    if (!eventMap.has(ev.date)) eventMap.set(ev.date, []);
    eventMap.get(ev.date)!.push(ev);
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const goPrev = () => {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
    setSelectedDate(null);
  };

  const goNext = () => {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
    setSelectedDate(null);
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setSelectedDate(null);
  };

  const cells: { day: number; dateStr: string; inMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = month === 0 ? 12 : month;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, dateStr: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`, inMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, dateStr, inMonth: true });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 1 : month + 2;
    const y = month === 11 ? year + 1 : year;
    cells.push({ day: d, dateStr: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`, inMonth: false });
  }

  // 해당 날짜가 계약 기간 범위 안에 있는지 체크
  function getActiveRanges(dateStr: string) {
    return contractRanges.filter((r) => dateStr >= r.start && dateStr <= r.end);
  }

  const selectedEvents = selectedDate ? (eventMap.get(selectedDate) || []) : [];
  const selectedRanges = selectedDate ? getActiveRanges(selectedDate) : [];

  const monthEvents = allEvents
    .filter((item) => {
      const [iy, im] = item.date.split("-").map(Number);
      return iy === year && im === month + 1;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const handleCellClick = (cell: { dateStr: string; inMonth: boolean }) => {
    if (!cell.inMonth) return;
    setSelectedDate(cell.dateStr === selectedDate ? null : cell.dateStr);
  };

  const closeModal = () => setSelectedDate(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.calendarCard}>
        {/* 헤더 */}
        <div className={styles.header}>
          <button className={styles.navBtn} onClick={goPrev}>&#8249;</button>
          <div className={styles.title}>
            <span className={styles.yearMonth}>{year}년 {month + 1}월</span>
            <button className={styles.todayBtn} onClick={goToday}>오늘</button>
          </div>
          <button className={styles.navBtn} onClick={goNext}>&#8250;</button>
        </div>

        {/* 범례 */}
        <div className={styles.legend}>
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
            <span>타임라인</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendBar} style={{ background: "rgba(108, 126, 255, 0.15)" }} />
            <span>계약기간</span>
          </div>
        </div>

        {/* 요일 */}
        <div className={styles.weekdays}>
          {WEEKDAYS.map((w, i) => (
            <div key={w} className={`${styles.weekday} ${i === 0 ? styles.sun : i === 6 ? styles.sat : ""}`}>{w}</div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className={styles.grid}>
          {cells.map((cell, idx) => {
            const events = eventMap.get(cell.dateStr) || [];
            const ranges = getActiveRanges(cell.dateStr);
            const isToday = cell.dateStr === todayStr;
            const isSelected = cell.dateStr === selectedDate;
            const dayOfWeek = idx % 7;
            const hasRange = ranges.length > 0 && cell.inMonth;

            return (
              <div
                key={idx}
                className={`${styles.cell} ${!cell.inMonth ? styles.outside : ""} ${isToday ? styles.today : ""} ${isSelected ? styles.selected : ""} ${events.length > 0 ? styles.hasEvent : ""} ${hasRange ? styles.inRange : ""}`}
                onClick={() => handleCellClick(cell)}
              >
                <span className={`${styles.dayNum} ${dayOfWeek === 0 ? styles.sun : dayOfWeek === 6 ? styles.sat : ""}`}>
                  {cell.day}
                </span>
                {/* PC: 텍스트 라벨 표시 */}
                {events.length > 0 && (
                  <div className={styles.cellEvents}>
                    {events.slice(0, 2).map((ev) => (
                      <div key={ev.id} className={styles.cellEvent} style={{ background: getEventBgColor(ev) }}>
                        <span className={styles.cellEventText}>{ev.label}</span>
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className={styles.cellMore}>+{events.length - 2}</div>
                    )}
                  </div>
                )}
                {/* 모바일: 도트만 */}
                {events.length > 0 && (
                  <div className={styles.dots}>
                    {events.slice(0, 3).map((ev) => (
                      <span key={ev.id} className={styles.dot} style={{ background: getEventBgColor(ev) }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PC 팝업 모달 */}
      {selectedDate && (selectedEvents.length > 0 || selectedRanges.length > 0) && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{selectedDate.replace(/-/g, ".")} 일정</span>
              <button className={styles.modalClose} onClick={closeModal}>&#10005;</button>
            </div>
            <div className={styles.modalBody}>
              {/* 계약 기간 중인 프로젝트 */}
              {selectedRanges.length > 0 && (
                <div className={styles.modalSection}>
                  <div className={styles.modalSectionLabel}>진행중인 계약</div>
                  {selectedRanges.map((r) => (
                    <div key={r.projectId} className={styles.modalItem}>
                      <span className={styles.modalBadge} style={{ background: "rgba(108, 126, 255, 0.14)", color: "var(--accent)" }}>계약</span>
                      <div className={styles.modalInfo}>
                        <div className={styles.modalName}>{r.name}</div>
                        <div className={styles.modalDesc}>
                          {formatDate(r.start)} ~ {formatDate(r.end)}
                          <span className={styles.statusBadge} data-status={r.status}>{r.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 해당 날짜의 이벤트 */}
              {selectedEvents.length > 0 && (
                <div className={styles.modalSection}>
                  {selectedRanges.length > 0 && <div className={styles.modalSectionLabel}>이벤트</div>}
                  {selectedEvents.map((ev) => {
                    const days = daysUntil(ev.date);
                    const isPast = days < 0;
                    const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;

                    return (
                      <div key={ev.id} className={styles.modalItem}>
                        <span className={styles.modalDday} style={{ color: getEventBgColor(ev) }}>{dDayText}</span>
                        <div className={styles.modalInfo}>
                          <div className={styles.modalName}>
                            {ev.type === "personal" && <span className={styles.personalBadge}>개인</span>}
                            {ev.label}
                          </div>
                          {ev.description && <div className={styles.modalDesc}>{ev.description}</div>}
                          <div className={styles.modalType}>{TYPE_LABELS[ev.type]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 모바일: 선택 날짜 상세 (인라인) */}
      {selectedDate && (selectedEvents.length > 0 || selectedRanges.length > 0) && (
        <div className={styles.mobileDetail}>
          <div className={styles.detailTitle}>
            {selectedDate.replace(/-/g, ".")} 일정
          </div>
          {selectedRanges.map((r) => (
            <div key={r.projectId} className={styles.detailItem}>
              <span className={styles.detailDday} style={{ color: "var(--accent)" }}>계약</span>
              <div>
                <div className={styles.detailName}>{r.name}</div>
                <div className={styles.detailDesc}>
                  {formatDate(r.start)} ~ {formatDate(r.end)}
                </div>
              </div>
            </div>
          ))}
          {selectedEvents.map((ev) => {
            const days = daysUntil(ev.date);
            const isPast = days < 0;
            const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;

            return (
              <div key={ev.id} className={styles.detailItem}>
                <span className={styles.detailDday} style={{ color: getEventBgColor(ev) }}>{dDayText}</span>
                <div>
                  <div className={styles.detailName}>
                    {ev.type === "personal" && <span className={styles.personalBadge}>개인</span>}
                    {ev.label}
                  </div>
                  {ev.description && <div className={styles.detailDesc}>{ev.description}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 월간 리스트 */}
      <div className={styles.monthList}>
        <div className={styles.monthListTitle}>
          {month + 1}월 일정 ({monthEvents.length}건)
        </div>
        {monthEvents.length === 0 && (
          <div className={styles.empty}>이번 달 일정이 없습니다</div>
        )}
        {monthEvents.map((ev) => {
          const days = daysUntil(ev.date);
          const isPast = days < 0;
          const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;
          const dayPart = ev.date.split("-")[2];

          return (
            <div key={ev.id} className={`${styles.listItem} ${isPast ? styles.listPast : ""}`}>
              <div className={styles.listDay}>{Number(dayPart)}일</div>
              <div className={styles.listDot} style={{ background: getEventBgColor(ev) }} />
              <div className={styles.listInfo}>
                <span className={styles.listName}>
                  {ev.type === "personal" && <span className={styles.personalBadge}>개인</span>}
                  <span className={styles.listType}>{TYPE_LABELS[ev.type]}</span>
                  {ev.label}
                </span>
              </div>
              <span className={styles.listDday} style={{ color: getEventBgColor(ev) }}>{dDayText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

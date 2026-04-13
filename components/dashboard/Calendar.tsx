"use client";

import { useState } from "react";
import styles from "./Calendar.module.css";
import { daysUntil, deadlineColor } from "@/lib/dashboard-utils";
import type { Deadline } from "@/lib/types";

interface DeadlineItem {
  id: string | number;
  label: string;
  description: string | null;
  date: string;
  type: string | null;
  category?: "project" | "personal";
}

const PERSONAL_DEADLINES: DeadlineItem[] = [
  {
    id: "lease",
    label: "전세계약 만료",
    description: "보증금 2.4억",
    date: "2028-01-01",
    type: "expiry",
    category: "personal",
  },
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  deadlines: Deadline[];
}

export default function Calendar({ deadlines }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const allItems: DeadlineItem[] = [
    ...deadlines.map((dl) => ({ ...dl, category: "project" as const })),
    ...PERSONAL_DEADLINES,
  ];

  const eventMap = new Map<string, DeadlineItem[]>();
  for (const item of allItems) {
    const key = item.date;
    if (!eventMap.has(key)) eventMap.set(key, []);
    eventMap.get(key)!.push(item);
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

  const selectedEvents = selectedDate ? (eventMap.get(selectedDate) || []) : [];

  const monthEvents = allItems
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
            <span className={styles.legendDot} style={{ background: "var(--red)" }} />
            <span>7일 이내</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "var(--yellow)" }} />
            <span>21일 이내</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "var(--green)" }} />
            <span>21일 이상</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "var(--dim)" }} />
            <span>지난 일정</span>
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
            const isToday = cell.dateStr === todayStr;
            const isSelected = cell.dateStr === selectedDate;
            const dayOfWeek = idx % 7;

            return (
              <div
                key={idx}
                className={`${styles.cell} ${!cell.inMonth ? styles.outside : ""} ${isToday ? styles.today : ""} ${isSelected ? styles.selected : ""} ${events.length > 0 ? styles.hasEvent : ""}`}
                onClick={() => handleCellClick(cell)}
              >
                <span className={`${styles.dayNum} ${dayOfWeek === 0 ? styles.sun : dayOfWeek === 6 ? styles.sat : ""}`}>
                  {cell.day}
                </span>
                {/* PC: 텍스트 라벨 ���시 */}
                {events.length > 0 && (
                  <div className={styles.cellEvents}>
                    {events.slice(0, 2).map((ev, i) => {
                      const days = daysUntil(ev.date);
                      const color = deadlineColor(days);
                      return (
                        <div key={i} className={styles.cellEvent} style={{ background: `var(--${color})` }}>
                          <span className={styles.cellEventText}>{ev.label}</span>
                        </div>
                      );
                    })}
                    {events.length > 2 && (
                      <div className={styles.cellMore}>+{events.length - 2}</div>
                    )}
                  </div>
                )}
                {/* 모바일: 도트만 */}
                {events.length > 0 && (
                  <div className={styles.dots}>
                    {events.slice(0, 3).map((ev, i) => {
                      const days = daysUntil(ev.date);
                      const color = deadlineColor(days);
                      return (
                        <span key={i} className={styles.dot} style={{ background: `var(--${color})` }} />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PC ���업 모달 */}
      {selectedDate && selectedEvents.length > 0 && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{selectedDate.replace(/-/g, ".")} 일정</span>
              <button className={styles.modalClose} onClick={closeModal}>&#10005;</button>
            </div>
            <div className={styles.modalBody}>
              {selectedEvents.map((ev) => {
                const days = daysUntil(ev.date);
                const color = deadlineColor(days);
                const isPast = days < 0;
                const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;

                return (
                  <div key={ev.id} className={styles.modalItem}>
                    <span className={styles.modalDday} style={{ color: `var(--${color})` }}>{dDayText}</span>
                    <div className={styles.modalInfo}>
                      <div className={styles.modalName}>
                        {ev.category === "personal" && <span className={styles.personalBadge}>개인</span>}
                        {ev.label}
                      </div>
                      {ev.description && <div className={styles.modalDesc}>{ev.description}</div>}
                      {ev.type && <div className={styles.modalType}>{ev.type}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 모바일: 선택 날짜 상세 (인라인) */}
      {selectedDate && selectedEvents.length > 0 && (
        <div className={styles.mobileDetail}>
          <div className={styles.detailTitle}>
            {selectedDate.replace(/-/g, ".")} 일정
          </div>
          {selectedEvents.map((ev) => {
            const days = daysUntil(ev.date);
            const color = deadlineColor(days);
            const isPast = days < 0;
            const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;

            return (
              <div key={ev.id} className={styles.detailItem}>
                <span className={styles.detailDday} style={{ color: `var(--${color})` }}>{dDayText}</span>
                <div>
                  <div className={styles.detailName}>
                    {ev.category === "personal" && <span className={styles.personalBadge}>개인</span>}
                    {ev.label}
                  </div>
                  {ev.description && <div className={styles.detailDesc}>{ev.description}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 모바일: 월간 리스트 */}
      <div className={styles.monthList}>
        <div className={styles.monthListTitle}>
          {month + 1}월 일정 ({monthEvents.length}건)
        </div>
        {monthEvents.length === 0 && (
          <div className={styles.empty}>이번 달 일정이 없습니다</div>
        )}
        {monthEvents.map((ev) => {
          const days = daysUntil(ev.date);
          const color = deadlineColor(days);
          const isPast = days < 0;
          const dDayText = isPast ? `D+${Math.abs(days)}` : days === 0 ? "D-Day" : `D-${days}`;
          const dayPart = ev.date.split("-")[2];

          return (
            <div key={ev.id} className={`${styles.listItem} ${isPast ? styles.listPast : ""}`}>
              <div className={styles.listDay}>{Number(dayPart)}일</div>
              <div className={styles.listDot} style={{ background: `var(--${color})` }} />
              <div className={styles.listInfo}>
                <span className={styles.listName}>
                  {ev.category === "personal" && <span className={styles.personalBadge}>개인</span>}
                  {ev.label}
                </span>
              </div>
              <span className={styles.listDday} style={{ color: `var(--${color})` }}>{dDayText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

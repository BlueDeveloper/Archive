"use client";

import { useState } from "react";
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

const COLOR_OPTIONS = ["green", "yellow", "red", "orange"];

/* ━━━━━ TIMELINE FORM ━━━━━ */
function TimelineForm({
  projects,
  initial,
  onSave,
  onCancel,
}: {
  projects: ProjectWithTimelines[];
  initial?: { id?: number; projectId: number; date: string; description: string; color: string };
  onSave: (data: { id?: number; projectId: number; date: string; description: string; color: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const [projectId, setProjectId] = useState(initial?.projectId || projects[0]?.id || 0);
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState(initial?.description || "");
  const [color, setColor] = useState(initial?.color || "green");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || !date) return;
    setSaving(true);
    try {
      await onSave({ id: initial?.id, projectId, date, description: description.trim(), color });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className={styles.tlForm} onSubmit={handleSubmit}>
      <select className={styles.tlSelect} value={projectId} onChange={(e) => setProjectId(Number(e.target.value))}>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>{p.client} — {p.name}</option>
        ))}
      </select>
      <input type="date" className={styles.tlInput} value={date} onChange={(e) => setDate(e.target.value)} required />
      <input className={styles.tlInput} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="마일스톤 설명" required />
      <div className={styles.tlColorPicker}>
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.tlColorBtn} ${color === c ? styles.tlColorActive : ""}`}
            style={{ background: TL_COLOR[c] }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <div className={styles.tlActions}>
        <button type="submit" className={styles.tlSaveBtn} disabled={saving}>
          {initial?.id ? "수정" : "추가"}
        </button>
        <button type="button" className={styles.tlCancelBtn} onClick={onCancel}>취소</button>
      </div>
    </form>
  );
}

/* ━━━━━ HISTORY VIEW ━━━━━ */
function HistoryView({ projects, onEdit, onDelete }: {
  projects: ProjectWithTimelines[];
  onEdit: (tl: Timeline, project: ProjectWithTimelines) => void;
  onDelete: (id: number) => void;
}) {
  type Ev = { id: string; tlId?: number; date: string; label: string; sub: string; color: string; status: string; client: string; tag: string; isTimeline: boolean; project?: ProjectWithTimelines };
  const evs: Ev[] = [];
  for (const p of projects) {
    if (p.contractDate) evs.push({ id: `cs-${p.id}`, date: p.contractDate, label: `${p.client} — 계약시작`, sub: p.name, color: "var(--accent)", status: p.status, client: p.client, tag: "계약", isTimeline: false });
    if (p.endDate) evs.push({ id: `ce-${p.id}`, date: p.endDate, label: `${p.client} — 종료예정`, sub: p.name, color: "var(--teal)", status: p.status, client: p.client, tag: "종료", isTimeline: false });
    for (const tl of p.timelines) {
      evs.push({ id: `tl-${tl.id}`, tlId: tl.id, date: tl.date, label: `${p.client} — ${tl.description}`, sub: p.name, color: TL_COLOR[tl.color || "green"] || "var(--green)", status: p.status, client: p.client, tag: "마일스톤", isTimeline: true, project: p });
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
                          {ev.isTimeline && ev.tlId && (
                            <span className={styles.hActions}>
                              <button
                                className={styles.hEditBtn}
                                onClick={() => {
                                  const tl = ev.project?.timelines.find((t) => t.id === ev.tlId);
                                  if (tl && ev.project) onEdit(tl, ev.project);
                                }}
                              >
                                수정
                              </button>
                              <button className={styles.hDeleteBtn} onClick={() => onDelete(ev.tlId!)}>
                                삭제
                              </button>
                            </span>
                          )}
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
export default function ScheduleView({ projects: initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingTl, setEditingTl] = useState<{ tl: Timeline; project: ProjectWithTimelines } | null>(null);

  async function handleAdd(data: { projectId: number; date: string; description: string; color: string }) {
    const res = await fetch("/api/timelines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const created = await res.json() as Timeline;
      setProjects((prev) =>
        prev.map((p) =>
          p.id === data.projectId ? { ...p, timelines: [...p.timelines, created] } : p
        )
      );
      setShowForm(false);
    }
  }

  async function handleUpdate(data: { id?: number; projectId: number; date: string; description: string; color: string }) {
    if (!data.id) return;
    const res = await fetch("/api/timelines", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json() as Timeline;
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          timelines: p.timelines.map((t) => (t.id === updated.id ? updated : t)),
        }))
      );
      setEditingTl(null);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch("/api/timelines", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          timelines: p.timelines.filter((t) => t.id !== id),
        }))
      );
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.scheduleHeader}>
        <button className={styles.addTimelineBtn} onClick={() => { setShowForm(true); setEditingTl(null); }}>
          + 마일스톤 추가
        </button>
      </div>

      {showForm && !editingTl && (
        <TimelineForm
          projects={projects}
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTl && (
        <TimelineForm
          projects={projects}
          initial={{
            id: editingTl.tl.id,
            projectId: editingTl.tl.projectId,
            date: editingTl.tl.date,
            description: editingTl.tl.description,
            color: editingTl.tl.color || "green",
          }}
          onSave={handleUpdate}
          onCancel={() => setEditingTl(null)}
        />
      )}

      <HistoryView
        projects={projects}
        onEdit={(tl, project) => { setEditingTl({ tl, project }); setShowForm(false); }}
        onDelete={handleDelete}
      />
    </div>
  );
}

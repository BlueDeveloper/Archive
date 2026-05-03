"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import styles from "./ProjectListView.module.css";
import sectionStyles from "./Section.module.css";
import type { Project, Timeline } from "@/lib/types";

type ProjectWithTimelines = Project & { timelines: Timeline[] };

interface Props {
  projects: ProjectWithTimelines[];
}

function sortByContractDate(list: ProjectWithTimelines[]) {
  return [...list].sort((a, b) => {
    const da = a.contractDate || "9999";
    const db_ = b.contractDate || "9999";
    return da.localeCompare(db_);
  });
}

export default function ProjectListView({ projects }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({ saas: true, inProgress: true, done: true });

  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const saas = sortByContractDate(projects.filter((p) => p.type === "SAAS"));
  const nonSaas = projects.filter((p) => p.type !== "SAAS");
  const inProgress = sortByContractDate(nonSaas.filter((p) => p.status === "진행중"));
  const done = sortByContractDate(nonSaas.filter((p) => p.status === "완료" || p.status === "AS"));

  return (
    <div>
      <div className={styles.header}>
        <div className={sectionStyles.section}>
          <span className={`${sectionStyles.dot} ${sectionStyles.dotAccent}`} />
          프로젝트목록
        </div>
        <button
          className={styles.addBtn}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "닫기" : "+ 프로젝트 등록"}
        </button>
      </div>

      {showForm && (
        <div className={styles.formWrap}>
          <ProjectForm />
        </div>
      )}

      {saas.length > 0 && (
        <>
          <div
            className={`${sectionStyles.section} ${styles.sectionToggle}`}
            onClick={() => toggle("saas")}
          >
            <span className={`${sectionStyles.dot} ${sectionStyles.dotAccent}`} />
            SAAS ({saas.length})
            <span className={`${styles.chevron} ${collapsed["saas"] ? styles.chevronClosed : ""}`}>&#9660;</span>
          </div>
          {!collapsed["saas"] && (
            <div className={sectionStyles.projectGrid}>
              {saas.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </>
      )}

      {inProgress.length > 0 && (
        <>
          <div
            className={`${sectionStyles.section} ${styles.sectionToggle}`}
            onClick={() => toggle("inProgress")}
          >
            <span className={`${sectionStyles.dot} ${sectionStyles.dotYellow}`} />
            진행중 ({inProgress.length})
            <span className={`${styles.chevron} ${collapsed["inProgress"] ? styles.chevronClosed : ""}`}>&#9660;</span>
          </div>
          {!collapsed["inProgress"] && (
            <div className={sectionStyles.projectGrid}>
              {inProgress.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </>
      )}

      {done.length > 0 && (
        <>
          <div
            className={`${sectionStyles.section} ${styles.sectionToggle}`}
            onClick={() => toggle("done")}
          >
            <span className={`${sectionStyles.dot} ${sectionStyles.dotGreen}`} />
            완료 ({done.length})
            <span className={`${styles.chevron} ${collapsed["done"] ? styles.chevronClosed : ""}`}>&#9660;</span>
          </div>
          {!collapsed["done"] && (
            <div className={sectionStyles.projectGrid}>
              {done.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

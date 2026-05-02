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

export default function ProjectListView({ projects }: Props) {
  const [showForm, setShowForm] = useState(false);

  const saas = projects.filter((p) => p.type === "SAAS");
  const nonSaas = projects.filter((p) => p.type !== "SAAS");
  const inProgress = nonSaas.filter((p) => p.status === "진행중");
  const done = nonSaas.filter((p) => p.status === "완료" || p.status === "AS");

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
          <div className={sectionStyles.section}>
            <span className={`${sectionStyles.dot} ${sectionStyles.dotAccent}`} />
            SAAS ({saas.length})
          </div>
          <div className={sectionStyles.projectGrid}>
            {saas.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </>
      )}

      {inProgress.length > 0 && (
        <>
          <div className={sectionStyles.section}>
            <span className={`${sectionStyles.dot} ${sectionStyles.dotYellow}`} />
            진행중 ({inProgress.length})
          </div>
          <div className={sectionStyles.projectGrid}>
            {inProgress.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </>
      )}

      {done.length > 0 && (
        <>
          <div className={sectionStyles.section}>
            <span className={`${sectionStyles.dot} ${sectionStyles.dotGreen}`} />
            완료 ({done.length})
          </div>
          <div className={sectionStyles.projectGrid}>
            {done.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

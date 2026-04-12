import styles from "./ProjectCard.module.css";
import { formatMoney, formatDate, parseJsonArray } from "@/lib/dashboard-utils";
import type { Project, Timeline } from "@/lib/types";

interface Props {
  project: Project & { timelines: Timeline[] };
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

export default function ProjectCard({ project }: Props) {
  const tags = parseJsonArray(project.techStack);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.name}>{project.name}</div>
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
        <div>
          <span className={statusBadge(project.status)}>{statusLabel(project.status)}</span>
          {project.statusSub && (
            <>
              {" "}
              <span className={subBadge()}>{project.statusSub}</span>
            </>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.rowKey}>유형</span>
          <span className={styles.rowVal}>{project.type}</span>
        </div>
        {project.platform && (
          <div className={styles.row}>
            <span className={styles.rowKey}>플랫폼</span>
            <span className={styles.rowVal}>{project.platform}</span>
          </div>
        )}
        <div className={styles.row}>
          <span className={styles.rowKey}>정산</span>
          <span
            className={`${styles.rowVal} ${project.status === "완료" ? styles.rowValGreen : styles.rowValYellow}`}
          >
            {formatMoney(project.amount)}원
          </span>
        </div>
        {project.deployMethod && (
          <div className={styles.row}>
            <span className={styles.rowKey}>배포</span>
            <span className={styles.rowVal}>{project.deployMethod}</span>
          </div>
        )}
        {project.contractDate && (
          <div className={styles.row}>
            <span className={styles.rowKey}>계약</span>
            <span className={styles.rowVal}>
              {formatDate(project.contractDate)}
              {project.endDate && ` ~ ${formatDate(project.endDate)}`}
            </span>
          </div>
        )}
        {!project.endDate && (
          <div className={styles.row}>
            <span className={styles.rowKey}>종료예정</span>
            <span className={`${styles.rowVal} ${styles.rowValYellow}`}>
              {project.note || "미정"}
            </span>
          </div>
        )}
        {project.asInfo && (
          <div className={styles.row}>
            <span className={styles.rowKey}>AS</span>
            <span className={styles.rowVal}>{project.asInfo}</span>
          </div>
        )}
        {project.service && (
          <div className={styles.row}>
            <span className={styles.rowKey}>서비스</span>
            <span className={styles.rowVal}>{project.service}</span>
          </div>
        )}
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

import styles from "./Deadlines.module.css";
import { daysUntil, deadlineColor, formatDate } from "@/lib/dashboard-utils";
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
    description: "경기도 화성시 병점구 병점중앙로 230-10, 103동 102호 | 보증금 2.4억",
    date: "2028-01-01",
    type: "expiry",
    category: "personal",
  },
];

interface Props {
  deadlines: Deadline[];
}

export default function Deadlines({ deadlines }: Props) {
  const allItems: DeadlineItem[] = [
    ...deadlines.map((dl) => ({ ...dl, category: "project" as const })),
    ...PERSONAL_DEADLINES,
  ];

  const sorted = allItems.sort((a, b) => {
    const da = daysUntil(a.date);
    const db = daysUntil(b.date);
    return da - db;
  });

  return (
    <div>
      {sorted.map((dl) => {
        const days = daysUntil(dl.date);
        const color = deadlineColor(days);
        const colorVar = `var(--${color})`;
        const isPast = days < 0;
        const isPersonal = dl.category === "personal";

        const dDayText = isPast
          ? `D+${Math.abs(days)}`
          : days === 0
          ? "D-Day"
          : `D-${days}`;

        return (
          <div
            className={`${styles.item} ${isPersonal ? styles.personal : ""}`}
            key={dl.id}
          >
            <div className={styles.left}>
              <div
                className={`${styles.dday} ${isPast ? styles.past : ""}`}
                style={{ color: colorVar }}
              >
                {dDayText}
              </div>
              <div>
                <div className={styles.name}>
                  {isPersonal && (
                    <span className={styles.personalBadge}>개인</span>
                  )}
                  {dl.label}
                </div>
                {dl.description && (
                  <div className={styles.desc}>{dl.description}</div>
                )}
              </div>
            </div>
            <div className={styles.date}>{formatDate(dl.date)}</div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./Nav.module.css";

const MENU = [
  { href: "/dashboard", label: "정산현황" },
  { href: "/dashboard/projects", label: "프로젝트목록" },
  { href: "/dashboard/insights", label: "비즈니스 인사이트" },
  { href: "/dashboard/schedule", label: "일정" },
  { href: "/dashboard/work", label: "작업시간" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch { /* ignore */ }
    router.push("/dashboard/login");
    router.refresh();
  }, [router]);

  return (
    <nav className={styles.nav}>
      <Link href="/dashboard" className={styles.logo}>
        <object
          type="image/svg+xml"
          data="/brp_logo_animated.svg"
          aria-label="BRP 로고"
          style={{ width: 160, height: 64, pointerEvents: 'none' }}
          className={styles.logoImg}
        />
      </Link>
      <div className={styles.menu}>
      {MENU.map((m) => {
        const isActive =
          m.href === "/dashboard"
            ? pathname === "/dashboard" || pathname === "/dashboard/"
            : pathname.startsWith(m.href);

        return (
          <Link
            key={m.href}
            href={m.href}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
          >
            {m.label}
          </Link>
        );
      })}
      <Link href="/" className={styles.archiveLink} title="Archive 사이트로 이동">
        Archive
      </Link>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        로그아웃
      </button>
      </div>
    </nav>
  );
}

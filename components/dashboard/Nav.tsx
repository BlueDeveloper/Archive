"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./Nav.module.css";

const MENU = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/dashboard/schedule", label: "일정" },
  { href: "/dashboard/work", label: "작업시간" },
  { href: "/dashboard/projects/new", label: "프로젝트 등록" },
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
        <Image
          src="/BRP_logo_final.webp"
          alt="BRP 로고"
          width={160}
          height={93}
          className={styles.logoImg}
          unoptimized
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
      <a href="/" className={styles.archiveLink} title="Archive 사이트로 이동">
        Archive →
      </a>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        로그아웃
      </button>
      </div>
    </nav>
  );
}

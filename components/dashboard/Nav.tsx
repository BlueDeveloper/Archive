"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const MENU = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/dashboard/schedule", label: "일정" },
  { href: "/dashboard/work", label: "작업시간" },
] as const;

export default function Nav() {
  const pathname = usePathname();

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
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export const runtime = "edge";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, remember }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        if (res.status === 401) {
          setError("비밀번호가 올바르지 않습니다.");
        } else if (res.status === 400) {
          setError("잘못된 요청입니다. 비밀번호를 입력해 주세요.");
        } else {
          setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
        setIsSubmitting(false);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>BRP 대시보드</h1>
        <p className={styles.sub}>비밀번호를 입력하세요</p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            disabled={isSubmitting}
          />
          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isSubmitting}
            />
            자동 로그인 (30일)
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

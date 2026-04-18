"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./ProjectForm.module.css";
import type { Project } from "@/lib/types";

interface AmountItem {
  label: string;
  amount: number;
}

interface Props {
  project?: Project;
}

const STATUS_OPTIONS = ["진행중", "완료", "AS"];
const TYPE_OPTIONS = ["웹", "앱", "웹+앱", "API", "기타"];

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const isEdit = !!project;

  const [name, setName] = useState(project?.name ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [folder, setFolder] = useState(project?.folder ?? "");
  const [type, setType] = useState(project?.type ?? "웹");
  const [platform, setPlatform] = useState(project?.platform ?? "");
  const [status, setStatus] = useState(project?.status ?? "진행중");
  const [statusSub, setStatusSub] = useState(project?.statusSub ?? "");
  const [amount, setAmount] = useState(project?.amount ?? 0);
  const [amountDetails, setAmountDetails] = useState<AmountItem[]>(() => {
    if (project?.amountDetail) {
      try {
        return JSON.parse(project.amountDetail);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [deployMethod, setDeployMethod] = useState(project?.deployMethod ?? "");
  const [techTags, setTechTags] = useState<string[]>(() => {
    if (project?.techStack) {
      try {
        return JSON.parse(project.techStack);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [tagInput, setTagInput] = useState("");
  const [contractDate, setContractDate] = useState(project?.contractDate ?? "");
  const [endDate, setEndDate] = useState(project?.endDate ?? "");
  const [asInfo, setAsInfo] = useState(project?.asInfo ?? "");
  const [service, setService] = useState(project?.service ?? "");
  const [note, setNote] = useState(project?.note ?? "");
  const [sortOrder, setSortOrder] = useState(project?.sortOrder ?? 0);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function addDetail() {
    setAmountDetails([...amountDetails, { label: "", amount: 0 }]);
  }

  function removeDetail(idx: number) {
    setAmountDetails(amountDetails.filter((_, i) => i !== idx));
  }

  function updateDetail(idx: number, field: "label" | "amount", value: string | number) {
    setAmountDetails(
      amountDetails.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    );
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !techTags.includes(tag)) {
      setTechTags([...techTags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTechTags(techTags.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !client.trim() || !type.trim()) {
      setError("프로젝트명, 클라이언트, 유형은 필수입니다.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload: Record<string, unknown> = {
      name: name.trim(),
      client: client.trim(),
      folder: folder.trim() || null,
      type,
      platform: platform.trim() || null,
      status,
      statusSub: statusSub.trim() || null,
      amount,
      amountDetail: amountDetails.length > 0 ? JSON.stringify(amountDetails) : null,
      deployMethod: deployMethod.trim() || null,
      techStack: techTags.length > 0 ? JSON.stringify(techTags) : null,
      contractDate: contractDate || null,
      endDate: endDate || null,
      asInfo: asInfo.trim() || null,
      service: service.trim() || null,
      note: note.trim() || null,
      sortOrder,
    };

    if (isEdit) {
      payload.id = project.id;
    }

    try {
      const res = await fetch("/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "요청 실패");
      }

      setSuccess(isEdit ? "수정 완료" : "등록 완료");
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEdit ? "프로젝트 수정" : "프로젝트 등록"}</h1>
        <Link href="/dashboard" className={styles.backLink}>
          ← 대시보드
        </Link>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 프로젝트명 */}
        <div className={styles.group}>
          <label className={`${styles.label} ${styles.required}`}>프로젝트명</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="프로젝트 이름"
          />
        </div>

        {/* 클라이언트 */}
        <div className={styles.group}>
          <label className={`${styles.label} ${styles.required}`}>클라이언트</label>
          <input
            className={styles.input}
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="클라이언트명"
          />
        </div>

        {/* 폴더 */}
        <div className={styles.group}>
          <label className={styles.label}>폴더</label>
          <input
            className={styles.input}
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="프로젝트 폴더명"
          />
        </div>

        {/* 유형 + 플랫폼 */}
        <div className={styles.group}>
          <label className={`${styles.label} ${styles.required}`}>유형</label>
          <div className={styles.row}>
            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              className={styles.input}
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="플랫폼 (PC, 모바일 등)"
            />
          </div>
        </div>

        {/* 상태 */}
        <div className={styles.group}>
          <label className={styles.label}>상태</label>
          <div className={styles.row}>
            <select
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              className={styles.input}
              value={statusSub}
              onChange={(e) => setStatusSub(e.target.value)}
              placeholder="상태 세부 (선택)"
            />
          </div>
        </div>

        {/* 견적 */}
        <div className={styles.group}>
          <label className={styles.label}>견적 (원)</label>
          <input
            className={styles.input}
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="총 견적금액"
          />
        </div>

        {/* 견적 상세 */}
        <div className={styles.group}>
          <label className={styles.label}>견적 상세</label>
          <div className={styles.detailSection}>
            <div className={styles.detailHeader}>
              <span className={styles.detailLabel}>항목별 금액 내역</span>
              <button type="button" className={styles.addBtn} onClick={addDetail}>
                + 항목 추가
              </button>
            </div>
            {amountDetails.map((item, i) => (
              <div className={styles.detailRow} key={i}>
                <input
                  className={styles.detailInput}
                  value={item.label}
                  onChange={(e) => updateDetail(i, "label", e.target.value)}
                  placeholder="항목명"
                />
                <input
                  className={styles.detailInput}
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateDetail(i, "amount", Number(e.target.value))}
                  placeholder="금액"
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeDetail(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 배포 */}
        <div className={styles.group}>
          <label className={styles.label}>배포 방법</label>
          <input
            className={styles.input}
            value={deployMethod}
            onChange={(e) => setDeployMethod(e.target.value)}
            placeholder="Cloudflare Pages, Vercel 등"
          />
        </div>

        {/* 기술스택 */}
        <div className={styles.group}>
          <label className={styles.label}>기술스택</label>
          <div className={styles.tagWrap}>
            {techTags.length > 0 && (
              <div className={styles.tagList}>
                {techTags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() => removeTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              className={styles.tagInput}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={addTag}
              placeholder="Enter 또는 , 로 태그 추가"
            />
          </div>
        </div>

        {/* 계약기간 */}
        <div className={styles.group}>
          <label className={styles.label}>계약기간</label>
          <div className={styles.row}>
            <input
              className={styles.input}
              type="date"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
            />
            <input
              className={styles.input}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* A/S */}
        <div className={styles.group}>
          <label className={styles.label}>A/S 정보</label>
          <input
            className={styles.input}
            value={asInfo}
            onChange={(e) => setAsInfo(e.target.value)}
            placeholder="A/S 기간 또는 조건"
          />
        </div>

        {/* 서비스 */}
        <div className={styles.group}>
          <label className={styles.label}>서비스</label>
          <input
            className={styles.input}
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="서비스명"
          />
        </div>

        {/* 정렬 순서 */}
        <div className={styles.group}>
          <label className={styles.label}>정렬 순서</label>
          <input
            className={styles.input}
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            placeholder="0"
          />
        </div>

        {/* 메모 */}
        <div className={styles.group}>
          <label className={styles.label}>메모</label>
          <textarea
            className={styles.textarea}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="추가 메모"
          />
        </div>

        {/* 액션 */}
        <div className={styles.actions}>
          <Link href="/dashboard">
            <button type="button" className={styles.cancelBtn}>취소</button>
          </Link>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? "저장 중..." : isEdit ? "수정" : "등록"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

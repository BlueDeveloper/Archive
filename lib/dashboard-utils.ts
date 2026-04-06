/** D-day 계산: 양수 = 남은 일수, 음수 = 지난 일수 */
export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/** D-day 색상 결정 */
export function deadlineColor(days: number): string {
  if (days < 0) return "dim";
  if (days <= 7) return "red";
  if (days <= 21) return "yellow";
  return "green";
}

/** 금액 포맷 (1,000,000) */
export function formatMoney(amount: number): string {
  return amount.toLocaleString("ko-KR");
}

/** 날짜 포맷 (YYYY-MM-DD → YYYY.MM.DD) */
export function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}

/** JSON 파싱 헬퍼 (tech_stack 등) */
export function parseJsonArray(str: string | null): string[] {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
}

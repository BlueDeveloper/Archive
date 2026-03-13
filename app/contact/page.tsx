import type { Metadata } from 'next';
export { default } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: "문의하기",
  description: "프로젝트 상담 및 견적 문의. 빠르게 검토 후 회신드립니다. 단가 협의 및 범위 확인은 부담 없이 연락 주세요.",
  alternates: {
    canonical: "https://bdarchive.site/contact",
  },
  openGraph: {
    title: "문의하기 | BD 개발 외주",
    description: "프로젝트 상담 및 견적 문의. 빠르게 검토 후 회신드립니다. 단가 협의 및 범위 확인은 부담 없이 연락 주세요.",
    url: "https://bdarchive.site/contact",
  },
};

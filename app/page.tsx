import type { Metadata } from 'next';
export { default } from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: "BD - 프론트엔드 · 백엔드 · 인프라 통합 개발",
  description: "프론트엔드부터 다양한 백엔드, 서버 인프라 배포 자동화까지 직접 구축하는 풀스택 개발자. 10만원~300만원 외주 개발 수주 중.",
  alternates: {
    canonical: "https://bdarchive.site",
  },
  openGraph: {
    title: "BD - 프론트엔드 · 백엔드 · 인프라 통합 개발",
    description: "프론트엔드부터 다양한 백엔드, 서버 인프라 배포 자동화까지 직접 구축하는 풀스택 개발자. 10만원~300만원 외주 개발 수주 중.",
    url: "https://bdarchive.site",
  },
};

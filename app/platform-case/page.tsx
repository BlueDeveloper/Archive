import type { Metadata } from 'next';
export { default } from '@/components/pages/PlatformCasePage';

export const metadata: Metadata = {
  title: "작업 사례",
  description: "포토카드 판매 플랫폼, 웹 유틸리티, 회사 소개 사이트 등 실제 운영 중인 프로젝트 포트폴리오. 기획부터 배포까지 직접 구축한 사례를 확인하세요.",
  alternates: {
    canonical: "https://bdarchive.site/platform-case",
  },
  openGraph: {
    title: "작업 사례 | BD 개발 외주",
    description: "포토카드 판매 플랫폼, 웹 유틸리티, 회사 소개 사이트 등 실제 운영 중인 프로젝트 포트폴리오. 기획부터 배포까지 직접 구축한 사례를 확인하세요.",
    url: "https://bdarchive.site/platform-case",
  },
};

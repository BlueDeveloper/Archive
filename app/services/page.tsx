import type { Metadata } from 'next';
export { default } from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: "서비스 · 요금 안내",
  description: "Basic(10-50만원), Standard(50-150만원), Advanced(150-300만원) 3단계 서비스. 랜딩페이지부터 결제 플랫폼까지 명확한 범위와 가격으로 진행합니다.",
  alternates: {
    canonical: "https://bdarchive.site/services",
  },
  openGraph: {
    title: "서비스 · 요금 안내 | BD 개발 외주",
    description: "Basic(10-50만원), Standard(50-150만원), Advanced(150-300만원) 3단계 서비스. 랜딩페이지부터 결제 플랫폼까지 명확한 범위와 가격으로 진행합니다.",
    url: "https://bdarchive.site/services",
  },
};

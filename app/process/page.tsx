import type { Metadata } from 'next';
export { default } from '@/components/pages/ProcessPage';

export const metadata: Metadata = {
  title: "개발 프로세스",
  description: "요구사항 분석부터 배포·유지보수까지 6단계 개발 프로세스. 명확한 일정과 커뮤니케이션으로 진행합니다.",
  alternates: {
    canonical: "https://bdarchive.site/process",
  },
  openGraph: {
    title: "개발 프로세스 | BD 개발 외주",
    description: "요구사항 분석부터 배포·유지보수까지 6단계 개발 프로세스. 명확한 일정과 커뮤니케이션으로 진행합니다.",
    url: "https://bdarchive.site/process",
  },
};

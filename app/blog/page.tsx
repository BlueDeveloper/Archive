import type { Metadata } from 'next';
import BlogPage from '@/components/pages/BlogPage';

export const metadata: Metadata = {
  title: '기술 블로그',
  description: 'BRP 기술 블로그 - 풀스택 개발, 인프라, 배포 자동화 관련 기술 글',
};

export default function Page() {
  return <BlogPage />;
}

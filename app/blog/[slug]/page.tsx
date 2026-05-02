import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostPage from '@/components/pages/BlogPostPage';
import { getPostBySlug, getAllPosts } from '@/lib/blog/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} | BRP 기술 블로그`,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}

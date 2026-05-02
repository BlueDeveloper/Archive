'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/blog/posts';
import styles from './BlogPage.module.css';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section">
          <div className="section-inner">
            <h1 className={styles.title}>기술 블로그</h1>
            <p className={styles.subtitle}>
              풀스택 개발, 인프라 구축, 배포 자동화 등 실무 경험을 공유합니다.
            </p>
            <div className={styles.postGrid}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <time className={styles.postDate}>{post.date}</time>
                    <div className={styles.postTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postDesc}>{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { BlogPost } from '@/lib/blog/posts';
import styles from './BlogPostPage.module.css';

interface Props {
  post: BlogPost;
}

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
      } else {
        elements.push(
          <pre key={i} className={styles.codeBlock}>
            <code data-lang={codeLang}>{codeLines.join('\n')}</code>
          </pre>
        );
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className={styles.h2}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className={styles.h3}>{line.slice(4)}</h3>);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<p key={i} className={styles.listItem}>{line}</p>);
    } else if (line.startsWith('- ')) {
      elements.push(<p key={i} className={styles.listItem}>{line}</p>);
    } else if (line.trim() === '') {
      elements.push(<div key={i} className={styles.spacer} />);
    } else {
      // Inline code
      const parts = line.split(/`([^`]+)`/);
      const rendered = parts.map((part, j) =>
        j % 2 === 1 ? <code key={j} className={styles.inlineCode}>{part}</code> : part
      );
      elements.push(<p key={i} className={styles.paragraph}>{rendered}</p>);
    }
  }

  return elements;
}

export default function BlogPostPage({ post }: Props) {
  return (
    <>
      <Navigation />
      <main className="main-container">
        <article className={styles.article}>
          <div className={styles.header}>
            <Link href="/blog" className={styles.backLink}>&larr; 블로그 목록</Link>
            <time className={styles.date}>{post.date}</time>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.description}>{post.description}</p>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            {renderMarkdown(post.content)}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

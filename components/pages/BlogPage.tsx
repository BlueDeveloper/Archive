'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-inner" style={{ textAlign: 'center' }}>
            <div className="blog-coming-soon">
              <span className="blog-coming-soon-icon">&#128221;</span>
              <h1 className="section-title">기술 블로그 준비 중입니다</h1>
              <p className="section-description">
                풀스택 개발, 인프라 구축, 배포 자동화 등<br />
                실무에서 얻은 경험과 노하우를 공유할 예정입니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">Full-Stack Developer</p>
          <h3 className="hero-title">
            프론트부터 Spring Boot,<br />
            서버 인프라까지 직접 구축합니다.
          </h3>
          <p className="hero-subtitle">
            운영 가능한 시스템을 설계하고 구현하는 개발자입니다.
          </p>
          <div className="hero-cta">
            <Link href="/contact" className="cta-button primary">
              프로젝트 문의
            </Link>
            <Link
              href="/platform-case"
              className="cta-button secondary"
            >
              작업 사례 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

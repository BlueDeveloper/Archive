'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';

const tiers = [
  {
    name: 'Basic',
    range: '10 ~ 50만원',
    accent: 'tier-basic',
    items: [
      '랜딩페이지 / 회사 소개 사이트 제작',
      '카페24 · 고도몰 유지보수',
      '기존 사이트 기능 추가',
      'UI 개선 및 반응형 대응',
    ],
    tech: ['HTML / CSS / JavaScript', 'Next.js', 'Cafe24 / 고도몰'],
  },
  {
    name: 'Standard',
    range: '50 ~ 150만원',
    accent: 'tier-standard',
    items: [
      '기업 홈페이지 구축',
      '예약 · 문의 시스템 구현',
      '관리자 페이지 기본 구성',
      '서버 배포 및 도메인 연결 포함',
    ],
    tech: ['Next.js', 'Node.js / Spring Boot', 'MySQL', 'Nginx', 'Oracle Cloud'],
  },
  {
    name: 'Advanced',
    range: '150 ~ 300만원',
    accent: 'tier-advanced',
    highlight: true,
    items: [
      '판매 플랫폼 전체 구축',
      '결제 시스템 연동',
      '상품 · 주문 관리 시스템 구현',
      '관리자 페이지 구축',
      '서버 인프라 구성 및 운영',
      '자동 배포 파이프라인 구축',
      '유지보수 계약 가능',
    ],
    tech: ['Next.js', 'Spring Boot', 'MySQL', 'Jenkins CI/CD', 'Nginx', 'Oracle Cloud Infrastructure'],
  },
];

export default function ServicesPage() {
  const [openTech, setOpenTech] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">Services</p>
            <h1 className="page-hero-title">서비스 안내</h1>
            <p className="page-hero-desc">
              프로젝트 규모와 목적에 맞게 범위를 구성합니다.<br />
              단가는 요구사항에 따라 유연하게 협의 가능합니다.
            </p>
          </div>
        </section>

        <section className="section tier-section">
          <div className="section-inner">
            <div className="tier-grid">
              {tiers.map((tier) => (
                <div key={tier.name} className={`tier-card ${tier.highlight ? 'tier-card--highlight' : ''}`}>
                  <div className={`tier-header ${tier.accent}`}>
                    <span className="tier-name">{tier.name}</span>
                    <span className="tier-range">{tier.range}</span>
                    {tier.highlight && <span className="tier-badge">플랫폼 구축</span>}
                  </div>
                  <ul className="tier-list">
                    {tier.items.map((item) => (
                      <li key={item} className="tier-item">
                        <span className="tier-check">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* 기술 상세 토글 */}
                  <div className="tech-toggle-wrap">
                    <button
                      className="tech-toggle-btn"
                      onClick={() => setOpenTech(openTech === tier.name ? null : tier.name)}
                    >
                      {openTech === tier.name ? '기술 상세 닫기 ▲' : '기술 상세 보기 ▼'}
                    </button>
                    {openTech === tier.name && (
                      <div className="tech-toggle-content">
                        <div className="archive-tags">
                          {tier.tech.map((t) => (
                            <span key={t} className="archive-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href="/contact" className="tier-cta">문의하기</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">범위와 단가 모두 부담 없이 상담 가능합니다</p>
            <Link href="/contact" className="cta-button primary">무료 견적 문의</Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';

const TABS = [
  { id: 'photocard', label: '포토카드 플랫폼' },
  { id: 'utils', label: '웹 유틸리티' },
  { id: 'corporate', label: '회사 소개 사이트' },
  { id: 'cafe24', label: '카페24 유지보수' },
  { id: 'compass', label: 'GPS 나침반' },
];

/* ── 포토카드 플랫폼 데이터 ── */
const photocardFeatures = [
  {
    category: '상품 관리',
    items: ['상품 등록 · 수정 · 삭제', '이미지 업로드 및 관리', '카테고리 분류'],
  },
  {
    category: '주문 관리',
    items: ['주문 내역 조회 및 상태 변경', '배송 처리 흐름 구현', '고객별 주문 이력'],
  },
  {
    category: '결제 시스템',
    items: ['결제 모듈 연동', '결제 완료 후 주문 처리', '환불 처리 흐름'],
  },
  {
    category: '관리자 페이지',
    items: ['상품 · 주문 통합 관리 화면', '관리자 계정 분리', '매출 현황 확인'],
  },
];

const photocardOps = [
  {
    title: '프론트 · 백엔드 분리 운영',
    body: 'Next.js 프론트엔드와 Spring Boot API 서버를 독립적으로 운영해 유지보수성을 확보했습니다.',
  },
  {
    title: '실 서버 직접 운영',
    body: 'Oracle Cloud 인스턴스에서 Nginx 설정, 도메인 연결, SSL 인증서 관리를 직접 수행했습니다.',
  },
  {
    title: '자동 배포 파이프라인',
    body: 'Jenkins를 통해 코드 push 시 자동으로 빌드·배포되는 CI/CD 파이프라인을 구축했습니다.',
  },
];

const photocardTech = [
  { label: 'Frontend', value: 'Next.js (React)' },
  { label: 'Backend', value: 'Spring Boot (REST API)' },
  { label: 'Database', value: 'MySQL' },
  { label: 'Infra', value: 'Oracle Cloud Infrastructure' },
  { label: 'Server', value: 'Nginx (Reverse Proxy + SSL)' },
  { label: 'CI/CD', value: 'Jenkins' },
];

/* ── 다른 프로젝트 데이터 ── */
const otherProjects: Record<string, {
  tier: string;
  stack: string[];
  desc: string;
  features: string[];
  deploy: string;
  url: string;
  urlLabel: string;
}> = {
  utils: {
    tier: 'Basic ~ Standard',
    stack: ['Next.js', 'React', 'TypeScript'],
    desc: '사무 업무 효율화를 위한 브라우저 기반 유틸리티 서비스. 모든 처리는 서버 없이 클라이언트에서 안전하게 수행됩니다.',
    features: [
      'PDF 병합 / 분할',
      'CSV ↔ JSON 변환',
      'D-Day · 날짜 계산',
      'SQL → CSV 변환',
      '이미지 형식 변환',
      '파일 일괄 이름 변경',
    ],
    deploy: 'Cloudflare Pages',
    url: 'https://archive-utils.pages.dev',
    urlLabel: '유틸리티 사이트 바로가기',
  },
  corporate: {
    tier: 'Basic ~ Standard',
    stack: ['Next.js', 'TypeScript', 'CSS Modules'],
    desc: '인테리어 회사 홈페이지 템플릿. 이미지 캐러셀, 서비스 소개, 문의 폼, 반응형 레이아웃이 포함된 기업 사이트입니다.',
    features: [
      '이미지 캐러셀 (Hero)',
      '서비스 상세 페이지',
      '회사 소개 · 팀 구성',
      '문의 폼',
      '모바일 반응형',
      'Oracle Cloud 서버 배포',
    ],
    deploy: 'Cloudflare Pages',
    url: 'https://archive-corporate.pages.dev',
    urlLabel: '회사 소개 사이트 바로가기',
  },
  cafe24: {
    tier: 'Basic',
    stack: ['HTML', 'CSS', 'JavaScript', 'Cafe24'],
    desc: '기존 운영 중인 카페24 쇼핑몰의 유지보수 및 기능 추가 작업. 기존 구조를 유지하면서 필요한 부분만 정확하게 개선했습니다.',
    features: [
      '기존 레이아웃 유지',
      'UI 개선 및 리터치',
      '커스텀 기능 추가',
      '모바일 반응형 개선',
    ],
    deploy: 'Cafe24 호스팅',
    url: 'https://serasroom.com',
    urlLabel: '세라스룸 쇼핑몰 바로가기',
  },
  compass: {
    tier: 'Standard',
    stack: ['Next.js', 'TypeScript', 'Geolocation API', 'DeviceOrientation API', 'Web Audio API'],
    desc: '좌표를 입력하면 실시간 GPS와 기기 방향 센서로 목적지를 안내하는 브라우저 기반 나침반. 레트로 터미널 UI와 오디오 피드백이 적용된 MVP 프로토타입입니다.',
    features: [
      'GPS 실시간 위치 추적',
      '기기 방향 센서 연동',
      '목적지 방향 · 거리 실시간 계산',
      '도착 판정 (50m 이내)',
      '브라운 노이즈 오디오 피드백',
      'SVG 나침반 · 수평계 UI',
    ],
    deploy: 'Cloudflare Pages',
    url: 'https://mpanavigation.com',
    urlLabel: 'GPS 나침반 바로가기',
  },
};

export default function PlatformCasePage() {
  const [activeTab, setActiveTab] = useState('photocard');

  const project = activeTab !== 'photocard' ? otherProjects[activeTab] : null;

  return (
    <>
      <Navigation />
      <main className="main-container">

        {/* Page Hero */}
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">Platform Case</p>
            <h1 className="page-hero-title">작업 사례</h1>
            <p className="page-hero-desc">
              직접 설계하고 운영까지 참여한 프로젝트 사례입니다.<br />
              탭을 선택해 각 프로젝트의 상세 내용을 확인하세요.
            </p>
          </div>
        </section>

        {/* Tab Bar */}
        <div className="case-tab-bar">
          <div className="section-inner case-tab-inner">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`case-tab-btn ${activeTab === tab.id ? 'case-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="case-tab-content section">
          <div className="section-inner">

            {/* 포토카드 판매 플랫폼 */}
            {activeTab === 'photocard' && (
              <div className="case-tab-panel">
                <div className="case-project-header">
                  <div>
                    <span className="case-project-tier">Advanced · 150 ~ 300만원</span>
                    <h2 className="case-project-title">포토카드 판매 플랫폼</h2>
                    <p className="case-project-desc">
                      단순 UI 작업이 아닌 비즈니스 로직 중심의 백엔드 개발.<br />
                      상품 관리부터 결제·주문·서버 운영까지 전체 플로우를 직접 설계·구현했습니다.
                    </p>
                  </div>
                  <a
                    href="https://maidjo-test.duckdns.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-link"
                  >
                    운영 사이트 바로가기 →
                  </a>
                </div>

                <div className="case-sub-title">구현 기능</div>
                <div className="case-features-grid">
                  {photocardFeatures.map((f) => (
                    <div key={f.category} className="case-feature-card">
                      <h3 className="case-feature-title">{f.category}</h3>
                      <ul className="tier-list">
                        {f.items.map((item) => (
                          <li key={item} className="tier-item">
                            <span className="tier-check">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="case-sub-title" style={{ marginTop: '3rem' }}>운영 구조</div>
                <div className="case-ops-grid">
                  {photocardOps.map((item) => (
                    <div key={item.title} className="case-ops-item">
                      <span className="case-ops-icon">◈</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="case-sub-title" style={{ marginTop: '3rem' }}>사용 기술</div>
                <p className="case-tab-note">기술적 검증이 필요한 경우 참고해주세요</p>
                <div className="case-tech-grid">
                  {photocardTech.map((t) => (
                    <div key={t.label} className="case-tech-item">
                      <span className="case-tech-label">{t.label}</span>
                      <span className="case-tech-value">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 다른 프로젝트 탭 */}
            {project && (
              <div className="case-tab-panel">
                <div className="case-project-header">
                  <div>
                    <span className="case-project-tier">{project.tier}</span>
                    <p className="case-project-desc">{project.desc}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-link"
                  >
                    {project.urlLabel} →
                  </a>
                </div>

                <div className="case-project-body">
                  <div className="case-project-col">
                    <div className="case-sub-title">주요 기능</div>
                    <ul className="tier-list case-project-list">
                      {project.features.map((f) => (
                        <li key={f} className="tier-item">
                          <span className="tier-check">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="case-project-col">
                    <div className="case-sub-title">기술 스택</div>
                    <div className="archive-tags" style={{ marginTop: '0.75rem' }}>
                      {project.stack.map((t) => (
                        <span key={t} className="archive-tag">{t}</span>
                      ))}
                    </div>
                    <div className="case-sub-title" style={{ marginTop: '2rem' }}>배포 방식</div>
                    <p className="case-ops-item" style={{ marginTop: '0.75rem', padding: 0, border: 'none', background: 'none' }}>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>{project.deploy}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">유사한 프로젝트가 필요하신가요?</p>
            <Link href="/contact" className="cta-button primary">문의하기</Link>
          </div>
        </div>

      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}

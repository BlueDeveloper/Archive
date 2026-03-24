'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function PlatformCasePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('photocard');

  const project = activeTab !== 'photocard' ? t.platformCase.otherProjects[activeTab as keyof typeof t.platformCase.otherProjects] : null;

  return (
    <>
      <Navigation />
      <main className="main-container">

        {/* Page Hero */}
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">{t.platformCase.pageLabel}</p>
            <h1 className="page-hero-title">{t.platformCase.title}</h1>
            <p className="page-hero-desc">
              {t.platformCase.desc.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t.platformCase.desc.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Tab Bar */}
        <div className="case-tab-bar">
          <div className="section-inner case-tab-inner">
            {t.platformCase.tabs.map((tab) => (
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
                    <span className="case-project-tier">{t.platformCase.photocard.tier}</span>
                    <h2 className="case-project-title">{t.platformCase.photocard.title}</h2>
                    <p className="case-project-desc">
                      {t.platformCase.photocard.desc.split('\n').map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx < t.platformCase.photocard.desc.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                  <a
                    href="https://maidjo-test.duckdns.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-link"
                  >
                    {t.platformCase.photocard.urlLabel}
                  </a>
                </div>

                <div className="case-sub-title">{t.platformCase.mainFeatures}</div>
                <div className="case-features-grid">
                  {t.platformCase.photocard.features.map((f) => (
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

                <div className="case-sub-title" style={{ marginTop: '3rem' }}>{t.platformCase.photocard.opsTitle}</div>
                <div className="case-ops-grid">
                  {t.platformCase.photocard.ops.map((item) => (
                    <div key={item.title} className="case-ops-item">
                      <span className="case-ops-icon">◈</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="case-sub-title" style={{ marginTop: '3rem' }}>{t.platformCase.photocard.techTitle}</div>
                <p className="case-tab-note">{t.platformCase.photocard.techNote}</p>
                <div className="case-tech-grid">
                  {t.platformCase.photocard.tech.map((tech) => (
                    <div key={tech.label} className="case-tech-item">
                      <span className="case-tech-label">{tech.label}</span>
                      <span className="case-tech-value">{tech.value}</span>
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
                    href={(activeTab === 'utils' ? 'https://archive-utils.pages.dev' : activeTab === 'corporate' ? 'https://corporate-egh.pages.dev' : activeTab === 'cafe24' ? 'https://serasroom.com' : activeTab === 'compass' ? 'https://mpanavigation.com' : 'https://worldcup-9oe.pages.dev')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-link"
                  >
                    {project.urlLabel} →
                  </a>
                </div>

                <div className="case-project-body">
                  <div className="case-project-col">
                    <div className="case-sub-title">{t.platformCase.mainFeatures2}</div>
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
                    <div className="case-sub-title">{t.platformCase.mainTech}</div>
                    <div className="archive-tags" style={{ marginTop: '0.75rem' }}>
                      {project.stack.map((tech) => (
                        <span key={tech} className="archive-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="case-sub-title" style={{ marginTop: '2rem' }}>{t.platformCase.mainDeploy}</div>
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
            <p className="mid-cta-text">{t.platformCase.midCta}</p>
            <Link href="/contact" className="cta-button primary">{t.platformCase.midCtaBtn}</Link>
          </div>
        </div>

      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}
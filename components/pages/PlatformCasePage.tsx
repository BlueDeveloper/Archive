'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function PlatformCasePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('foodtruck');
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    t.platformCase.tierGroups.forEach((group) => {
      initial[group.tier] = true;
    });
    return initial;
  });

  const project = activeTab !== 'foodtruck' ? t.platformCase.otherProjects[activeTab as keyof typeof t.platformCase.otherProjects] : null;

  interface CafeLink { label: string; url: string }
  type ProjectUrl = string | CafeLink[] | null;

  const projectUrls: Record<string, ProjectUrl> = {
    utils: 'https://archive-utils.pages.dev',
    corporate: 'https://corporate-egh.pages.dev',
    cafe24: [
      { label: '세라스룸', url: 'https://serasroom.com' },
      { label: '밸런도그', url: 'https://mongyroom.cafe24.com' },
      { label: 'LATIO', url: 'https://www.latio.kr' },
    ],
    compass: 'https://mpanavigation.com',
    telequote: 'https://hlmobile.pages.dev',
    mockup: null,
    saveridge: null,
    dreamway: 'https://dreamway.bdarchive.site',
  };

  const toggleTier = (tier: string) => {
    setExpandedTiers((prev) => ({ ...prev, [tier]: !prev[tier] }));
  };

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

        {/* Sidebar + Detail Layout */}
        <div className="case-layout section">
          <div className="section-inner case-layout-inner">

            {/* Left Sidebar */}
            <aside className="case-sidebar">
              {t.platformCase.tierGroups.map((group) => (
                <div key={group.tier} className="case-sidebar-group">
                  <button
                    className="case-sidebar-tier"
                    onClick={() => toggleTier(group.tier)}
                  >
                    <span className="case-sidebar-tier-label">
                      {group.tier}
                      <span className="case-sidebar-tier-range">{group.range}</span>
                    </span>
                    <span className={`case-sidebar-arrow ${expandedTiers[group.tier] ? 'open' : ''}`}>▾</span>
                  </button>
                  {expandedTiers[group.tier] && (
                    <ul className="case-sidebar-items">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <button
                            className={`case-sidebar-item ${activeTab === item.id ? 'case-sidebar-item--active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </aside>

            {/* Right Detail */}
            <div className="case-detail">

              {/* 푸드트럭 플랫폼 (Featured) */}
              {activeTab === 'foodtruck' && (
                <div className="case-tab-panel">
                  <div className="case-project-header">
                    <div>
                      <span className="case-project-tier">{t.platformCase.foodtruck.tier}</span>
                      <h2 className="case-project-title">{t.platformCase.foodtruck.title}</h2>
                      <p className="case-project-desc">
                        {t.platformCase.foodtruck.desc.split('\n').map((line, idx) => (
                          <span key={idx}>
                            {line}
                            {idx < t.platformCase.foodtruck.desc.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                    <a
                      href="https://raonfoodtruck.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="featured-link"
                    >
                      {t.platformCase.foodtruck.urlLabel}
                    </a>
                  </div>

                  <div className="case-sub-title">{t.platformCase.mainFeatures}</div>
                  <div className="case-features-grid">
                    {t.platformCase.foodtruck.features.map((f) => (
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

                  <div className="case-sub-title" style={{ marginTop: '3rem' }}>{t.platformCase.foodtruck.opsTitle}</div>
                  <div className="case-ops-grid">
                    {t.platformCase.foodtruck.ops.map((item) => (
                      <div key={item.title} className="case-ops-item">
                        <span className="case-ops-icon">◈</span>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="case-sub-title" style={{ marginTop: '3rem' }}>{t.platformCase.foodtruck.techTitle}</div>
                  <p className="case-tab-note">{t.platformCase.foodtruck.techNote}</p>
                  <div className="case-tech-grid">
                    {t.platformCase.foodtruck.tech.map((tech) => (
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
                      <h2 className="case-project-title">
                        {t.platformCase.tabs.find((tab) => tab.id === activeTab)?.label}
                      </h2>
                      <p className="case-project-desc">{project.desc}</p>
                    </div>
                    {Array.isArray(projectUrls[activeTab]) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {(projectUrls[activeTab] as CafeLink[]).map((item) => (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="featured-link"
                          >
                            {item.label} →
                          </a>
                        ))}
                      </div>
                    ) : projectUrls[activeTab] ? (
                      <a
                        href={projectUrls[activeTab] as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="featured-link"
                      >
                        {project.urlLabel} →
                      </a>
                    ) : (
                      <span className="featured-link" style={{ opacity: 0.5, cursor: 'default' }}>
                        {project.urlLabel}
                      </span>
                    )}
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
                        <span style={{ fontSize: '0.9rem', color: 'var(--fg-muted)' }}>{project.deploy}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
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

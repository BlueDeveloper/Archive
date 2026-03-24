'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function ServicesPage() {
  const { t } = useTranslation();
  const [openTech, setOpenTech] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">{t.services.pageLabel}</p>
            <h1 className="page-hero-title">{t.services.title}</h1>
            <p className="page-hero-desc">
              {t.services.desc.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < t.services.desc.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </section>

        <section className="section tier-section">
          <div className="section-inner">
            <div className="tier-grid">
              {t.services.tiers.map((tier) => (
                <div key={tier.name} className={`tier-card ${tier.name === 'Advanced' ? 'tier-card--highlight' : ''}`}>
                  <div className={`tier-header ${tier.name.toLowerCase() === 'basic' ? 'tier-basic' : tier.name.toLowerCase() === 'standard' ? 'tier-standard' : 'tier-advanced'}`}>
                    <span className="tier-name">{tier.name}</span>
                    <span className="tier-range">{tier.range}</span>
                    {tier.name === 'Advanced' && <span className="tier-badge">{t.services.badge}</span>}
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
                      {openTech === tier.name ? t.services.techClose : t.services.techOpen}
                    </button>
                    {openTech === tier.name && (
                      <div className="tech-toggle-content">
                        <div className="archive-tags">
                          {/* 실제 기술 스택은 번역 파일의 data에서 가져오야 함 */}
                          {tier.name === 'Basic' && ['HTML / CSS / JavaScript', 'Next.js', 'Cafe24 / 고도몰'].map((t) => (
                            <span key={t} className="archive-tag">{t}</span>
                          ))}
                          {tier.name === 'Standard' && ['Next.js', 'Node.js / Spring Boot', 'MySQL', 'Nginx', 'Oracle Cloud'].map((t) => (
                            <span key={t} className="archive-tag">{t}</span>
                          ))}
                          {tier.name === 'Advanced' && ['Next.js', 'Spring Boot', 'MySQL', 'Jenkins CI/CD', 'Nginx', 'Oracle Cloud Infrastructure'].map((t) => (
                            <span key={t} className="archive-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href="/contact" className="tier-cta">{t.services.cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">{t.services.midCta}</p>
            <Link href="/contact" className="cta-button primary">{t.services.midCtaBtn}</Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}
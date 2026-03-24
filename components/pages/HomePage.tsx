'use client';

import Link from 'next/link';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />

      <main className="main-container">
        {/* Hero */}
        <Hero />

        {/* 서비스 요약 */}
        <section className="section home-services-section">
          <div className="section-inner">
            <div className="section-header">
              <h2 className="section-title">{t.home.serviceTitle}</h2>
              <p className="section-description">{t.home.serviceDesc}</p>
            </div>
            <div className="home-tier-grid">
              {t.home.tiers.map((tier) => (
                <div key={tier.name} className="home-tier-card">
                  <div className={`tier-header ${tier.name.toLowerCase() === 'basic' ? 'tier-basic' : tier.name.toLowerCase() === 'standard' ? 'tier-standard' : 'tier-advanced'}`}>
                    <span className="tier-name">{tier.name}</span>
                    <span className="tier-range">{tier.range}</span>
                  </div>
                  <p className="home-tier-summary">{tier.summary}</p>
                </div>
              ))}
            </div>
            <div className="home-services-more">
              <Link href="/services" className="link-more">
                {t.home.serviceMore}
              </Link>
            </div>
          </div>
        </section>

        {/* 대표 사례 1줄 강조 */}
        <section className="section home-case-section">
          <div className="section-inner home-case-inner">
            <p className="home-case-label">{t.home.caseLabel}</p>
            <h2 className="home-case-title">
              {t.home.caseTitle.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t.home.caseTitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="home-case-desc">
              {t.home.caseDesc}
            </p>
            <Link href="/platform-case" className="link-more">
              {t.home.caseMore}
            </Link>
          </div>
        </section>

        {/* Mid CTA */}
        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">{t.home.midCta}</p>
            <Link href="/contact" className="cta-button primary">
              {t.home.midCtaBtn}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileFixedCTA />
    </>
  );
}
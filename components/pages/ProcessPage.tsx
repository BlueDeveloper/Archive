'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function ProcessPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">{t.process.pageLabel}</p>
            <h1 className="page-hero-title">{t.process.title}</h1>
            <p className="page-hero-desc">
              {t.process.desc.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t.process.desc.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="section process-section">
          <div className="section-inner">
            <div className="process-timeline">
              {t.process.steps.map((s, i) => (
                <div key={s.step} className="process-step">
                  <div className="process-step-indicator">
                    <span className="process-step-num">{s.step}</span>
                    {i < t.process.steps.length - 1 && <div className="process-step-line" />}
                  </div>
                  <div className="process-step-content">
                    <h3 className="process-step-title">{s.title}</h3>
                    <p className="process-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">{t.process.midCta}</p>
            <Link href="/contact" className="cta-button primary">{t.process.midCtaBtn}</Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}
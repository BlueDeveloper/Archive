'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-brand-visual" aria-hidden="true">
        <Image
          src="/logo.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 92vw, 760px"
          className="hero-brand-image"
          unoptimized
        />
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">{t.hero.badge}</p>
          <h3 className="hero-title">
            {t.hero.title.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < t.hero.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-cta">
            <Link href="/contact" className="cta-button primary">
              {t.hero.cta1}
            </Link>
            <Link
              href="/platform-case"
              className="cta-button secondary"
            >
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Platform Case', href: '/platform-case' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useTranslation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="BD Logo"
            width={50}
            height={50}
            priority
            className="logo-image"
            unoptimized
          />
        </Link>

        <div className="nav-right">
          <div className="nav-language-toggle">
            <button
              onClick={() => setLanguage('ko')}
              className={`lang-btn ${language === 'ko' ? 'lang-btn--active' : ''}`}
              aria-label="한국어"
            >
              KO
            </button>
            <span className="lang-separator">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`lang-btn ${language === 'en' ? 'lang-btn--active' : ''}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={t.nav.menuLabel}
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="nav-item">
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'nav-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

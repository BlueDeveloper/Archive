'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_META } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

const NAV_KEYS = [
  { key: 'home' as const, href: '/' },
  { key: 'services' as const, href: '/services' },
  { key: 'case' as const, href: '/platform-case' },
  { key: 'process' as const, href: '/process' },
  { key: 'contact' as const, href: '/contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useTranslation();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const current = LANGUAGE_META[language];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <object
            type="image/svg+xml"
            data="/brp_logo_animated.svg"
            aria-label="BRP Logo"
            style={{ width: 132, height: 53, pointerEvents: 'none' }}
            className="logo-image"
          />
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {NAV_KEYS.map((link) => (
            <li key={link.href} className="nav-item">
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'nav-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="lang-dropdown" ref={langRef}>
            <button
              className="lang-dropdown__trigger"
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-label="Select language"
            >
              <span className="lang-dropdown__flag">{current.flag}</span>
              <span className="lang-dropdown__label">{current.label}</span>
              <span className={`lang-dropdown__arrow ${isLangOpen ? 'open' : ''}`}>▾</span>
            </button>
            {isLangOpen && (
              <ul className="lang-dropdown__menu">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <li key={lang}>
                    <button
                      className={`lang-dropdown__item ${lang === language ? 'active' : ''}`}
                      onClick={() => handleLangSelect(lang)}
                    >
                      <span className="lang-dropdown__item-flag">{LANGUAGE_META[lang].flag}</span>
                      <span className="lang-dropdown__item-label">{LANGUAGE_META[lang].label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={t.nav.menuLabel}
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}

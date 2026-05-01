'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo-container">
              <div className="footer-logo">
                <object
                  type="image/svg+xml"
                  data="/brp_logo_animated.svg"
                  aria-label="BRP Logo"
                  style={{ width: 132, height: 53, pointerEvents: 'none' }}
                  className="footer-logo-image"
                />
              </div>
              <p className="footer-text">
                {t.footer.desc}
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t.footer.pageTitle}</h4>
            <ul className="footer-links">
              <li><Link href="/services">{t.nav.services}</Link></li>
              <li><Link href="/platform-case">{t.nav.case}</Link></li>
              <li><Link href="/process">{t.nav.process}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t.footer.linkTitle}</h4>
            <ul className="footer-links">
              <li><a href="https://raonfoodtruck.co.kr" target="_blank" rel="noopener noreferrer">푸드트럭 플랫폼</a></li>
              <li><a href="https://mpanavigation.com" target="_blank" rel="noopener noreferrer">GPS 나침반</a></li>
              <li><a href="https://hlmobile.pages.dev" target="_blank" rel="noopener noreferrer">통신사 견적서</a></li>
              <li><a href="https://archive-utils.pages.dev" target="_blank" rel="noopener noreferrer">웹 유틸리티</a></li>
              <li><a href="https://corporate-egh.pages.dev" target="_blank" rel="noopener noreferrer">회사 소개 사이트</a></li>
              <li><a href="https://dreamway.bdarchive.site" target="_blank" rel="noopener noreferrer">꿈지럭 (모바일 앱)</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

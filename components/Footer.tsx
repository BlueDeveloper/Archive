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
                <Image
                  src="/logo.png"
                  alt="Blue Dashboard Logo"
                  width={40}
                  height={40}
                  unoptimized
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
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/platform-case">Platform Case</Link></li>
              <li><Link href="/process">Process</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t.footer.linkTitle}</h4>
            <ul className="footer-links">
              <li><Link href="/contact">{t.footer.contact}</Link></li>
              <li><a href="https://maidjo-test.duckdns.org" target="_blank" rel="noopener noreferrer">{t.footer.photocard}</a></li>
              <li><a href="https://archive-utils.pages.dev" target="_blank" rel="noopener noreferrer">{t.footer.utils}</a></li>
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

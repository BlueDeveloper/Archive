'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
                프론트엔드부터 인프라까지 직접 구축합니다.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">페이지</h4>
            <ul className="footer-links">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/platform-case">Platform Case</Link></li>
              <li><Link href="/process">Process</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">바로가기</h4>
            <ul className="footer-links">
              <li><Link href="/contact">문의하기</Link></li>
              <li><a href="/maidShop" target="_blank" rel="noopener noreferrer">포토카드 플랫폼</a></li>
              <li><a href="/utils" target="_blank" rel="noopener noreferrer">웹 유틸리티</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} BD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

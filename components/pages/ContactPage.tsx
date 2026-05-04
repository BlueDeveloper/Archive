'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import ContactForm from '@/components/ContactForm';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">{t.contact.pageLabel}</p>
            <h1 className="page-hero-title">{t.contact.title}</h1>
            <p className="page-hero-desc">
              {t.contact.desc.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < t.contact.desc.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="section contact-section">
          <div className="section-inner contact-inner">
            <ContactForm />
            <div className="kakao-cta-wrap">
              <p className="kakao-cta-label">
                {'kakaoLabel' in t.contact ? (t.contact as Record<string, string>).kakaoLabel : '카카오톡으로 빠르게 상담받으세요'}
              </p>
              <div className="kakao-cta-buttons">
                <a
                  href="https://pf.kakao.com/_xbzxoTX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kakao-cta-btn kakao-cta-chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="22" height="22" fill="none">
                    <rect width="256" height="256" rx="60" fill="#3C1E1E" />
                    <path d="M128 60c-44.183 0-80 29.668-80 66.264 0 23.546 15.672 44.21 39.244 55.855l-8.042 29.184c-.608 2.206 1.932 3.99 3.874 2.718l34.07-22.298c3.558.476 7.18.726 10.854.726 44.183 0 80-29.668 80-66.185C208 89.668 172.183 60 128 60Z" fill="#FEE500" />
                  </svg>
                  {'kakaoChat' in t.contact ? (t.contact as Record<string, string>).kakaoChat : '1:1 Chat'}
                </a>
                <a
                  href="https://pf.kakao.com/_xbzxoTX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kakao-cta-btn kakao-cta-add"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="22" height="22" fill="none">
                    <rect width="256" height="256" rx="60" fill="#FEE500" />
                    <path d="M128 60c-44.183 0-80 29.668-80 66.264 0 23.546 15.672 44.21 39.244 55.855l-8.042 29.184c-.608 2.206 1.932 3.99 3.874 2.718l34.07-22.298c3.558.476 7.18.726 10.854.726 44.183 0 80-29.668 80-66.185C208 89.668 172.183 60 128 60Z" fill="#3C1E1E" />
                  </svg>
                  {'kakaoAdd' in t.contact ? (t.contact as Record<string, string>).kakaoAdd : 'Add Channel'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}
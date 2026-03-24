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
          </div>
        </section>
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}
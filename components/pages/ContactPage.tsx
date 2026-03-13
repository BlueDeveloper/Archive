import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">Contact</p>
            <h1 className="page-hero-title">프로젝트 문의</h1>
            <p className="page-hero-desc">
              요구사항을 간단히 정리해서 보내주시면 빠르게 검토 후 회신드립니다.<br />
              단가 협의 및 범위 확인은 부담 없이 문의해주세요.
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

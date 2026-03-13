import Link from 'next/link';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';

const tiers = [
  {
    name: 'Basic',
    range: '10 ~ 50만원',
    summary: '랜딩페이지, 회사 소개 사이트, 유지보수',
    accent: 'tier-basic',
  },
  {
    name: 'Standard',
    range: '50 ~ 150만원',
    summary: '기업 홈페이지, 예약·문의 시스템, 서버 배포',
    accent: 'tier-standard',
  },
  {
    name: 'Advanced',
    range: '150 ~ 300만원',
    summary: '판매 플랫폼, 결제·관리자 시스템, 인프라 구성',
    accent: 'tier-advanced',
  },
];

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main className="main-container">
        {/* Hero */}
        <Hero />

        {/* 서비스 요약 */}
        <section className="section home-services-section">
          <div className="section-inner">
            <div className="section-header">
              <h2 className="section-title">서비스</h2>
              <p className="section-description">규모에 맞는 개발 범위를 제안합니다</p>
            </div>
            <div className="home-tier-grid">
              {tiers.map((tier) => (
                <div key={tier.name} className="home-tier-card">
                  <div className={`tier-header ${tier.accent}`}>
                    <span className="tier-name">{tier.name}</span>
                    <span className="tier-range">{tier.range}</span>
                  </div>
                  <p className="home-tier-summary">{tier.summary}</p>
                </div>
              ))}
            </div>
            <div className="home-services-more">
              <Link href="/services" className="link-more">
                서비스 상세 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 대표 사례 1줄 강조 */}
        <section className="section home-case-section">
          <div className="section-inner home-case-inner">
            <p className="home-case-label">Platform Case</p>
            <h2 className="home-case-title">
              관리자와 결제가 포함된<br />
              판매 플랫폼 구축 경험이 있습니다
            </h2>
            <p className="home-case-desc">
              상품 관리부터 주문·결제·서버 운영까지 직접 설계하고 구현했습니다.
            </p>
            <Link href="/platform-case" className="link-more">
              구축 사례 보기 →
            </Link>
          </div>
        </section>

        {/* Mid CTA */}
        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">어떤 규모든 부담 없이 문의해주세요</p>
            <Link href="/contact" className="cta-button primary">
              프로젝트 문의
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileFixedCTA />
    </>
  );
}

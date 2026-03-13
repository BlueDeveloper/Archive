import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileFixedCTA from '@/components/MobileFixedCTA';

const steps = [
  {
    step: '01',
    title: '요구사항 분석',
    desc: '프로젝트 목적, 필요 기능, 예산 범위를 함께 정리합니다. 명확한 범위를 정의해 불필요한 추가 비용을 방지합니다.',
  },
  {
    step: '02',
    title: '설계',
    desc: 'DB 구조와 API 설계를 먼저 진행합니다. 화면 흐름과 데이터 구조를 확인한 후 개발에 착수합니다.',
  },
  {
    step: '03',
    title: '개발',
    desc: '프론트엔드와 백엔드를 병렬로 개발합니다. 주요 기능 완성 시마다 중간 확인을 진행합니다.',
  },
  {
    step: '04',
    title: '테스트',
    desc: '기능 동작 검증 및 모바일 반응형 확인을 수행합니다. 발견된 문제는 즉시 수정합니다.',
  },
  {
    step: '05',
    title: '배포',
    desc: '서버 환경 구성 후 도메인·SSL 설정을 완료합니다. Jenkins CI/CD가 필요한 경우 자동 배포 파이프라인도 구축합니다.',
  },
  {
    step: '06',
    title: '운영 및 유지보수',
    desc: '운영 중 발생하는 버그 수정과 기능 개선을 담당합니다. 유지보수 계약을 통해 지속적인 관리가 가능합니다.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main className="main-container">
        <section className="section page-hero-section">
          <div className="section-inner">
            <p className="page-hero-label">Process</p>
            <h1 className="page-hero-title">진행 프로세스</h1>
            <p className="page-hero-desc">
              요구사항 분석부터 운영·유지보수까지.<br />
              각 단계를 명확히 공유하며 진행합니다.
            </p>
          </div>
        </section>

        <section className="section process-section">
          <div className="section-inner">
            <div className="process-timeline">
              {steps.map((s, i) => (
                <div key={s.step} className="process-step">
                  <div className="process-step-indicator">
                    <span className="process-step-num">{s.step}</span>
                    {i < steps.length - 1 && <div className="process-step-line" />}
                  </div>
                  <div className="process-step-content">
                    <h3 className="process-step-title">{s.title}</h3>
                    <p className="process-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mid-cta">
          <div className="section-inner mid-cta-inner">
            <p className="mid-cta-text">이 프로세스로 프로젝트를 시작하고 싶으신가요?</p>
            <Link href="/contact" className="cta-button primary">문의하기</Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}

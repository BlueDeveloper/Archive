# CLAUDE.md — Archive 프로젝트 가이드

## 글로벌 인프라 참조 🌐

📖 **[글로벌 인프라 참조 가이드](C:\Users\bluee\.claude\INFRASTRUCTURE_GLOBAL_REFERENCE.md)**
  - 포트폴리오 사이트 인프라 (Next.js + Cloudflare Pages)
  - 커스텀 도메인 및 DNS 설정
  - SEO 및 Google Search Console 설정

---

# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 작업 규칙

작업이 완료되면 반드시 변경사항을 커밋하고 원격 저장소에 푸시한다.
푸시하면 Cloudflare Pages가 자동으로 빌드 및 배포한다.

## 배포

- **플랫폼**: Cloudflare Pages
- **레포**: BlueDeveloper/archive-portfolio
- **브랜치**: main
- **빌드 명령어**: `npm install --legacy-peer-deps && npm run build`
- **출력 디렉토리**: `out`
- **도메인**: bdarchive.site

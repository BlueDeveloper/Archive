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
- **빌드 명령어**: `npm install --legacy-peer-deps && npx @cloudflare/next-on-pages`
- **출력 디렉토리**: `.vercel/output/static`
- **도메인**: bdarchive.site

## 라우트 구조

- `/` ~ `/contact` : 포트폴리오 공개 페이지 (수정 금지)
- `/blog` : 기술 블로그 (정적 글 5편)
- `/blog/[slug]` : 블로그 개별 글
- `/dashboard/*` : 비공개 대시보드 (인증 필요, middleware.ts로 보호)
  - `/dashboard` : 정산현황 (메인)
  - `/dashboard/projects` : 프로젝트목록 + 등록
  - `/dashboard/insights` : 비즈니스 인사이트 (대형 KPI + 설명)
  - `/dashboard/schedule` : 일정 (마일스톤 추가/수정/삭제)
  - `/dashboard/work` : 작업시간 분석
  - `/dashboard/login` : 로그인

## Dashboard 관련 파일 위치

- `components/dashboard/` : Dashboard 전용 컴포넌트
- `lib/types.ts`, `lib/data.ts`, `lib/dashboard-utils.ts`, `lib/d1.ts` : Dashboard 전용 lib
- `db/` : Drizzle ORM 스키마 및 D1 연결
- `app/api/` : API 라우트 (auth, projects, expenses, settlements, timelines, work-hours)

## 작업 로그 & 이슈

- `docs/work-log/` : 날짜별 작업 내역 및 미해결 이슈 기록
- 작업 시작 전 최신 로그를 확인하여 미해결 이슈를 파악한다

# archive-portfolio

포트폴리오 메인 사이트 — [bdarchive.site](https://bdarchive.site)

## 기술 스택

- Next.js 16 (App Router, Static Export)
- React 19
- TypeScript 5
- Pure CSS (CSS Variables)

## 로컬 개발

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ 디렉토리로 정적 빌드
```

## 배포

main 브랜치 push 시 Cloudflare Pages 자동 배포.

| 항목 | 값 |
|------|-----|
| 빌드 명령어 | npm install --legacy-peer-deps && npm run build |
| 출력 디렉토리 | out |
| 도메인 | bdarchive.site |

## 페이지 구조

- / → 홈 (메인 랜딩)
- /services/ → 서비스 소개
- /process/ → 프로세스
- /platform-case/ → 플랫폼 사례
- /contact/ → 연락처

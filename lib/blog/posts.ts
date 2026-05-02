export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "cloudflare-pages-nextjs-deploy",
    title: "Next.js 앱을 Cloudflare Pages에 배포하는 방법",
    description: "Edge Runtime 기반 Next.js 프로젝트를 Cloudflare Pages에 배포하면서 겪은 문제와 해결법을 정리합니다.",
    date: "2026-05-02",
    tags: ["Next.js", "Cloudflare", "배포"],
    content: `## 왜 Cloudflare Pages인가

Vercel은 편리하지만 무료 티어 제한이 빡빡합니다. Cloudflare Pages는 무제한 대역폭, 빠른 글로벌 CDN, 그리고 D1/R2/KV 같은 서버리스 스토리지와의 자연스러운 통합을 제공합니다.

## 핵심 설정

\`\`\`bash
npm install @cloudflare/next-on-pages
\`\`\`

\`next.config.ts\`에서 Edge Runtime을 기본으로 설정하고, 모든 서버 컴포넌트에 \`export const runtime = "edge"\`를 추가합니다.

## 빌드 명령어

\`\`\`bash
npx @cloudflare/next-on-pages
\`\`\`

출력 디렉토리는 \`.vercel/output/static\`입니다. Cloudflare Pages 프로젝트 설정에서 이 경로를 지정합니다.

## 자주 만나는 문제

### 1. Node.js API 사용 불가
Edge Runtime에서는 \`fs\`, \`path\` 등 Node.js 네이티브 모듈을 사용할 수 없습니다. 데이터는 D1, KV, 또는 정적 import로 처리합니다.

### 2. 빌드 시 환경변수
Cloudflare Pages 대시보드에서 환경변수를 설정하거나, \`wrangler.toml\`의 \`[vars]\`에 non-secret 값을 넣습니다.

### 3. middleware 제한
\`middleware.ts\`는 동작하지만, \`next/server\`의 일부 기능이 제한됩니다. 쿠키 기반 인증은 정상 동작합니다.

## 결론

초기 설정만 잘 잡으면 Cloudflare Pages는 Next.js 풀스택 앱을 무료로 운영할 수 있는 최고의 선택지입니다.`,
  },
  {
    slug: "oracle-cloud-free-tier-server",
    title: "OCI Free Tier로 운영 서버 구축하기",
    description: "Oracle Cloud의 평생 무료 ARM 인스턴스로 Spring Boot 서버를 구축하고 운영한 경험을 공유합니다.",
    date: "2026-04-28",
    tags: ["OCI", "Oracle Cloud", "인프라"],
    content: `## OCI Free Tier의 가치

Oracle Cloud Infrastructure는 ARM 기반 Ampere A1 인스턴스를 월 3,000 OCPU-시간, 18GB RAM까지 무료로 제공합니다. 이건 4 OCPU / 24GB RAM 인스턴스를 하나 만들 수 있다는 의미입니다.

## 서버 구성

- **OS**: Oracle Linux 8 (ARM)
- **Java**: OpenJDK 17 (aarch64)
- **WAS**: Spring Boot 내장 Tomcat
- **DB**: Oracle Autonomous Database (Always Free)
- **프록시**: Nginx (SSL 종료 + 리버스 프록시)

## 배포 파이프라인

Jenkins를 같은 인스턴스에 설치하고, GitHub Webhook으로 push 이벤트를 수신합니다.

\`\`\`
GitHub Push → Jenkins Build → JAR 교체 → systemd restart
\`\`\`

## 네트워크 설정 주의점

OCI는 기본적으로 모든 인바운드 포트를 차단합니다. Security List와 OS 방화벽(firewalld) 두 곳 모두 열어야 합니다.

\`\`\`bash
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
\`\`\`

## Wallet 기반 DB 접속

Oracle Autonomous DB는 Wallet(mTLS)으로만 접속합니다. Spring Boot의 \`application.yml\`:

\`\`\`yaml
spring:
  datasource:
    url: "jdbc:oracle:thin:@serviceName?TNS_ADMIN=/opt/wallet"
\`\`\`

## 결론

월 비용 0원으로 운영 가능한 풀스택 서버. 개인 프로젝트나 소규모 서비스에 최적입니다.`,
  },
  {
    slug: "d1-drizzle-edge-database",
    title: "Cloudflare D1 + Drizzle ORM으로 Edge 데이터베이스 구축",
    description: "서버리스 환경에서 SQL 데이터베이스를 사용하는 방법. D1과 Drizzle ORM 조합의 장점과 실전 팁.",
    date: "2026-04-20",
    tags: ["Cloudflare D1", "Drizzle", "서버리스"],
    content: `## D1이란?

Cloudflare D1은 SQLite 기반의 서버리스 데이터베이스입니다. Workers/Pages에서 직접 접근하며, 글로벌 읽기 복제를 지원합니다.

## Drizzle ORM 선택 이유

- TypeScript 퍼스트: 스키마 정의부터 쿼리까지 완전 타입 안전
- 경량: 번들 사이즈가 작아 Edge 환경에 적합
- D1 네이티브 지원

## 스키마 정의

\`\`\`typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  client: text("client").notNull(),
  status: text("status").default("진행중"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
\`\`\`

## API 라우트에서 사용

\`\`\`typescript
import { drizzle } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";

export function db() {
  const { env } = getRequestContext();
  return drizzle(env.DB);
}
\`\`\`

## 마이그레이션

\`\`\`bash
npx drizzle-kit generate:sqlite
npx wrangler d1 migrations apply DB_NAME
\`\`\`

## 주의사항

1. **쓰기 제한**: 무료 티어 하루 10만 행 쓰기 제한
2. **트랜잭션**: D1은 단일 쿼리 트랜잭션만 지원 (batch 사용)
3. **로컬 개발**: \`wrangler dev --local\`로 로컬 SQLite 사용 가능

## 결론

소규모 프로젝트에서 별도 DB 서버 없이 SQL을 쓸 수 있는 가장 실용적인 선택입니다.`,
  },
  {
    slug: "github-actions-automated-deploy",
    title: "GitHub Actions로 빌드부터 배포까지 자동화하기",
    description: "코드 푸시만 하면 빌드, 테스트, 배포가 자동으로 완료되는 CI/CD 파이프라인 구축 가이드.",
    date: "2026-04-15",
    tags: ["CI/CD", "GitHub Actions", "자동화"],
    content: `## CI/CD가 필요한 이유

1인 개발이라도 수동 배포는 실수를 만듭니다. "빌드 안 됨 → 롤백 → 다시 수정" 사이클을 경험하면 자동화의 가치를 체감합니다.

## 기본 워크플로우 구조

\`\`\`yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: \${{ secrets.CF_API_TOKEN }}
          command: pages deploy .vercel/output/static --project-name=my-project
\`\`\`

## 환경 분리

\`\`\`yaml
- name: Deploy Preview
  if: github.event_name == 'pull_request'
  run: wrangler pages deploy --branch=preview

- name: Deploy Production
  if: github.ref == 'refs/heads/main'
  run: wrangler pages deploy --branch=main
\`\`\`

## 캐싱 전략

- \`actions/cache\`로 node_modules 캐싱: 빌드 시간 60% 단축
- Gradle 프로젝트는 \`~/.gradle/caches\` 캐싱

## 모바일 앱 배포

React Native 앱의 경우 Android는 GitHub Actions에서, iOS는 Codemagic에서 처리합니다. Play Store 업로드는 \`r0adkll/upload-google-play\` 액션을 사용합니다.

## 시크릿 관리

API 토큰, 서명 키 등은 반드시 Repository Secrets에 저장합니다. 절대 코드에 하드코딩하지 마세요.

## 결론

한 번 설정하면 이후 모든 배포가 \`git push\` 한 줄로 끝납니다. 초기 투자 대비 효율이 가장 높은 개발 인프라입니다.`,
  },
  {
    slug: "react-native-android-build-guide",
    title: "React Native Android 빌드 & Play Store 배포 실전 가이드",
    description: "React Native 앱을 AAB로 빌드하고 Google Play Store에 배포하기까지의 전체 과정을 정리합니다.",
    date: "2026-04-10",
    tags: ["React Native", "Android", "모바일"],
    content: `## 빌드 환경 준비

- JDK 17 (React Native 0.73+ 권장)
- Android SDK 34
- Gradle 8.x
- \`local.properties\`에 SDK 경로 설정

## 서명 키 생성

\`\`\`bash
keytool -genkeypair -v -storetype PKCS12 \\
  -keystore release.keystore -alias my-key \\
  -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

\`android/gradle.properties\`에 서명 정보를 추가합니다. CI에서는 환경변수로 주입합니다.

## AAB 빌드

\`\`\`bash
cd android
./gradlew bundleRelease
\`\`\`

출력: \`app/build/outputs/bundle/release/app-release.aab\`

## 자주 만나는 빌드 에러

### 1. NDK 버전 불일치
\`build.gradle\`에 \`ndkVersion\`을 명시합니다:
\`\`\`groovy
android {
    ndkVersion = "26.1.10909125"
}
\`\`\`

### 2. Metro 번들러 충돌
여러 RN 프로젝트를 동시에 개발할 때 포트가 충돌합니다. \`package.json\`에서 포트를 고정하세요:
\`\`\`json
"scripts": {
  "start": "react-native start --port 8081"
}
\`\`\`

### 3. Proguard 난독화 문제
릴리즈 빌드에서 크래시가 나면 \`proguard-rules.pro\`에 keep 규칙을 추가합니다.

## Play Store 배포

1. Google Play Console에서 앱 등록
2. 내부 테스트 트랙에 AAB 업로드
3. 테스트 완료 후 프로덕션 트랙으로 승격
4. 스토어 등록정보 (스크린샷, 설명) 작성

## CI 자동화 (GitHub Actions)

\`\`\`yaml
- name: Build AAB
  run: cd android && ./gradlew bundleRelease

- name: Upload to Play Store
  uses: r0adkll/upload-google-play@v1
  with:
    serviceAccountJsonPlainText: \${{ secrets.PLAY_SERVICE_ACCOUNT }}
    packageName: com.example.app
    releaseFiles: android/app/build/outputs/bundle/release/app-release.aab
    track: internal
\`\`\`

## 결론

첫 빌드가 가장 어렵습니다. 환경 설정만 한 번 잡으면 이후 릴리즈는 자동화로 처리할 수 있습니다.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

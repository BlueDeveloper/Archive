# Archive 프로젝트 SEO 현황

## 개요
bdarchive.site 도메인의 검색 엔진 최적화(SEO) 설정 현황을 정리한 문서입니다.

---

## 도메인 정보

### 기본 정보
- **도메인명**: bdarchive.site
- **등록 대행사**: 가비아 (Gabia)
- **등록일**: 2026년 2월 15일
- **만료일**: 2027년 2월 15일 (1년 계약)
- **상태**: 활성 (Active)

### DNS 관리
- **DNS 제공**: Oracle Cloud Infrastructure (OCI)
- **네임서버**:
  - ns1.p201.dns.oraclecloud.net
  - ns2.p201.dns.oraclecloud.net
  - ns3.p201.dns.oraclecloud.net
  - ns4.p201.dns.oraclecloud.net

---

## DNS 레코드 설정

| 레코드 타입 | 호스트 | 값/내용 | TTL | 설명 |
|------------|--------|---------|-----|------|
| A | @ | 152.69.235.170 | 3600 | 메인 도메인 IP 주소 |
| NS | @ | ns1-4.p201.dns.oraclecloud.net | 86400 | 네임서버 설정 |
| TXT | @ | google-site-verification=... | 3600 | 구글 소유권 인증 |
| SOA | @ | ns1.p201.dns.oraclecloud.net | 300 | 영역 권한 레코드 |

---

## Google Search Console 설정

### 등록 현황
- **등록 상태**: ✅ 완료
- **인증 방법**: DNS TXT 레코드
- **인증 키**: `google-site-verification=5w6WZDiW3zw3rimhZKhroZRFVqq6KhHBXMCJiKHvU`
- **관리 URL**: https://search.google.com/search-console

### 활용 가능 기능
1. **검색 실적 모니터링**
   - 노출수, 클릭수, CTR, 평균 게재 순위 확인

2. **색인 생성 관리**
   - 사이트맵 제출
   - 개별 URL 색인 요청
   - 색인 생성 오류 확인

3. **개선사항 확인**
   - 모바일 사용성
   - 페이지 속도
   - 구조화된 데이터

---

## 사이트 구조

현재 사이트는 4개의 독립적인 워크스페이스로 구성:

| 워크스페이스 | URL 경로 | 설명 |
|------------|----------|------|
| dashboard | https://bdarchive.site/ | 메인 랜딩 페이지 |
| utils | https://bdarchive.site/utils/ | 개발자 유틸리티 모음 |
| corporate | https://bdarchive.site/corporate/ | 기업 소개 사이트 |
| compass | https://bdarchive.site/compass/ | GPS 나침반 앱 |

### SEO 고려사항
각 워크스페이스는 Next.js의 Static Export를 사용하여 정적 HTML 파일로 빌드됩니다:
- 모든 페이지가 사전 렌더링되어 검색 엔진이 크롤링 가능
- 각 경로는 독립적인 `index.html` 파일 보유
- 서브 경로(/utils/, /corporate/, /compass/)도 개별적으로 검색 노출 가능

---

## SEO 최적화 현황

### ✅ 완료된 작업
1. **도메인 설정**
   - 가비아에서 도메인 구매 완료
   - 오라클 클라우드 DNS 연동 완료

2. **Google Search Console 등록**
   - 도메인 소유권 인증 완료
   - TXT 레코드를 통한 DNS 인증

3. **정적 사이트 생성**
   - Next.js Static Export로 모든 페이지 사전 렌더링
   - SEO 친화적인 HTML 구조

### 📋 권장 추가 작업

#### 1. 사이트맵 제출
각 워크스페이스에 `sitemap.xml` 생성 후 Google Search Console에 제출:
```xml
<!-- dashboard/public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bdarchive.site/</loc>
    <lastmod>2026-02-21</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

#### 2. robots.txt 설정
```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://bdarchive.site/sitemap.xml
Sitemap: https://bdarchive.site/utils/sitemap.xml
Sitemap: https://bdarchive.site/corporate/sitemap.xml
Sitemap: https://bdarchive.site/compass/sitemap.xml
```

#### 3. 메타 태그 최적화
각 페이지의 `<head>` 섹션에 추가:
```tsx
// app/layout.tsx 또는 page.tsx
export const metadata: Metadata = {
  title: '페이지 제목 | bdarchive.site',
  description: '페이지 설명 (150-160자)',
  keywords: ['키워드1', '키워드2', '키워드3'],
  openGraph: {
    title: '페이지 제목',
    description: '페이지 설명',
    url: 'https://bdarchive.site/',
    siteName: 'Archive',
    images: [
      {
        url: 'https://bdarchive.site/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};
```

#### 4. 구조화된 데이터 (Schema.org)
JSON-LD 형식으로 구조화된 데이터 추가:
```tsx
// app/layout.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Archive",
      "url": "https://bdarchive.site",
      "description": "사이트 설명"
    })
  }}
/>
```

#### 5. 성능 최적화
- 이미지 최적화 (WebP 포맷 사용)
- CSS/JS 번들 크기 최소화
- Lighthouse 점수 개선

---

## 서브 경로 검색 노출

### 질문: /utils/, /corporate/, /compass/ 같은 서브 경로도 개별적으로 검색에 노출되나요?

**답변**: ✅ 네, 개별적으로 노출 가능합니다.

#### 이유:
1. **정적 HTML 생성**
   - 각 경로마다 독립적인 `index.html` 파일 존재
   - 검색 엔진이 크롤링 가능한 완전한 HTML

2. **Nginx 라우팅 설정**
   ```nginx
   location /utils/ {
       alias /opt/archive/utils/;
       try_files $uri $uri/ /utils/index.html;
   }
   ```
   - 각 경로가 독립적인 디렉토리로 매핑
   - 검색 엔진이 별도 페이지로 인식

3. **URL 구조**
   - https://bdarchive.site/ (메인)
   - https://bdarchive.site/utils/ (별도 페이지)
   - https://bdarchive.site/corporate/ (별도 페이지)
   - https://bdarchive.site/compass/ (별도 페이지)

#### 노출 향상 방법:
1. 각 워크스페이스마다 별도의 `sitemap.xml` 생성
2. Google Search Console에 개별 사이트맵 제출
3. 각 페이지에 고유한 메타 태그 설정
4. 내부 링크로 서로 연결 (크롤링 깊이 향상)

---

## 모니터링

### 정기 점검 항목
- [ ] Google Search Console 실적 확인 (주 1회)
- [ ] 색인 생성 오류 확인 (주 1회)
- [ ] 도메인 만료일 확인 (월 1회)
- [ ] DNS 레코드 정상 작동 확인 (월 1회)
- [ ] Lighthouse SEO 점수 확인 (배포 시)

### 유용한 도구
- **Google Search Console**: https://search.google.com/search-console
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **Google Lighthouse**: Chrome DevTools 내장
- **Schema.org Validator**: https://validator.schema.org/

---

## 참고 자료

### 관련 문서
- `.agent.md` - 프로젝트 전체 구조 및 도메인 설정
- `docs/seo/` - 설정 캡처본 모음

### 외부 링크
- [Google Search Console 가이드](https://developers.google.com/search/docs)
- [Next.js SEO 문서](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org](https://schema.org/)

---

**최종 업데이트**: 2026년 2월 21일
**작성자**: Archive 프로젝트 팀

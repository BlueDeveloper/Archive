import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import KakaoChat from "@/components/KakaoChat";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bdarchive.site"),
  title: {
    default: "BRP | 기획부터 운영까지 한 팀이 끝내는 풀스택 개발",
    template: "%s | BRP 개발 외주",
  },
  description: "10년 경력 풀스택 엔지니어. 웹사이트, 모바일 앱, 관리자 시스템, 결제 연동까지. 외주 프로젝트 15건+ 납품 완료. 10~300만원 범위.",
  keywords: [
    "외주 개발 업체", "앱 개발 외주", "웹사이트 제작", "프리랜서 개발자", "풀스택 외주",
    "외주 개발", "풀스택 개발자", "Next.js", "웹 개발", "쇼핑몰 개발", "서버 배포", "CI/CD", "풀스택 개발", "Oracle Cloud",
    "freelance developer", "web development", "full-stack developer", "Next.js developer", "e-commerce", "full-stack", "infrastructure"
  ],
  authors: [{ name: "BRP" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      ko: "https://bdarchive.site",
      en: "https://bdarchive.site",
    },
  },
  openGraph: {
    title: "BRP | 기획부터 운영까지 한 팀이 끝내는 풀스택 개발",
    description: "10년 경력 풀스택 엔지니어. 웹사이트, 모바일 앱, 관리자 시스템, 결제 연동까지. 외주 프로젝트 15건+ 납품 완료. 10~300만원 범위.",
    type: "website",
    locale: "ko_KR",
    url: "https://bdarchive.site",
    siteName: "BRP 개발 외주",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "BRP logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRP | 기획부터 운영까지 한 팀이 끝내는 풀스택 개발",
    description: "10년 경력 풀스택 엔지니어. 웹사이트, 모바일 앱, 관리자 시스템, 결제 연동까지. 외주 프로젝트 15건+ 납품 완료. 10~300만원 범위.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BRP (Blue Red Polarity)",
    "description": "10년 경력 풀스택 엔지니어. 웹사이트, 모바일 앱, 관리자 시스템, 결제 연동까지. 외주 프로젝트 15건+ 납품 완료. 10~300만원 범위.",
    "url": "https://bdarchive.site",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "경기도",
      "addressLocality": "화성시",
      "addressCountry": "KR"
    },
    "priceRange": "100,000원 ~ 3,000,000원",
    "sameAs": []
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","wklgd2iv08");`}</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <KakaoChat />
        </LanguageProvider>
      </body>
    </html>
  );
}

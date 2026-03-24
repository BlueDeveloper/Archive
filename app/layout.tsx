import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://bdarchive.site"),
  title: {
    default: "BD - 프론트엔드 · Spring Boot · 인프라 통합 개발",
    template: "%s | BD 개발 외주",
  },
  description: "프론트엔드부터 Spring Boot 백엔드, 서버 인프라와 배포 자동화까지 직접 구축하는 개발자. 10만원~300만원 외주 수주.",
  keywords: [
    "외주 개발", "프리랜서 개발자", "Spring Boot", "Next.js", "웹 개발", "쇼핑몰 개발", "서버 배포", "CI/CD", "풀스택 개발", "Oracle Cloud",
    "freelance developer", "web development", "Spring Boot developer", "Next.js developer", "e-commerce", "full-stack", "infrastructure"
  ],
  authors: [{ name: "BD" }],
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
    title: "BD - 프론트엔드 · Spring Boot · 인프라 통합 개발",
    description: "단순 UI 작업자가 아닌 운영 가능한 시스템을 설계·구현하는 개발자",
    type: "website",
    locale: "ko_KR",
    url: "https://bdarchive.site",
    siteName: "BD 개발 외주",
  },
  twitter: {
    card: "summary_large_image",
    title: "BD - 프론트엔드 · Spring Boot · 인프라 통합 개발",
    description: "단순 UI 작업자가 아닌 운영 가능한 시스템을 설계·구현하는 개발자",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

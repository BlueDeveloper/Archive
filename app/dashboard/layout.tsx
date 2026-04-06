import type { Metadata, Viewport } from "next";
import Nav from "@/components/dashboard/Nav";
import PwaRegister from "@/components/dashboard/PwaRegister";
import footerStyles from "@/components/dashboard/Footer.module.css";
import styles from "./layout.module.css";
import "@/app/styles/dashboard-globals.css";

export const viewport: Viewport = {
  themeColor: "#0f1117",
};

export const metadata: Metadata = {
  title: "BRP 대시보드",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "BRP 대시보드",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/BRP_logo_final.webp",
    apple: "/BRP_logo_final.webp",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardInner}>
        <PwaRegister />
        <Nav />
        {children}
        <footer className={footerStyles.footer}>
          <div className={footerStyles.brand}>비알피(BlueRedPolarity)</div>
          <div className={footerStyles.grid}>
            <div className={footerStyles.item}>
              <span className={footerStyles.label}>사업자등록번호</span>
              <span>511-32-01572</span>
            </div>
            <div className={footerStyles.item}>
              <span className={footerStyles.label}>대표</span>
              <span>윤동제</span>
            </div>
            <div className={footerStyles.item}>
              <span className={footerStyles.label}>업종</span>
              <span>정보통신업 / 컴퓨터 프로그래밍 서비스업</span>
            </div>
            <div className={footerStyles.item}>
              <span className={footerStyles.label}>개업일</span>
              <span>2026. 03. 28</span>
            </div>
            <div className={footerStyles.item}>
              <span className={footerStyles.label}>소재지</span>
              <span>경기도 화성시 병점구 병점중앙로 230-10, 103동 102호</span>
            </div>
            <div className={footerStyles.item}>
              <span className={footerStyles.label}>과세유형</span>
              <span>간이과세자</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

import Nav from "@/components/dashboard/Nav";
import footerStyles from "@/components/dashboard/Footer.module.css";
import styles from "./layout.module.css";
import "@/app/styles/dashboard-globals.css";

export const metadata = {
  title: "BRP 대시보드",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png?v=2",
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

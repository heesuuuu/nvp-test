import React from "react";

import { Gowun_Dodum, Inter } from "next/font/google";

import HeaderWrapper from "@/components/layout/header/HeaderWrapper";
import "../scss/styles.scss";

const gowun = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gowun",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Nvp Position Test",
  description: " Volleyball Position Test",
  icons: {
    icons: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${gowun.variable} ${inter.variable} antialiased `}
        style={{
          maxWidth: "390px", minWidth: "390px", margin: "0 auto", backgroundColor: "var(--background-out)",
          display: "flex",
          // 이 부분 입력하면 배경 색이 화면 크기에 맞춰짐 스크롤 있을 때 스크롤 범위의 배경 색이 적용 안됨
          // overflowY: "auto",
          // height: "100vh",
          justifyContent: "center"
        }}
      >
        <div className="layout-inner" style={{
          backgroundColor: "var(--background)",
          width: "390px",
          minHeight: "100vh",
          // height: "auto",
          position: "relative"
        }}>
          <HeaderWrapper />
          {children}
        </div>
      </body>
    </html>
  );
}

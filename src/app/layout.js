import React from "react";

import { Gowun_Dodum, Inter } from "next/font/google";

import HeaderWrapper from "@/components/layout/header/HeaderWrapper";
import "../scss/styles.scss";
import PaddingWrapper from "@/components/layout/PaddingWrapper";

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
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${gowun.variable} ${inter.variable} antialiased `}
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "var(--background-out)",
          // minHeight: "100vh"
        }}
      >
        <div className="layout-wrapper">
          <PaddingWrapper >
            <HeaderWrapper className="layout-header" />
            <div className="layout-inner" style={{
              backgroundColor: "var(--background)",
              width: "100%",
              height: "100%",
              minHeight: "100vh",
              position: "relative"
            }}>
              {children}
            </div>
          </PaddingWrapper>
        </div>
      </body>
    </html>
  );
}
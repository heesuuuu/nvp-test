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
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"

};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${gowun.variable} ${inter.variable} antialiased `}
        style={{
          maxWidth: "390px", minWidth: "390px", margin: "0 auto",
          backgroundColor: "var(--background-out)",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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
      </body>
    </html>
  );
}
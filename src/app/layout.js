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
          justifyContent: "center"
}}
      >
        <div style={{
          backgroundColor: "var(--background)",
          width: "390px",
          minHeight: "100vh"
        }}>
          <HeaderWrapper />
          {children}
        </div>
      </body>
    </html>
  );
}

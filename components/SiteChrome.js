"use client";

import { useEffect, useState } from "react";
import { colors } from "@/lib/colors";
import Nav from "@/components/Nav";
import IntroOverlay from "@/components/IntroOverlay";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }) {
  const [introShow, setIntroShow] = useState(true);
  const [introLifted, setIntroLifted] = useState(false);

  useEffect(() => {
    const liftTimer = setTimeout(() => setIntroLifted(true), 1700);
    const hideTimer = setTimeout(() => setIntroShow(false), 2500);
    return () => {
      clearTimeout(liftTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(${colors.borderLight} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <IntroOverlay show={introShow} lifted={introLifted} />

      <Nav />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 6vw 100px" }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

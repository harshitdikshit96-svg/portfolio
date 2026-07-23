"use client";

import { useCallback, useEffect, useState } from "react";
import { colors } from "@/lib/colors";
import Nav from "@/components/Nav";
import IntroOverlay from "@/components/IntroOverlay";
import Footer from "@/components/Footer";
import Home from "@/components/sections/Home";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Blog from "@/components/sections/Blog";

const SECTIONS = { home: Home, work: Work, about: About, contact: Contact, blog: Blog };

export default function Portfolio() {
  const [view, setViewState] = useState("home");
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

  // Stable identity so Nav (memoized) and each section (memoized) don't
  // re-render just because Portfolio's own state changed elsewhere.
  const setView = useCallback((next) => {
    setViewState(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const goWork = useCallback(() => setView("work"), [setView]);
  const goContact = useCallback(() => setView("contact"), [setView]);

  const ActiveSection = SECTIONS[view] ?? Home;

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

      <Nav view={view} onNavigate={setView} />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 6vw 100px" }}>
        <ActiveSection onGoWork={goWork} onGoContact={goContact} />
      </main>

      <Footer />
    </div>
  );
}

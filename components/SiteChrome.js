"use client";

import { usePathname } from "next/navigation";
import { colors } from "@/lib/colors";
import Nav from "@/components/Nav";
import dynamic from "next/dynamic";

// Floating "book a call" bubble. Loaded as its own chunk after hydration
// rather than in the initial bundle: it floats over the page, so it has no
// reason to be part of what has to download before first paint — on a
// throttled phone, every script requested up front counts against LCP.
const StickyCta = dynamic(() => import("@/components/StickyCta"), { ssr: false });
import CalendlyBookingTracker from "@/components/CalendlyBookingTracker";

export default function SiteChrome({ children, footer }) {
  const pathname = usePathname();
  // The admin panel is an internal tool, not a marketing page — it gets no
  // nav links, footer, or "book a free call" bubble, and renders its own
  // full-page background instead of this wrapper's.
  if (pathname?.startsWith("/admin")) {
    return children;
  }

  return (
    <div
      style={{
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

      <Nav />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 6vw 100px" }}>
        {children}
      </main>

      {footer}
      <StickyCta />
      <CalendlyBookingTracker />
    </div>
  );
}

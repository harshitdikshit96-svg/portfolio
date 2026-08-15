import { colors } from "@/lib/colors";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import DiscountBanner from "@/components/DiscountBanner";

export default function SiteChrome({ children }) {
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

      <DiscountBanner />
      <Nav />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 6vw 100px" }}>
        {children}
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
}

import Link from "next/link";
import { colors } from "@/lib/colors";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      style={{ padding: "140px 0", textAlign: "center", animation: "fadeUp 0.25s ease both", minHeight: "50vh" }}
    >
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 72, color: colors.accent, marginBottom: 20 }}>
        404
      </div>
      <h1 style={{ fontSize: "clamp(26px, 3.4vw, 36px)", fontWeight: 700, margin: "0 0 12px" }}>
        This page doesn&apos;t exist.
      </h1>
      <p style={{ fontSize: 16, color: colors.textDimmer, maxWidth: 440, margin: "0 auto 34px" }}>
        The link might be old, or the URL was mistyped. Here&apos;s where you probably meant to go.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary">
          Go home →
        </Link>
        <Link href="/contact" className="btn-secondary">
          Get in touch
        </Link>
      </div>
    </section>
  );
}

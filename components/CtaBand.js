import Link from "next/link";
import { colors } from "@/lib/colors";

/**
 * A second CTA entry point at the bottom of long pages — visitors who
 * scroll all the way down shouldn't have to scroll back up to the nav
 * to get in touch.
 */
export default function CtaBand({
  heading = "Have something to build or fix?",
  subtext = "Open to freelance and consulting work — tell me what you're working on.",
}) {
  return (
    <div
      style={{
        margin: "100px 0 60px",
        padding: "48px 40px",
        borderRadius: 16,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", margin: "0 0 12px", fontWeight: 700, letterSpacing: "-0.01em" }}>
        {heading}
      </h2>
      <p style={{ fontSize: 16, color: colors.textDimmer, margin: "0 0 28px", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        {subtext}
      </p>
      <Link href="/contact" className="btn-primary" style={{ display: "inline-block" }}>
        Get in touch →
      </Link>
    </div>
  );
}

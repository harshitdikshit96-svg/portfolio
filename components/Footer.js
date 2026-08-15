"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { NAV_DEFS, SOCIAL } from "@/lib/data";

// Deliberately its own dark island (neutral-900) rather than the site's
// light `colors.*` tokens — matches the "Harshit Creates" design, which
// keeps the footer dark for contrast regardless of page theme.
const footerColors = {
  bg: "#1B2036",
  heading: "#F7F7FB",
  text: "#EBEBF5",
  textMuted: "#8697C4",
  textFaint: "#6B7AA8",
  accentHover: "#C3CBEB",
};

const linkStyle = { color: footerColors.text, fontSize: 14, textDecoration: "none" };

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer style={{ position: "relative", zIndex: 1, background: footerColors.bg, color: footerColors.text }}>
      <div
        className="footer-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "64px 6vw 32px",
          display: "flex",
          gap: 48,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 280px", minWidth: 240 }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: footerColors.heading }}>harshitcreates</span>
          <p style={{ marginTop: 10, fontSize: 14, color: footerColors.textMuted, maxWidth: "34ch" }}>
            Websites, technical consulting and freelance app development for founders and small businesses —
            remote-friendly, wherever you are.
          </p>
          <a
            href={`mailto:${SOCIAL.email}`}
            className="freelance-pill"
            style={{ marginTop: 16, borderColor: footerColors.textFaint, color: footerColors.text }}
          >
            <span className="freelance-pill-dot" style={{ background: "#7091E6" }} />
            open to freelance
          </a>
        </div>

        <div style={{ flex: "0 1 160px", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: footerColors.textFaint, marginBottom: 4 }}>
            Explore
          </span>
          {NAV_DEFS.map((item) => (
            <Link key={item.id} href={item.href} className="footer-link" style={linkStyle}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ flex: "0 1 220px", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: footerColors.textFaint, marginBottom: 4 }}>
            Elsewhere
          </span>
          <a href={`mailto:${SOCIAL.email}`} className="footer-link" style={linkStyle}>
            {SOCIAL.email}
          </a>
          <a href={SOCIAL.resumeHref} target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            resume
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            linkedin
          </a>
          <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            github
          </a>
          {SOCIAL.gbpUrl && (
            <a href={SOCIAL.gbpUrl} target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
              google reviews
            </a>
          )}
          <span style={{ color: footerColors.textMuted, fontSize: 14, marginTop: 4 }}>Lucknow, Uttar Pradesh</span>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 6vw 28px", fontSize: 12, color: footerColors.textFaint }}>
        © {year} harshitcreates. Every price is starting at · negotiable.
      </div>
    </footer>
  );
}

export default memo(Footer);

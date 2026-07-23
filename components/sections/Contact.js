"use client";

import { memo } from "react";
import { colors } from "@/lib/colors";
import { SOCIAL } from "@/lib/data";

function Contact() {
  return (
    <section data-screen-label="Contact" style={{ padding: "100px 0", animation: "fadeUp 0.5s ease both", minHeight: "50vh" }}>
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.accent, marginBottom: 14 }}>
        {"// get in touch"}
      </div>
      <h2 style={{ fontSize: "clamp(34px, 5vw, 54px)", margin: "0 0 24px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 700 }}>
        Have a web problem worth solving properly?
      </h2>
      <p style={{ fontSize: 16.5, lineHeight: 1.7, color: colors.textDim, maxWidth: 560, margin: "0 0 40px" }}>
        Open to freelance and consulting work — architecture reviews, performance audits, or building the thing
        outright. Drop a line and I&apos;ll reply within a couple of days.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
        <a
          href={`mailto:${SOCIAL.email}`}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 14,
            padding: "14px 28px",
            background: colors.accent,
            color: colors.bg,
            borderRadius: 8,
            fontWeight: 700,
          }}
        >
          {SOCIAL.email}
        </a>
      </div>
      <div style={{ display: "flex", gap: 28, fontFamily: "'Times New Roman', Times, serif", fontSize: 13.5 }}>
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin →
        </a>
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
          github →
        </a>
      </div>
    </section>
  );
}

export default memo(Contact);

"use client";

import { memo, useMemo } from "react";
import { colors } from "@/lib/colors";
import { SOCIAL } from "@/lib/data";

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: `1px solid ${colors.border}`,
        padding: "30px 6vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: 12,
        color: colors.textFaintest,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>© {year} Harshit Dixit</div>
      <div style={{ display: "flex", gap: 20 }}>
        <a href={SOCIAL.resumeHref} target="_blank" rel="noopener noreferrer" style={{ color: colors.textFaintest }}>
          resume
        </a>
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: colors.textFaintest }}>
          linkedin
        </a>
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" style={{ color: colors.textFaintest }}>
          github
        </a>
      </div>
    </footer>
  );
}

export default memo(Footer);

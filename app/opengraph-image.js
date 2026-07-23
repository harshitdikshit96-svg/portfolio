import { ImageResponse } from "next/og";

export const alt =
  "Harshit Dixit — Freelance Technical Consultant & Web Solutions Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex approximations of the site's oklch palette — satori (the renderer
// behind ImageResponse) doesn't support oklch(), so these are picked to
// visually match rather than reused from lib/colors.js.
const bg = "#1a120e";
const text = "#f2e9da";
const textMuted = "#a99a89";
const accent = "#e2a463";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: accent,
              letterSpacing: 2,
              marginBottom: 28,
            }}
          >
            FREELANCE TECHNICAL CONSULTANT &amp; WEB SOLUTIONS ARCHITECT
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: text,
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            Builds web products that hold up at scale.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: text }}>
              harshit<span style={{ color: accent }}>.</span>dev
            </div>
            <div style={{ display: "flex", fontSize: 22, color: textMuted, marginTop: 8 }}>
              Harshit Dixit — React · Next.js · Node.js
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              color: text,
              border: `1px solid ${textMuted}`,
              borderRadius: 999,
              padding: "12px 24px",
            }}
          >
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: "50%", background: accent }} />
            open to freelance
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

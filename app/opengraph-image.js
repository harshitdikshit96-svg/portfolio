import { ImageResponse } from "next/og";
import { ROLE_TAGLINE } from "@/lib/data";

// Kept in sync with the <title> tag and Person JSON-LD's jobTitle via the
// shared ROLE_TAGLINE constant — this card used to say "Freelance Technical
// Consultant & Web Solutions Architect" while the title tag right below it
// in a link-preview said something else, which read as inconsistent.
export const alt = `Harshit Dixit — ${ROLE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The OG card uses a dark accent ground (rather than the site's light page
// background) so it reads at social-preview thumbnail size — colors are
// picked from the "Harshit Creates" palette in lib/colors.js.
const bg = "#1B2036";
const text = "#EDE8F5";
const textMuted = "#ADBBDA";
const accent = "#7091E6";

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
            {ROLE_TAGLINE.toUpperCase()}
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
              harshit<span style={{ color: accent }}>creates</span>
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
              borderRadius: 8,
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

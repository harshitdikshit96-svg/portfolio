import { colors } from "@/lib/colors";
import { CALENDLY_URL } from "@/lib/data";

/**
 * The frictionless "book a free call" block — a real embedded scheduler,
 * not another form that adds a reply-wait step. Uses Calendly's inline
 * embed (an iframe, no client JS needed) so it works even before we wire
 * up anything fancier.
 *
 * CALENDLY_URL in lib/data.js is a placeholder until the real Calendly
 * account exists — swap it there and this block picks it up everywhere.
 */
export default function ConsultationCta({
  heading = "Book a free consultation",
  subtext = "30 minutes, no cost, no obligation — pick a slot that works for you.",
}) {
  return (
    <div
      style={{
        margin: "90px 0",
        padding: "40px",
        borderRadius: 16,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div className="consultation-block">
        <div>
          <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, marginBottom: 12 }}>
            {"// free, no strings"}
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", margin: "0 0 12px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {heading}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.textDimmer, margin: "0 0 20px", maxWidth: 440 }}>
            {subtext}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {["Sign in with Google to book instantly", "Or just email/WhatsApp if you'd rather", "We'll follow up with a free draft, not a sales pitch"].map(
              (line) => (
                <li key={line} style={{ fontSize: 14.5, color: colors.textFaint, display: "flex", gap: 8 }}>
                  <span style={{ color: colors.accent }}>›</span>
                  {line}
                </li>
              )
            )}
          </ul>
        </div>
        <iframe
          className="calendly-frame"
          src={CALENDLY_URL}
          title="Book a free consultation"
          loading="lazy"
        />
      </div>
    </div>
  );
}

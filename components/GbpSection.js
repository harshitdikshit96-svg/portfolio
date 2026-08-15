import { colors } from "@/lib/colors";
import { SOCIAL } from "@/lib/data";

const napRow = { display: "flex", gap: 10, fontSize: 14.5 };

/**
 * Google Business Profile block — consistent NAP (name/area/category) plus
 * a review/"find us" call to action. SOCIAL.gbpUrl is null until the real
 * profile exists (creating one needs Harshit's own Google account, so it
 * can't be automated here); every consumer of it — this section, Footer,
 * layout.js JSON-LD `sameAs` — already null-checks rather than linking out
 * to a profile that doesn't exist yet.
 */
export default function GbpSection() {
  return (
    <div
      style={{
        marginTop: 48,
        padding: "24px 28px",
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        maxWidth: 560,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 12 }}>
        Find us on Google
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        <div style={napRow}>
          <span style={{ color: colors.textFaint, width: 90, flexShrink: 0 }}>Business</span>
          <span>harshitcreates — Website Developer</span>
        </div>
        <div style={napRow}>
          <span style={{ color: colors.textFaint, width: 90, flexShrink: 0 }}>Area served</span>
          <span>Lucknow, Uttar Pradesh · Remote (worldwide)</span>
        </div>
        <div style={napRow}>
          <span style={{ color: colors.textFaint, width: 90, flexShrink: 0 }}>Email</span>
          <span>{SOCIAL.email}</span>
        </div>
      </div>
      {SOCIAL.gbpUrl ? (
        <>
          <a href={SOCIAL.gbpUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: 14, padding: "10px 18px" }}>
            Find us on Google / leave a review →
          </a>
          {SOCIAL.gbpEmbedSrc && (
            <iframe
              src={SOCIAL.gbpEmbedSrc}
              title="harshitcreates on Google"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: "100%", height: 220, border: `1px solid ${colors.border}`, borderRadius: 10, marginTop: 16 }}
            />
          )}
        </>
      ) : (
        <p style={{ fontSize: 13, color: colors.textFaintest, margin: 0, fontStyle: "italic" }}>
          Google Business Profile — set up in progress, link goes live here once it&apos;s verified.
        </p>
      )}
    </div>
  );
}

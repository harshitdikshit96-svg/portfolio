import Link from "next/link";
import { colors } from "@/lib/colors";
import ImageSlot from "@/components/ImageSlot";

// "Live" pulses (same treatment as the footer's "open to freelance" dot) —
// it's the one status that means something is actively running right now.
// The other two are real, static facts, not something to draw the eye to.
const STATUS_META = {
  Live: { dot: colors.teal, pulse: true },
  "Live demo": { dot: colors.accent, pulse: false },
  "Not deployed": { dot: colors.textFaint, pulse: false },
};

/**
 * One project tile — used both in the horizontal carousels (Home's
 * "Featured work" teaser, the full /work page) and nowhere else, so its
 * fixed width lives on the tile itself (`.work-tile`) rather than a grid
 * a caller would need to configure.
 *
 * Surfaces three fields that existed in lib/data.js but had no home in the
 * UI before this: `index` (a small numbered badge, tying its visual
 * language to UspBanner's numbered tiles), `tint` (that badge's color —
 * every project already carries one), and `role` (Harshit's actual
 * involvement — co-founder, freelance build, etc.) as a caption above the
 * name, and `status` as a plain-language pill instead of being implied
 * only by whether a live-site link happens to be present.
 */
export default function ProjectCard({ p }) {
  const status = STATUS_META[p.status] ?? STATUS_META["Not deployed"];

  return (
    <div className="work-tile work-card" style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 14, color: colors.text }}>
      <div className="work-card-image-frame">
        <div className="work-card-image">
          <ImageSlot src={p.imageLg} alt={`${p.name} website screenshot`} fill height={200} placeholder="project screenshot" />
          <span className="work-tile-index" style={{ background: p.tint }} aria-hidden="true">
            {p.index}
          </span>
          <span className="work-tile-status">
            <span className={`work-tile-status-dot ${status.pulse ? "pulse" : ""}`} style={{ background: status.dot }} />
            {p.status}
          </span>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-card-visit"
              aria-label={`Open the live ${p.name} site in a new tab`}
            >
              <span>Visit live site ↗</span>
            </a>
          )}
        </div>
      </div>
      <Link href={`/work/${p.slug}`} style={{ display: "block", padding: 28, color: "inherit" }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: colors.textFaint, marginBottom: 6 }}>
          {p.role}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{p.name}</h3>
          <span style={{ fontSize: 18, color: colors.textFaint }}>→</span>
        </div>
        <p className="work-tile-tagline" style={{ fontSize: 14.5, lineHeight: 1.6, color: colors.textDimmer, margin: "0 0 18px" }}>
          {p.tagline}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="tag-chip"
              style={{ fontSize: 11, padding: "5px 10px", borderRadius: 6, border: `1px solid ${colors.borderFaint}`, color: colors.textDim }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}

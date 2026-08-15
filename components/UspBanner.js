import { colors } from "@/lib/colors";
import { USPS } from "@/lib/data";
import Reveal from "@/components/Reveal";

/**
 * The "why us" strip — a single scrollable row of tiles rather than a grid,
 * so it reads as one confident line of claims instead of a soft card grid
 * that blends into the page. Snap-scrolls horizontally on any viewport
 * narrower than the row's natural width.
 */
export default function UspBanner() {
  return (
    <Reveal className="usp-track">
      {USPS.map((usp, i) => (
        <div key={usp.label} className="usp-tile">
          <div className="usp-tile-index">{String(i + 1).padStart(2, "0")}</div>
          <div className="usp-icon">{usp.icon}</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 14, letterSpacing: "-0.01em" }}>{usp.label}</div>
          <div style={{ fontSize: 13, color: colors.textFaint, lineHeight: 1.5, marginTop: 4 }}>{usp.detail}</div>
        </div>
      ))}
    </Reveal>
  );
}

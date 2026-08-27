"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { colors } from "@/lib/colors";
import { USPS } from "@/lib/data";
import Reveal from "@/components/Reveal";

// Inline stroke icons — replaces the previous per-tile emoji, two of which
// (the pencil and palette) rendered as empty circles on browser/OS
// combinations without a color-emoji font for that codepoint. An SVG can't
// fail to render that way, and these paths match the ones already used in
// the hero carousel's "How it works" banner for visual consistency.
const ICONS = {
  delivery: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  draft: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  ),
  consultation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  preview: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  remote: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

/**
 * The "why us" strip — a single scrollable row of tiles rather than a grid,
 * so it reads as one confident line of claims instead of a soft card grid
 * that blends into the page. Snap-scrolls horizontally on any viewport
 * narrower than the row's natural width, with explicit prev/next arrows
 * (not just the fade mask) so the "more tiles off-screen" affordance can't
 * be missed.
 */
export default function UspBanner() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByTile = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const tile = el.querySelector(".usp-tile");
    const amount = (tile?.getBoundingClientRect().width ?? 216) + 16;
    // `behavior: "smooth"` gets fought by this track's own
    // `scroll-snap-type: x proximity` (confirmed in Chrome: a smooth
    // scrollBy/scrollTo on this element silently no-ops) — "instant" is the
    // reliable option. Also don't wait on the element's own "scroll" event
    // to refresh the arrows' disabled state — call updateEdges directly,
    // since a programmatic instant jump doesn't reliably dispatch one.
    el.scrollBy({ left: dir * amount, behavior: "instant" });
    updateEdges();
  };

  return (
    <div className="usp-carousel">
      <Reveal
        className={`usp-track${atStart ? " at-start" : ""}${atEnd ? " at-end" : ""}`}
        ref={trackRef}
      >
        {USPS.map((usp, i) => (
          <div key={usp.label} className="usp-tile">
            <div className="usp-tile-index">{String(i + 1).padStart(2, "0")}</div>
            <div className="usp-icon">{ICONS[usp.id]}</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 14, letterSpacing: "-0.01em" }}>{usp.label}</div>
            <div style={{ fontSize: 13, color: colors.textFaint, lineHeight: 1.5, marginTop: 4 }}>{usp.detail}</div>
          </div>
        ))}
      </Reveal>
      <button
        type="button"
        aria-label="Scroll commitments left"
        className="usp-arrow usp-arrow-prev"
        onClick={() => scrollByTile(-1)}
        disabled={atStart}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Scroll commitments right"
        className="usp-arrow usp-arrow-next"
        onClick={() => scrollByTile(1)}
        disabled={atEnd}
      >
        ›
      </button>
    </div>
  );
}

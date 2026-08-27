"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Reveal from "@/components/Reveal";

/**
 * Shared mechanics behind every horizontally-scrolling tile row on the site
 * (first built for UspBanner's "why us" strip, now reused for Work) — a
 * snap-scroll track, prev/next arrows, and an edge-fade mask that only
 * fades whichever side still has more tiles to reveal (via the
 * `atStart`/`atEnd` state below), so the hover border on the first/last
 * tile never gets washed out by a fade that has nothing left to hint at.
 *
 * Callers own tile content and sizing entirely — this only owns the
 * scroll/arrow/fade behavior, via `trackClassName` for gap/padding and
 * `label` for the arrows' accessible names ("Scroll {label} left/right").
 */
export default function TileCarousel({ children, trackClassName = "", label = "items" }) {
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
    const tile = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const amount = (tile?.getBoundingClientRect().width ?? 300) + gap;
    // See UspBanner.js for why "instant" (not "smooth") is the reliable
    // choice here: this track's own scroll-snap fights a smooth
    // scrollBy/scrollTo, so a smooth call silently no-ops in Chrome.
    el.scrollBy({ left: dir * amount, behavior: "instant" });
    updateEdges();
  };

  return (
    <div className="tile-carousel">
      <Reveal
        className={`tile-track ${trackClassName} ${atStart ? "at-start" : ""} ${atEnd ? "at-end" : ""}`.trim()}
        ref={trackRef}
      >
        {children}
      </Reveal>
      <button
        type="button"
        aria-label={`Scroll ${label} left`}
        className="tile-arrow tile-arrow-prev"
        onClick={() => scrollByTile(-1)}
        disabled={atStart}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={`Scroll ${label} right`}
        className="tile-arrow tile-arrow-next"
        onClick={() => scrollByTile(1)}
        disabled={atEnd}
      >
        ›
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { CALENDLY_URL } from "@/lib/data";

/**
 * Persistent floating "book a free call" bubble — always on screen from
 * first paint, not gated behind a scroll threshold (a scroll-triggered
 * version is too easy to miss/scroll past). Pattern borrowed from the
 * shroomly.in build: a fixed circular button plus a small dismissible
 * tooltip, rather than a wide pill that only appears conditionally.
 */
export default function StickyCta() {
  const [dismissed, setDismissed] = useState(false);
  // The bubble sits fixed bottom-right, which is exactly where the
  // Calendly embed's own controls land on /contact and /packages — hide it
  // while any `.calendly-frame` is in view so it never covers the primary
  // conversion action.
  const [overCalendly, setOverCalendly] = useState(false);

  useEffect(() => {
    const frames = document.querySelectorAll(".calendly-frame");
    if (!frames.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setOverCalendly((prev) => {
          const next = new Set(prev instanceof Set ? prev : []);
          entries.forEach((entry) => {
            if (entry.isIntersecting) next.add(entry.target);
            else next.delete(entry.target);
          });
          return next;
        });
      },
      { threshold: 0.15 }
    );
    frames.forEach((frame) => observer.observe(frame));
    return () => observer.disconnect();
  }, []);

  const hidden = overCalendly instanceof Set && overCalendly.size > 0;

  return (
    <div className="sticky-cta-wrap" style={hidden ? { opacity: 0, pointerEvents: "none" } : undefined}>
      {!dismissed && (
        <div className="sticky-cta-tooltip">
          <span>Free 30-min consultation?</span>
          <button
            type="button"
            aria-label="Dismiss"
            className="sticky-cta-dismiss"
            onClick={() => setDismissed(true)}
          >
            ✕
          </button>
        </div>
      )}
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta-fab"
        aria-label="Book a free consultation call"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      </a>
    </div>
  );
}

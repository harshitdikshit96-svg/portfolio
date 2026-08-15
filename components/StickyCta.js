"use client";

import { useState } from "react";
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

  return (
    <div className="sticky-cta-wrap">
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

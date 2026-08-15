"use client";

import { useState } from "react";
import Link from "next/link";
import { PROMO } from "@/lib/data";

/**
 * Full-width strip above the nav announcing the current promo. Scrolls
 * away with the page (not sticky) — the nav itself keeps its own sticky
 * top:0 once this scrolls past. Dismissible for the session; resets on a
 * fresh page load rather than persisting via storage, on purpose (a
 * time-limited offer should keep showing up).
 */
export default function DiscountBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!PROMO.active || dismissed) return null;

  return (
    <div className="discount-banner">
      <div className="discount-banner-inner">
        <span>
          {PROMO.message}{" "}
          <Link href="/packages" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
            See discounted packages →
          </Link>
        </span>
        <button
          type="button"
          aria-label="Dismiss"
          className="discount-banner-dismiss"
          onClick={() => setDismissed(true)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

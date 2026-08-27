"use client";

import { useState } from "react";

/**
 * Renders the reviewer's real Google profile photo when one loads, falling
 * back to a colored initials circle otherwise (no photo on the review, or
 * the photoUri failing to load — client-only `onError` handling is why
 * this is split out of GbpSection, which is a Server Component).
 */
export default function ReviewAvatar({ photoUrl, name, color }) {
  const [errored, setErrored] = useState(false);

  if (photoUrl && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external Google-hosted URL, not a local/optimizable asset
      <img
        src={photoUrl}
        alt={name}
        className="review-avatar"
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
      />
    );
  }

  const initials = (name.trim().split(/\s+/).map((p) => p[0] ?? "").slice(0, 2).join("") || "G").toUpperCase();
  return (
    <span className="review-avatar" style={{ background: color }}>
      {initials}
    </span>
  );
}

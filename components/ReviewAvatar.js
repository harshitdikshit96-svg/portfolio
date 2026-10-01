"use client";

import { useState } from "react";

/**
 * Renders the reviewer's real Google profile photo when one loads, falling
 * back to a colored initials circle otherwise (no photo on the review, or
 * the photoUri failing to load — client-only `onError` handling is why
 * this is split out of GbpSection, which is a Server Component).
 */
// Avatars display at 34px, but the Places API hands back 128px URLs.
// Google's photo URLs take their size as an `=s<px>` segment, so ask for
// 72px — enough for a 2x screen — instead of downloading ~4x the pixels.
const AVATAR_PX = 72;
const sized = (url) => url.replace(/=s\d+(?=-|$)/, `=s${AVATAR_PX}`);

export default function ReviewAvatar({ photoUrl, name, color }) {
  const [errored, setErrored] = useState(false);

  if (photoUrl && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external Google-hosted URL, not a local/optimizable asset
      <img
        src={sized(photoUrl)}
        alt={name}
        width={34}
        height={34}
        loading="lazy"
        decoding="async"
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

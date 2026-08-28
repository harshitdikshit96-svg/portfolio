"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Renders nothing — just fires `select_content` once when a case-study
 * page mounts (content_type/item_id match the DLV variable names shroomly's
 * GTM container already uses, so the same tag pattern applies here).
 * Dropped into the server-rendered app/work/[slug]/page.js the same way
 * Reveal/ImageSlot are: a small client leaf inside a server page, not a
 * reason to convert the whole page to "use client".
 */
export default function TrackContentView({ contentType, itemId }) {
  useEffect(() => {
    trackEvent("select_content", { content_type: contentType, item_id: itemId });
  }, [contentType, itemId]);

  return null;
}

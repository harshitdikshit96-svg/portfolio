"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An iframe that doesn't start loading until the page itself is done.
 *
 * Built for the Calendly scheduler: its embed pulls in ~6.5 MB of Calendly
 * JavaScript plus Stripe, and on /contact it sits near the top of the page,
 * so `loading="lazy"` alone starts it during the initial load. On phones
 * where the frame shares the page's main thread, that work lands exactly
 * when the visitor is first trying to tap something.
 *
 * The frame's `src` is set once BOTH:
 *   1. the window `load` event has fired and the browser reports idle time
 *      (requestIdleCallback, with a timeout so it never waits forever), and
 *   2. the frame is within ~600px of the viewport.
 * A tap or focus on the placeholder loads it immediately. Until then a
 * same-size placeholder holds the space, so nothing shifts (CLS) when the
 * real frame arrives.
 */
export default function DeferredFrame({ src, title, className, placeholder = "Loading calendar…" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    let idleId;
    let timer;
    const onIdle = () => setReady(true);
    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(onIdle, { timeout: 3000 });
      else timer = setTimeout(onIdle, 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (forced || (ready && near)) {
    return <iframe className={className} src={src} title={title} />;
  }

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={() => setForced(true)}
      onFocus={() => setForced(true)}
      aria-label={`${title} — load the booking calendar`}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "inherit", font: "inherit" }}
    >
      {placeholder}
    </button>
  );
}

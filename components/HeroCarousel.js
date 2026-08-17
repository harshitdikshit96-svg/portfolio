"use client";

import { useEffect, useRef, useState } from "react";
import { colors } from "@/lib/colors";
import { CALENDLY_URL, PACKAGE_TIERS } from "@/lib/data";
import ImageSlot from "@/components/ImageSlot";

// Icon paths shared with UspBanner.js's "consultation"/"draft" icons for
// visual consistency between the two.
const PhoneIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const FileIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </svg>
);
const RocketIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const STEPS = [
  { Icon: PhoneIcon, title: "30-min call", body: "Book a slot, tell me what you need — no forms, no back-and-forth.", color: colors.accent },
  { Icon: FileIcon, title: "Free draft in 3 hrs", body: "A real, working preview of your site — before you commit to anything.", color: colors.teal },
  { Icon: RocketIcon, title: "Live in 24 hrs", body: "Feedback folded in, polished, and pushed live — start to finish, one day.", color: colors.accentDeep },
];

// Auto-advance interval and crossfade duration for the two-slide hero.
// Crossfade is kept shorter than the interval so each slide gets a moment
// fully settled before the next transition starts.
const SLIDE_MS = 1200;
const CROSSFADE_MS = 400;

const kickerStyle = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: colors.accentDeep,
};

/**
 * Full-width, two-slide hero. Both slides stay mounted at all times —
 * visibility toggles via CSS opacity, not conditional rendering — so
 * slide 2's real <h1> (the only <h1> on the page) is always present in the
 * DOM for crawlers regardless of which slide is showing. Autoplay pauses on
 * hover/focus and is skipped entirely under prefers-reduced-motion.
 */
export default function HeroCarousel() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);
  const rootRef = useRef(null);
  const stackRef = useRef(null);
  const scrollEndTimerRef = useRef(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Matches app/globals.css's `@media (max-width: 640px)` block that turns
  // .hero-slide-stack into a horizontally-scrollable, snap-to-slide strip
  // instead of an opacity crossfade — see that rule's comment for why.
  const isMobileScrollMode = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  // Dot clicks go through this instead of setSlide directly — kept as a
  // named entry point (even though it's a one-line wrapper today) so the
  // "how do I change slides" answer stays in one place rather than
  // spreading across every click handler.
  const goToSlide = (index) => setSlide(index);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 2), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused]);

  // The single place that actually moves the strip on mobile — fires for
  // every path that changes `slide` (dot click, auto-swap tick, or a
  // manual swipe settling on the nearest slide below), so there's exactly
  // one scrollTo call per slide change instead of duplicating it per caller.
  useEffect(() => {
    const el = stackRef.current;
    if (!isMobileScrollMode() || !el) return;
    el.scrollTo({ left: slide * el.clientWidth, behavior: reducedMotionRef.current ? "auto" : "smooth" });
  }, [slide]);

  // Fires continuously while the user swipes; a real manual scroll (versus
  // the smooth-scroll from an auto-swap tick) should both pause the
  // auto-swap timer for its duration and, once it settles, update `slide`
  // to whichever slide the swipe landed on so the dots stay accurate.
  // There's no cross-browser "scroll finished" event to hook here, so this
  // debounces on a short idle gap instead.
  const handleStackScroll = () => {
    const el = stackRef.current;
    if (!isMobileScrollMode() || !el) return;
    setPaused(true);
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      const width = el.clientWidth || 1;
      const nearest = Math.round(el.scrollLeft / width);
      setSlide(Math.max(0, Math.min(1, nearest)));
      setPaused(false);
    }, 150);
  };

  // Scrolls to whatever section follows the hero — used by the "scroll for
  // more" affordance beneath the slide dots.
  const scrollToNext = () => {
    const next = rootRef.current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: reducedMotionRef.current ? "auto" : "smooth", block: "start" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: reducedMotionRef.current ? "auto" : "smooth" });
    }
  };

  return (
    <div
      ref={rootRef}
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
      style={{ "--hero-crossfade": `${CROSSFADE_MS}ms` }}
    >
      <div className="hero-slide-stack" ref={stackRef} onScroll={handleStackScroll}>
        {/* Slide 1: how-it-works process banner */}
        <div className={`hero-slide hero-slide-process ${slide === 0 ? "is-active" : ""}`} aria-hidden={slide !== 0}>
          <div className="hero-process-badge">
            <span className="hero-process-dot" />
            How it works
          </div>
          <p className="hero-process-heading">One call. A live website in 24 hours.</p>
          <div className="hero-process-steps">
            {STEPS.map((step, i) => (
              <div className="hero-process-step" key={step.title}>
                <div className="hero-process-step-row">
                  <div className="hero-process-icon" style={{ borderColor: step.color, color: step.color }}>
                    <step.Icon />
                  </div>
                  <div className="hero-process-title" style={{ color: i === 2 ? colors.text : colors.accent }}>
                    {step.title}
                  </div>
                  <div className="hero-process-body">{step.body}</div>
                </div>
                {i < STEPS.length - 1 && <span className="hero-process-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>

        {/* Slide 2: the site's real hero copy */}
        <div className={`hero-slide hero-slide-main ${slide === 1 ? "is-active" : ""}`} aria-hidden={slide !== 1}>
          <div className="hero-main-grid">
            <div>
              <span style={kickerStyle}>Websites · Local SEO · Booking Systems</span>
              <h1
                style={{
                  fontSize: "clamp(32px, 4.2vw, 52px)",
                  lineHeight: 1.1,
                  margin: "14px 0 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Websites &amp; local SEO for small, local businesses.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: colors.textDim, maxWidth: "52ch", margin: "20px 0 0" }}>
                For dentists, clinics, salons and local service businesses — same process and pricing wherever
                you&apos;re based. Live in as fast as 24 hours, with a free first draft in about 3, so you see the
                real thing before you pay for anything.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book a free call
                </a>
                <a href="#packages" className="btn-secondary">
                  See packages &amp; prices
                </a>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }}>
                {[
                  `Starts @ ₹${PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")}`,
                  "First draft in ~3 hrs",
                  "Free 30-min call",
                  "Remote-friendly",
                ].map((tag) => (
                  <span key={tag} className="tag tag-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-portrait-wrap">
              <ImageSlot
                src="/images/hero-portrait.webp"
                alt="Harshit Dixit"
                fill
                height={420}
                shape="rounded"
                radius={16}
                preload
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bottom-row">
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          <button
            type="button"
            role="tab"
            aria-selected={slide === 0}
            aria-label="Show how it works"
            className={slide === 0 ? "is-active" : ""}
            onClick={() => goToSlide(0)}
          />
          <button
            type="button"
            role="tab"
            aria-selected={slide === 1}
            aria-label="Show intro"
            className={slide === 1 ? "is-active" : ""}
            onClick={() => goToSlide(1)}
          />
        </div>

        <button type="button" className="hero-scroll-cue" onClick={scrollToNext} aria-label="Scroll down for more">
          <span className="hero-scroll-cue-label">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

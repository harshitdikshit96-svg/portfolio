"use client";

import { useEffect, useState } from "react";

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const AUTOPLAY_MS = 8000;

/**
 * The only client-side part of the hero: which slide is showing, autoplay,
 * and the dot/arrow controls. The slides themselves arrive pre-rendered
 * from HeroCarousel (a server component) as the `slides` prop, so none of
 * their markup is part of this component's JavaScript.
 *
 * Autoplay pauses on hover/focus so it doesn't fight anyone reading a slide
 * or tabbing through its controls, and every slide change restarts the
 * autoplay clock so a manual dot/arrow click isn't immediately overridden
 * by a timer from before the click.
 */
export default function HeroSlider({ slides }) {
  const count = slides.length;
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  // False until the first slide change, so the entrance animation never
  // plays on page load (see the [data-animate] rule in globals.css).
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setTimeout(() => {
      setChanged(true);
      setSlide((s) => (s + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [slide, paused, count]);

  const goTo = (index) => {
    setChanged(true);
    setSlide(((index % count) + count) % count);
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-bg-dots" aria-hidden="true" />
      <div className="hero-bg-wash" aria-hidden="true" />

      {/* key={slide} remounts this wrapper on every slide change, which
          restarts the CSS entrance animation on its children for free. */}
      <div className="hero-slide-grid" key={slide} data-animate={changed || undefined} role="group" aria-roledescription="slide" aria-label={`${slide + 1} of ${count}`}>
        {slides[slide]}
      </div>

      <div className="hero-controls">
        <div className="hero-dotsnav" role="tablist" aria-label="Hero slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Show slide ${i + 1}`}
              className="hero-dotbtn"
              data-active={slide === i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="hero-arrows">
          <button type="button" className="hero-arrow" aria-label="Previous slide" onClick={() => goTo(slide - 1)}>
            <ChevronLeftIcon />
          </button>
          <button type="button" className="hero-arrow" aria-label="Next slide" onClick={() => goTo(slide + 1)}>
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

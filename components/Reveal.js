"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

/**
 * Fades/slides a child in once it scrolls into view. Server-rendered content
 * (e.g. a project card built by a Server Component page) can be passed as
 * `children` — only this wrapper needs the client boundary for
 * IntersectionObserver, the content itself stays server-rendered.
 *
 * Forwards its ref to the underlying element (merged with the internal
 * observer ref) so a parent can still reach the real DOM node — e.g. a
 * carousel track that needs to call `scrollBy` on it.
 */
const Reveal = forwardRef(function Reveal(
  { children, delay = 0, as: Tag = "div", style, className = "", ...rest },
  forwardedRef
) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const setRefs = (node) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Tag
      ref={setRefs}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;

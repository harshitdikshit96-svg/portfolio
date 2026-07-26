"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades/slides a child in once it scrolls into view. Server-rendered content
 * (e.g. a project card built by a Server Component page) can be passed as
 * `children` — only this wrapper needs the client boundary for
 * IntersectionObserver, the content itself stays server-rendered.
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", style, className = "", ...rest }) {
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

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

"use client";

import { memo, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/lib/colors";
import { NAV_DEFS, SOCIAL } from "@/lib/data";

const navLinkStyle = (active) => ({
  fontFamily: "'Times New Roman', Times, serif",
  fontSize: 14,
  cursor: "pointer",
  padding: "6px 2px",
  color: active ? colors.text : colors.textFainter,
  display: "flex",
  alignItems: "center",
  gap: 6,
  transition: "color 0.2s",
});

function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef(null);
  const itemRefs = useRef(new Map());

  // Close the mobile menu on navigation. Adjusting state during render
  // (rather than in an effect) avoids an extra commit — React's documented
  // pattern for "reset state when a prop changes".
  const [menuClosedForPathname, setMenuClosedForPathname] = useState(pathname);
  if (pathname !== menuClosedForPathname) {
    setMenuClosedForPathname(pathname);
    setMenuOpen(false);
  }

  useLayoutEffect(() => {
    const activeItem = NAV_DEFS.find((item) => item.href === pathname);
    const el = activeItem && itemRefs.current.get(activeItem.id);
    const container = tabsRef.current;
    if (!el || !container) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicator({ left: rect.left - containerRect.left, width: rect.width, opacity: 1 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  const navItems = NAV_DEFS.map((item) => ({ ...item, active: pathname === item.href }));

  const tabs = (
    <div className="nav-tabs" ref={tabsRef}>
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          ref={(el) => itemRefs.current.set(item.id, el)}
          className="nav-link"
          style={navLinkStyle(item.active)}
        >
          {item.label}
          {item.soon && (
            <span
              style={{
                fontSize: 9,
                padding: "2px 5px",
                borderRadius: 3,
                background: colors.borderLight,
                color: colors.textFaint,
                letterSpacing: "0.04em",
              }}
            >
              SOON
            </span>
          )}
        </Link>
      ))}
      <span
        className="nav-indicator"
        style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
      />
    </div>
  );

  return (
    // position:relative so the mobile dropdown below can anchor to this
    // element's bottom edge (top: 100%) instead of being laid out as a flex
    // sibling of the logo/hamburger bar — that was the earlier bug: with the
    // panel as a flex item inside the same row, expanding it grew the whole
    // bar's height, and align-items:center then re-centered the logo and
    // hamburger into the middle of the open menu.
    <nav style={{ position: "sticky", top: 0, zIndex: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 6vw",
          background: colors.bgNav,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Link
          href="/"
          className="nav-logo"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: colors.text,
          }}
        >
          harshit<span style={{ color: colors.accent }}>.</span>dev
          <span style={{ color: colors.accent, animation: "blink 1.1s step-start infinite" }}>_</span>
        </Link>

        <div className="nav-desktop-row">
          {tabs}

          <a
            href={SOCIAL.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="dashed-link"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 13,
              color: colors.textFainter,
              borderBottom: `1px dashed ${colors.borderStrong}`,
              paddingBottom: 2,
              whiteSpace: "nowrap",
            }}
          >
            Resume ↓
          </a>

          <a href={`mailto:${SOCIAL.email}`} className="freelance-pill">
            <span className="freelance-pill-dot" />
            open to freelance
          </a>
        </div>

        <button
          type="button"
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile-panel ${menuOpen ? "open" : ""}`}>
        <div className="nav-mobile-panel-inner">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="nav-mobile-link"
              style={{ ...navLinkStyle(item.active), padding: "12px 10px", fontSize: 16 }}
            >
              {item.label}
              {item.soon && (
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 5px",
                    borderRadius: 3,
                    background: colors.borderLight,
                    color: colors.textFaint,
                    letterSpacing: "0.04em",
                  }}
                >
                  SOON
                </span>
              )}
            </Link>
          ))}
          <a
            href={SOCIAL.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-mobile-link"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 15,
              color: colors.textFainter,
              padding: "12px 10px",
            }}
          >
            Resume ↓
          </a>
          <a href={`mailto:${SOCIAL.email}`} className="freelance-pill" style={{ margin: "8px 10px 16px" }}>
            <span className="freelance-pill-dot" />
            open to freelance
          </a>
        </div>
      </div>
    </nav>
  );
}

export default memo(Nav);

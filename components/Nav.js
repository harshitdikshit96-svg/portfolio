"use client";

import { memo, useMemo } from "react";
import { colors } from "@/lib/colors";
import { NAV_DEFS, SOCIAL } from "@/lib/data";

function Nav({ view, onNavigate }) {
  // Only the active tab's colors change with `view` — recomputing the whole
  // array here (instead of a class-toggle-per-item scheme) is cheap, but
  // memoizing means it only happens when `view` actually changes, not on
  // every re-render of the parent (e.g. the two intro-animation timeouts).
  const navItems = useMemo(
    () =>
      NAV_DEFS.map((item) => ({
        ...item,
        active: view === item.id,
      })),
    [view]
  );

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 6vw",
        background: colors.bgNav,
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div
        onClick={() => onNavigate("home")}
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "-0.02em",
          color: colors.text,
        }}
      >
        harshit<span style={{ color: colors.accent }}>.</span>dev
        <span style={{ color: colors.accent, animation: "blink 1.1s step-start infinite" }}>_</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="nav-link"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 13,
              cursor: "pointer",
              padding: "6px 2px",
              color: item.active ? colors.text : colors.textFainter,
              borderBottom: `2px solid ${item.active ? colors.accent : "transparent"}`,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.2s",
            }}
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
          </div>
        ))}

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

        <a
          href={`mailto:${SOCIAL.email}`}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: `1px solid ${colors.borderStrong}`,
            borderRadius: 20,
            color: colors.text,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: colors.accent,
              animation: "pulseDot 2s infinite",
            }}
          />
          open to freelance
        </a>
      </div>
    </nav>
  );
}

export default memo(Nav);

"use client";

import { memo } from "react";
import { colors } from "@/lib/colors";
import { INTRO_WORDS } from "@/lib/data";

function IntroOverlay({ show, lifted }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 26,
        transition: "transform 0.8s cubic-bezier(.76,0,.24,1)",
        transform: lifted ? "translateY(-100%)" : "translateY(0)",
        pointerEvents: lifted ? "none" : "auto",
      }}
    >
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center", padding: "0 20px" }}>
        {INTRO_WORDS.map((word) => (
          <div key={word.word} style={{ display: "flex" }}>
            {word.letters.map((letter, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(30px, 6vw, 60px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  opacity: 0,
                  animation: "introLetter 0.55s ease forwards",
                  animationDelay: `${letter.delay}ms`,
                }}
              >
                {letter.ch}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div style={{ width: 200, height: 2, background: colors.borderLight, overflow: "hidden", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: "0%",
            background: colors.accent,
            animation: "introProgress 1.4s ease forwards",
            animationDelay: "0.2s",
          }}
        />
      </div>
    </div>
  );
}

export default memo(IntroOverlay);

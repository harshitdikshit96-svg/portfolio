"use client";

import { colors } from "@/lib/colors";

// Replaces the entire root layout when something fails there, so it must
// render its own <html>/<body> and can't lean on SiteChrome or anything
// else that might itself be implicated in the failure — kept deliberately
// minimal and self-contained.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.bg,
          color: colors.text,
          fontFamily: "'Times New Roman', Times, serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}>Something went wrong.</h1>
          <p style={{ fontSize: 16, color: colors.textDimmer, maxWidth: 400, margin: "0 auto 28px" }}>
            The page failed to load. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 15,
              padding: "14px 28px",
              background: colors.accent,
              color: colors.bg,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Reload →
          </button>
        </div>
      </body>
    </html>
  );
}

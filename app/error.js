"use client";

import { useEffect } from "react";
import Link from "next/link";
import { colors } from "@/lib/colors";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      style={{ padding: "140px 0", textAlign: "center", animation: "fadeUp 0.25s ease both", minHeight: "50vh" }}
    >
      <h1 style={{ fontSize: "clamp(26px, 3.4vw, 36px)", fontWeight: 700, margin: "0 0 12px" }}>
        Something broke on this page.
      </h1>
      <p style={{ fontSize: 16, color: colors.textDimmer, maxWidth: 440, margin: "0 auto 34px" }}>
        That&apos;s on me, not you. Try again, or head back home — it&apos;s a good bet the rest of the site is fine.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" onClick={() => reset()} className="btn-primary">
          Try again →
        </button>
        <Link href="/" className="btn-secondary">
          Go home
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { colors } from "@/lib/colors";
import { HOME_PROJECTS, FACT_CHIPS, MARQUEE_ITEMS } from "@/lib/data";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <section data-screen-label="Home" style={{ animation: "fadeUp 0.6s ease both" }}>
      <div className="hero-grid" style={{ padding: "90px 0 60px", position: "relative", zIndex: 1 }}>
        <div>
          <div
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 13,
              color: colors.accent,
              marginBottom: 18,
              letterSpacing: "0.06em",
            }}
          >
            FREELANCE TECHNICAL CONSULTANT &amp; WEB SOLUTIONS ARCHITECT
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.14,
              margin: "0 0 22px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              maxWidth: 680,
            }}
          >
            Builds web products that{" "}
            <span style={{ fontStyle: "italic", color: colors.accent }}>hold up</span> at scale.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: colors.textDim, maxWidth: 540, margin: "0 0 34px" }}>
            Five-plus years shipping frontend and full-stack systems for large consumer platforms — previously
            leading engineering ventures at Acko and Bigbasket. IIIT Lucknow, B.Tech IT. Now taking on select
            freelance and consulting work.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/work" className="btn-primary">
              See my work →
            </Link>
            <Link href="/contact" className="btn-secondary">
              Say hello
            </Link>
          </div>
        </div>
        <div className="hero-portrait-wrap" style={{ animation: "floatSlow 6s ease-in-out infinite" }}>
          <ImageSlot
            src="/images/hero-portrait.webp"
            alt="Harshit Dixit portrait"
            width={280}
            height={340}
            shape="rounded"
            radius={16}
            placeholder="portrait photo"
            preload
            style={{
              border: `1px solid ${colors.borderLight}`,
              boxShadow: "0 30px 60px -20px oklch(0.06 0.02 40 / 0.6)",
              display: "block",
            }}
          />
        </div>
      </div>

      <div
        className="marquee-wrap"
        style={{
          overflow: "hidden",
          borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          padding: "16px 0",
          marginBottom: 70,
        }}
      >
        <div
          className="marquee-track"
          style={{ display: "flex", gap: 40, whiteSpace: "nowrap", animation: "marquee 22s linear infinite", width: "max-content" }}
        >
          {MARQUEE_ITEMS.map((m, i) => (
            <span key={i} style={{ fontSize: 14, letterSpacing: "0.05em", color: colors.textFaintest }}>
              {m} <span style={{ color: colors.accent }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="fact-chips"
        style={{
          gap: 1,
          background: colors.border,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 90,
        }}
      >
        {FACT_CHIPS.map((fact) => (
          <Reveal
            key={fact.label}
            delay={fact.delay}
            className="fact-chip"
            style={{ background: colors.bgCard, padding: "26px 24px" }}
          >
            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 11, color: colors.textFaint, marginBottom: 8, letterSpacing: "0.05em" }}>
              {fact.label}
            </div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{fact.value}</div>
          </Reveal>
        ))}
      </div>

      <Services />

      <div style={{ margin: "100px 0" }}>
        <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, marginBottom: 14 }}>
          {"// 01 — selected work"}
        </div>
        <div className="card-grid-2">
          {HOME_PROJECTS.map((p) => (
            <Reveal
              key={p.slotId}
              delay={p.delay}
              className="project-card"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: "hidden" }}
            >
              <Link href="/work" style={{ display: "block", color: colors.text }}>
                <ImageSlot
                  src={p.image}
                  alt={`${p.name} screenshot`}
                  fill
                  height={150}
                  placeholder="project screenshot"
                />
                <div style={{ padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <div style={{ fontSize: 19, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 11, color: p.tint }}>{p.role}</div>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.textDimmer }}>{p.tagline}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link href="/work" style={{ display: "inline-block", marginTop: 22, fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.accent }}>
          view all projects →
        </Link>
      </div>
    </section>
  );
}

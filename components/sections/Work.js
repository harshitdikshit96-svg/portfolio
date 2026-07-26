import { colors } from "@/lib/colors";
import { PROJECTS } from "@/lib/data";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";

export default function Work() {
  return (
    <section data-screen-label="Work" style={{ padding: "80px 0 40px", animation: "fadeUp 0.5s ease both" }}>
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.accent, marginBottom: 12 }}>
        {"// things I've built"}
      </div>
      <h2 style={{ fontSize: "clamp(34px, 4.4vw, 50px)", margin: "0 0 16px", fontWeight: 700, letterSpacing: "-0.02em" }}>
        Work
      </h2>
      <p style={{ fontSize: 17, color: colors.textDimmer, maxWidth: 620, margin: "0 0 50px", lineHeight: 1.65 }}>
        A mix of a startup I co-founded, freelance client builds, and things I made for fun. Public projects only —
        a couple of client and research engagements stay off this list.
      </p>
      <div className="card-grid-2">
        {PROJECTS.map((p) => (
          <Reveal
            key={p.slotId}
            delay={p.delay}
            as="a"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
            style={{
              display: "block",
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 14,
              overflow: "hidden",
              color: colors.text,
            }}
          >
            <ImageSlot
              src={p.imageLg}
              alt={`${p.name} screenshot`}
              fill
              height={200}
              placeholder="project screenshot"
            />
            <div style={{ padding: 30 }}>
              <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 11, color: p.tint, marginBottom: 14 }}>
                {p.index} · {p.role}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 18, color: colors.textFaint }}>↗</div>
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.65, color: colors.textDimmer, marginBottom: 20, minHeight: 66 }}>
                {p.tagline}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: 11,
                      padding: "5px 10px",
                      borderRadius: 6,
                      border: `1px solid ${colors.borderFaint}`,
                      color: colors.textDim,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { colors } from "@/lib/colors";
import { EXPERIENCE, SKILL_GROUPS, TALKS, SOCIAL } from "@/lib/data";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section data-screen-label="About" style={{ padding: "80px 0 40px", animation: "fadeUp 0.5s ease both" }}>
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.accent, marginBottom: 12 }}>
        {"// who I am"}
      </div>
      <h2 style={{ fontSize: "clamp(34px, 4.4vw, 50px)", margin: "0 0 22px", fontWeight: 700, letterSpacing: "-0.02em" }}>
        About
      </h2>

      <div className="about-bio-grid" style={{ marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 17.5, lineHeight: 1.8, color: colors.textMuted, maxWidth: 700, margin: "0 0 20px" }}>
            I&apos;m Harshit — a frontend-leaning software engineer out of IIIT Lucknow, five-plus years into building
            consumer-facing web products for large-scale platforms. I&apos;ve spent that time on both sides of the
            stack: React and Next.js up front, Node.js and infra underneath, with a habit of caring more than average
            about how fast a page actually feels.
          </p>
          <p style={{ fontSize: 17.5, lineHeight: 1.8, color: colors.textMuted, maxWidth: 700, margin: 0 }}>
            Right now I consult independently on web architecture and frontend performance, co-run{" "}
            <a href="https://airimation.in" target="_blank" rel="noopener noreferrer">
              Airimation
            </a>{" "}
            — a drone-swarm light-show startup — as Director, and contribute to a government-affiliated research
            initiative I keep off the public record for now.
          </p>
        </div>
        <ImageSlot
          src="/images/about-portrait.webp"
          alt="Harshit Dixit portrait"
          width={220}
          height={260}
          shape="rounded"
          radius={14}
          placeholder="portrait photo"
          style={{ display: "block" }}
        />
      </div>

      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, margin: "40px 0 20px" }}>
        {"// 02 — experience"}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 60,
          borderLeft: `1px solid ${colors.borderLight}`,
          paddingLeft: 30,
        }}
      >
        {EXPERIENCE.map((job) => (
          <Reveal key={job.company} delay={job.delay} style={{ position: "relative", paddingBottom: 34 }}>
            <span
              style={{
                position: "absolute",
                left: -35.5,
                top: 4,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: colors.accent,
                border: `2px solid ${colors.bg}`,
              }}
            />
            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 12, color: colors.textFaint, marginBottom: 6 }}>
              {job.period}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 3 }}>{job.role}</div>
            <div style={{ fontSize: 15, color: colors.accent, marginBottom: 10 }}>{job.company}</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.7, color: colors.textDimmer, maxWidth: 640 }}>{job.desc}</div>
          </Reveal>
        ))}
      </div>

      <div className="about-two-col" style={{ marginBottom: 60 }}>
        <div>
          <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, marginBottom: 18 }}>
            {"// education"}
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>IIIT Lucknow</div>
          <div style={{ fontSize: 15, color: colors.textDimmer }}>B.Tech, Information Technology — 2017 to 2021</div>
        </div>
        <div>
          <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, marginBottom: 18 }}>
            {"// talks"}
          </div>
          {TALKS.map((talk, i) => (
            <div
              key={talk.org}
              style={{
                fontSize: 15.5,
                marginBottom: i === TALKS.length - 1 ? 0 : 10,
                color: i === 0 ? colors.text : colors.textDimmer,
              }}
            >
              <span style={{ fontWeight: 600, color: colors.text }}>{talk.org}</span> — {talk.topic}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, marginBottom: 18 }}>
          {"// stack"}
        </div>
        {SKILL_GROUPS.map((grp) => (
          <Reveal
            key={grp.label}
            delay={grp.delay}
            style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 14, flexWrap: "wrap" }}
          >
            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 12, color: colors.textFaint, width: 78, flexShrink: 0 }}>
              {grp.label}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {grp.items.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: 12.5,
                    padding: "5px 11px",
                    borderRadius: 6,
                    background: colors.bgChip,
                    border: `1px solid ${colors.border}`,
                    color: colors.textChip,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <a
        href={SOCIAL.resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="dashed-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 30,
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 13,
          color: colors.textFaint,
          borderBottom: `1px dashed ${colors.borderStrong}`,
          paddingBottom: 2,
        }}
      >
        ↓ download resume (pdf)
      </a>
    </section>
  );
}

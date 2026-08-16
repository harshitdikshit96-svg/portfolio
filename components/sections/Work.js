import Link from "next/link";
import { colors } from "@/lib/colors";
import { LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";
import { getScreenshotManifest, withScreenshots } from "@/lib/screenshots";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

function ProjectCard({ p }) {
  return (
    <Reveal key={p.slug} delay={p.delay}>
      <div
        className="work-card"
        style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 14,
          overflow: "hidden",
          color: colors.text,
        }}
      >
        <div className="work-card-image-frame">
          <div className="work-card-image">
            <ImageSlot src={p.imageLg} alt={`${p.name} screenshot`} fill height={200} placeholder="project screenshot" />
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card-visit"
                aria-label={`Open the live ${p.name} site in a new tab`}
              >
                <span>Visit live site ↗</span>
              </a>
            )}
          </div>
        </div>
        <Link href={`/work/${p.slug}`} style={{ display: "block", padding: 32, color: "inherit" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 18, color: colors.textFaint }}>→</div>
          </div>
          <div style={{ fontSize: 15.5, lineHeight: 1.65, color: colors.textDimmer, marginBottom: 20, minHeight: 66 }}>
            {p.tagline}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="tag-chip"
                style={{
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
        </Link>
      </div>
    </Reveal>
  );
}

export default async function Work() {
  // Overlays auto-refreshed live-site screenshots (see
  // app/api/refresh-screenshots) over the static fallback images — no-op
  // until that pipeline is set up, since getScreenshotManifest() returns {}
  // whenever the manifest blob hasn't been uploaded yet (see lib/screenshots.js).
  const manifest = await getScreenshotManifest();
  const liveProjects = withScreenshots(LIVE_PROJECTS, manifest);
  const templateProjects = withScreenshots(TEMPLATE_PROJECTS, manifest);

  return (
    <section data-screen-label="Work" style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <div style={{ fontSize: 13, color: colors.accent, marginBottom: 12 }}>
        {"// things I've built"}
      </div>
      <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)", margin: "0 0 16px", fontWeight: 700, letterSpacing: "-0.02em" }}>
        Work
      </h1>
      <p style={{ fontSize: 17, color: colors.textDimmer, maxWidth: 620, margin: "0 0 60px", lineHeight: 1.65 }}>
        Real, live sites built for real businesses, plus capability demos that show the kind of work we can do for
        yours. Click through to any project for the full detail.
      </p>

      <div style={{ marginBottom: 80 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 8 }}>
          Live projects
        </div>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.01em" }}>
          Built and shipped for real businesses.
        </h2>
        <div className="card-grid-2">
          {liveProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 8 }}>
          Template projects
        </div>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          Capability demos — a sense of what we can build for you.
        </h2>
        <p style={{ fontSize: 15, color: colors.textDim, maxWidth: 620, margin: "0 0 24px" }}>
          Real, working builds — not paid client work — made to show a pattern (booking, ordering, a directory) that
          generalizes to your business.
        </p>
        <div className="card-grid-2">
          {templateProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>

      <CtaBand
        heading="Like what you see?"
        subtext="I take on a small number of freelance projects at a time — reach out if the timing works."
      />
    </section>
  );
}

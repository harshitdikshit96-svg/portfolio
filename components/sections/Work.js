import { colors } from "@/lib/colors";
import { LIVE_PROJECTS, TEMPLATE_PROJECTS, SITE_URL } from "@/lib/data";
import { getScreenshotManifest, withScreenshots } from "@/lib/screenshots";
import TileCarousel from "@/components/TileCarousel";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import GbpSection from "@/components/GbpSection";

// One ListItem/CreativeWork per project so both classic search and answer
// engines can extract "here are Harshit's actual projects" as structured
// entities rather than only unstructured card copy — `url` points at the
// live site when one exists, the case-study page otherwise, so every
// entry resolves to something real either way.
function projectsJsonLd(projects) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.tagline,
        url: p.url || `${SITE_URL}/work/${p.slug}`,
        creator: { "@id": `${SITE_URL}/#business` },
        keywords: p.tags.join(", "),
      },
    })),
  };
}

export default async function Work() {
  // Overlays auto-refreshed live-site screenshots (see
  // app/api/refresh-screenshots) over the static fallback images — no-op
  // until that pipeline is set up, since getScreenshotManifest() returns {}
  // whenever the manifest blob hasn't been uploaded yet (see lib/screenshots.js).
  const manifest = await getScreenshotManifest();
  const liveProjects = withScreenshots(LIVE_PROJECTS, manifest);
  const templateProjects = withScreenshots(TEMPLATE_PROJECTS, manifest);
  const allProjectsJsonLd = projectsJsonLd([...liveProjects, ...templateProjects]);

  return (
    <section data-screen-label="Work" style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(allProjectsJsonLd) }} />

      <div style={{ fontSize: 13, color: colors.accent, marginBottom: 12 }}>
        {"// things I've built"}
      </div>
      <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)", margin: "0 0 16px", fontWeight: 700, letterSpacing: "-0.02em" }}>
        Work
      </h1>
      <p style={{ fontSize: 17, color: colors.textDimmer, maxWidth: 640, margin: "0 0 60px", lineHeight: 1.65 }}>
        Real, live websites built for real businesses — plus capability demos that show what a Next.js and React
        developer based in Lucknow can build for yours. Click through any project for the full case study.
      </p>

      <div style={{ marginBottom: 80 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 8 }}>
          Live projects
        </div>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          Built and shipped for real businesses.
        </h2>
        <p style={{ fontSize: 15, color: colors.textDim, maxWidth: 640, margin: "0 0 28px" }}>
          Production sites, currently live for paying clients — never a template mockup passed off as client work.
        </p>
        <TileCarousel label="live projects">
          {liveProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </TileCarousel>
      </div>

      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 8 }}>
          Template projects
        </div>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          Capability demos — a sense of what we can build for you.
        </h2>
        <p style={{ fontSize: 15, color: colors.textDim, maxWidth: 640, margin: "0 0 28px" }}>
          Real, working builds — not paid client work — made to show a pattern (booking, ordering, a directory) that
          generalizes to your business.
        </p>
        <TileCarousel label="template projects">
          {templateProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </TileCarousel>
      </div>

      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 8 }}>
          Reviews
        </div>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          Don&apos;t just take the screenshots&apos; word for it.
        </h2>
        <p style={{ fontSize: 15, color: colors.textDim, maxWidth: 620, margin: "0 0 24px" }}>
          No cherry-picked quotes here — real, verifiable reviews live on the Google Business Profile below. Read
          them there, or leave one yourself if we&apos;ve worked together.
        </p>
        <GbpSection />
      </div>

      <CtaBand
        heading="Like what you see?"
        subtext="I take on a small number of freelance projects at a time — reach out if the timing works."
      />
    </section>
  );
}

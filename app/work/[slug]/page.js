import { notFound } from "next/navigation";
import Link from "next/link";
import { colors } from "@/lib/colors";
import { LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";
import { ALL_LANDINGS } from "@/lib/landings";
import { POSTS } from "@/lib/blog";
import { getScreenshotManifest, withScreenshot } from "@/lib/screenshots";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import ImageSlot from "@/components/ImageSlot";
import CtaBand from "@/components/CtaBand";
import TrackContentView from "@/components/TrackContentView";
import JsonLd from "@/components/JsonLd";

const ALL_PROJECTS = [...LIVE_PROJECTS, ...TEMPLATE_PROJECTS];

// Case-study sections, in reading order. Projects with a `story` in
// lib/data.js render these; the rest fall back to the one-paragraph detail.
const STORY_SECTIONS = [
  ["brief", "The brief"],
  ["challenge", "What made it hard"],
  ["approach", "How it was built"],
  ["timeline", "Timeline"],
  ["outcome", "The outcome"],
];

function findProject(slug) {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — Case Study`,
    // Separate, snippet-length copy where the visible tagline runs past
    // what a search result shows.
    description: project.metaDescription || project.tagline,
    path: `/work/${project.slug}`,
    image: project.imageLg,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const rawProject = findProject(slug);
  if (!rawProject) notFound();

  const manifest = await getScreenshotManifest();
  const project = withScreenshot(rawProject, manifest);

  const isLive = LIVE_PROJECTS.some((p) => p.slug === project.slug);
  // Service pages that cite this project as proof — linked back from here,
  // so the case study and the page selling that service reinforce each
  // other instead of the link running one way only.
  const relatedServices = ALL_LANDINGS.filter((l) => l.proofSlugs.includes(project.slug));
  const storyPosts = POSTS.filter((p) => (p.projects || []).includes(project.slug));

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.name, path: `/work/${project.slug}` },
  ]);

  return (
    <section data-screen-label={project.name} style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <JsonLd schema={breadcrumbs} />
      <TrackContentView contentType="case_study" itemId={project.slug} />

      <Link href="/work" className="dashed-link" style={{ fontSize: 13, color: colors.accent, marginBottom: 20, display: "inline-block" }}>
        ← Back to work
      </Link>

      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.accentDeep, marginBottom: 10 }}>
        {isLive ? "Live project" : "Template project"} · {project.status}
      </div>
      <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", margin: "0 0 14px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 760 }}>
        {project.name}
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: colors.textDim, maxWidth: 660, margin: "0 0 28px" }}>
        {project.tagline}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="tag-chip"
            style={{ fontSize: 12, padding: "6px 12px", borderRadius: 6, border: `1px solid ${colors.borderFaint}`, color: colors.textDim }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: 14,
          marginBottom: 32,
        }}
      >
        <ImageSlot
          src={project.imageLg}
          alt={`${project.name} screenshot`}
          fill
          height={420}
          shape="rounded"
          radius={10}
          placeholder="project screenshot"
        />
      </div>

      {project.story ? (
        STORY_SECTIONS.filter(([key]) => project.story[key]).map(([key, heading]) => (
          <div key={key} style={{ maxWidth: 700, marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{heading}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: colors.textDimmer, margin: 0 }}>{project.story[key]}</p>
          </div>
        ))
      ) : (
        <div style={{ maxWidth: 700, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>What was built</h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: colors.textDimmer }}>{project.detail}</p>
        </div>
      )}

      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          gap: "8px 24px",
          maxWidth: 700,
          margin: "0 0 32px",
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        <dt style={{ color: colors.textFaint }}>Role</dt>
        <dd style={{ margin: 0, color: colors.textDimmer }}>{project.role}</dd>
        <dt style={{ color: colors.textFaint }}>Stack</dt>
        <dd style={{ margin: 0, color: colors.textDimmer }}>{project.tags.join(", ")}</dd>
        <dt style={{ color: colors.textFaint }}>Status</dt>
        <dd style={{ margin: 0, color: colors.textDimmer }}>{project.status}</dd>
      </dl>

      {storyPosts.map((p) => (
        <p key={p.slug} style={{ maxWidth: 700, margin: "0 0 32px", fontSize: 15.5, lineHeight: 1.7 }}>
          <span style={{ color: colors.textFaint }}>The story behind this build: </span>
          <Link href={`/blog/${p.slug}`}>{p.title}</Link>
        </p>
      ))}

      {relatedServices.length > 0 && (
        <div style={{ maxWidth: 700, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Related services</h2>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {relatedServices.map((l) => (
              <li key={l.slug} style={{ fontSize: 15.5 }}>
                <Link href={`/${l.slug}`}>{l.h1}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-block" }}>
          Visit the live site →
        </a>
      ) : (
        <p style={{ fontSize: 13.5, color: colors.textFaintest, fontStyle: "italic" }}>
          {isLive ? "No public production URL yet." : "A concept build, not deployed as a live client site."}
        </p>
      )}

      <CtaBand
        heading="Want something like this?"
        subtext="I take on a small number of freelance projects at a time — reach out if the timing works."
      />
    </section>
  );
}

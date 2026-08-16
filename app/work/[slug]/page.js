import { notFound } from "next/navigation";
import Link from "next/link";
import { colors } from "@/lib/colors";
import { LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";
import { getScreenshotManifest, withScreenshot } from "@/lib/screenshots";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import ImageSlot from "@/components/ImageSlot";
import CtaBand from "@/components/CtaBand";

const ALL_PROJECTS = [...LIVE_PROJECTS, ...TEMPLATE_PROJECTS];

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
    description: project.tagline,
    path: `/work/${project.slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const rawProject = findProject(slug);
  if (!rawProject) notFound();

  const manifest = await getScreenshotManifest();
  const project = withScreenshot(rawProject, manifest);

  const isLive = LIVE_PROJECTS.some((p) => p.slug === project.slug);

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.name, path: `/work/${project.slug}` },
  ]);

  return (
    <section data-screen-label={project.name} style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

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

      <div style={{ maxWidth: 700, marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>What was built</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.75, color: colors.textDimmer }}>{project.detail}</p>
      </div>

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

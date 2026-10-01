import Link from "next/link";
import { colors } from "@/lib/colors";
import { POSTS, formatPostDate } from "@/lib/blog";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

// Indexable now that there are real posts. It was noindexed, and kept out
// of the sitemap, while it was an empty "coming soon" page.
export const metadata = pageMetadata({
  title: "Engineering Blog — Next.js, React, Node.js",
  description:
    "Practical engineering guides on Next.js performance and SEO, React, Node.js and PostgreSQL, from a freelance full-stack engineer (ex-Acko, ex-Bigbasket).",
  path: "/blog",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

export default function Page() {
  return (
    <section data-screen-label="Blog" style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <JsonLd schema={breadcrumbs} />
      <div style={{ fontSize: 13, color: colors.accent, marginBottom: 12 }}>{"// notes from production"}</div>
      <h1 style={{ fontSize: "clamp(32px, 4.4vw, 48px)", margin: "0 0 18px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 760 }}>
        Engineering guides: Next.js, React, Node.js and PostgreSQL
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.75, color: colors.textDim, maxWidth: 660, margin: "0 0 48px" }}>
        Practical write-ups on the problems that come up again and again in real web products — slow pages, sites
        that don&apos;t rank, memory leaks, tangled state and slow queries. Each one is written to be worked through,
        not skimmed.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 56, maxWidth: 820 }}>
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: "block",
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "24px 28px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h2 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>{post.title}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: colors.textDimmer, margin: "0 0 12px" }}>{post.description}</p>
            <span style={{ fontSize: 13, color: colors.textFaint }}>
              <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time> · {post.readingMinutes} min read
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

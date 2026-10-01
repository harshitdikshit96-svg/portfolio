import { notFound } from "next/navigation";
import Link from "next/link";
import { colors } from "@/lib/colors";
import { POSTS, findPost, formatPostDate } from "@/lib/blog";
import { findLanding } from "@/lib/landings";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { blogPostingSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ConsultationCta from "@/components/ConsultationCta";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

// Only the posts listed in lib/blog are real; anything else is a 404, not
// an on-demand render of an empty page.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const metadata = pageMetadata({
    title: post.metaTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified || post.datePublished,
      authors: ["Harshit Dixit"],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const { Body } = post;
  const landing = post.relatedLanding ? findLanding(post.relatedLanding) : null;
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article data-screen-label={post.title} style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <JsonLd
        schema={[
          blogPostingSchema(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <Link href="/blog" className="dashed-link" style={{ fontSize: 13, color: colors.accent, marginBottom: 20, display: "inline-block" }}>
        ← All posts
      </Link>

      <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", margin: "0 0 16px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 820, lineHeight: 1.12 }}>
        {post.title}
      </h1>
      <p style={{ fontSize: 14, color: colors.textFaint, margin: "0 0 40px" }}>
        By{" "}
        <Link href="/about" style={{ color: colors.textDim }}>
          Harshit Dixit
        </Link>{" "}
        · <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
        {post.dateModified && post.dateModified !== post.datePublished && (
          <>
            {" "}
            · updated <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time>
          </>
        )}{" "}
        · {post.readingMinutes} min read
      </p>

      <div className="post-body">
        <Body />
      </div>

      {/* Author box — who wrote this and why they're qualified to, which is
          what a reader (and a quality rater) checks on a technical post. */}
      <aside
        style={{
          maxWidth: "70ch",
          margin: "56px 0",
          padding: "22px 26px",
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          fontSize: 15,
          lineHeight: 1.7,
          color: colors.textDimmer,
        }}
      >
        <div style={{ fontWeight: 600, color: colors.text, marginBottom: 6 }}>About the author</div>
        Harshit Dixit is a freelance full-stack engineer based in Lucknow. He spent five years building consumer web
        products at Bigbasket and Acko — checkout performance, real-time pricing and a distributed policy-issuance
        engine — and now works with startups and businesses across India.{" "}
        <Link href="/about">More about Harshit</Link>
        {landing && (
          <>
            {" "}
            · <Link href={`/${landing.slug}`}>{landing.navLabel}</Link>
          </>
        )}
      </aside>

      {others.length > 0 && (
        <nav aria-label="More posts" style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(20px,2.2vw,24px)", fontWeight: 700, margin: "0 0 16px" }}>Keep reading</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{
                  display: "block",
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  padding: "18px 22px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{p.title}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      <ConsultationCta />
    </article>
  );
}

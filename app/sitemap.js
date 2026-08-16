import { SITE_URL, LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";

const siteUrl = SITE_URL;

// /blog is deliberately left out: it has zero real posts, and an empty blog
// route in the sitemap dilutes crawl budget and reads as an abandoned
// section to search engines. The page itself still exists and is reachable
// (marked "SOON" in nav) — it's just not asking to be indexed until there
// are at least a few real posts on it.
const routes = ["", "/packages", "/services", "/work", "/about", "/contact"];

// Every case-study page (/work/<slug>) is a real, statically generated page
// with its own unique title/description/content — these were missing from
// the sitemap even though they're linked from /work and individually
// indexable, which is exactly the kind of deep page a sitemap exists to
// surface. Slugs pulled from the same data every /work/[slug] page renders
// from, so this can't drift out of sync with the actual route list.
const workSlugs = [...LIVE_PROJECTS, ...TEMPLATE_PROJECTS].map((p) => p.slug);

// No `lastModified` field: stamping every route with `new Date()` on every
// build claims the content changed on every deploy, which Google's own
// guidance says is worse than omitting the field — it can train a crawler
// to stop trusting the signal entirely.
export default function sitemap() {
  const topLevel = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
  }));
  const caseStudies = workSlugs.map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...topLevel, ...caseStudies];
}

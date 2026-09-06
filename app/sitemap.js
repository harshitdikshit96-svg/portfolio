import { SITE_URL, LIVE_PROJECTS, TEMPLATE_PROJECTS, LOCAL_LANDINGS } from "@/lib/data";

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

// The four keyword-targeted local landing pages (/digital-marketing-lucknow
// and friends). These are the pages the Google Ads ad groups point at, so
// they need to be crawlable and indexable in their own right — a paid
// landing page that only exists for ad traffic wastes the organic half of
// the same search demand.
const landingSlugs = LOCAL_LANDINGS.map((l) => l.slug);

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
  const landings = landingSlugs.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));
  return [...topLevel, ...landings, ...caseStudies];
}

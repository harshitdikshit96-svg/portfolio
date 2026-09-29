import { SITE_URL, LIVE_PROJECTS, TEMPLATE_PROJECTS, LOCAL_LANDINGS } from "@/lib/data";

/**
 * Sitemap. Every entry is derived from the same data the routes render
 * from, so the file cannot list a URL that no longer exists — a sitemap
 * that points at 404s is worse than no sitemap, because it trains a crawler
 * to distrust the whole file.
 *
 * That is also why NATIONAL_LANDINGS below is empty rather than
 * pre-populated: the pan-India pages are planned, not built. The moment a
 * route exists, add its slug there and it flows in.
 *
 * /blog is deliberately left out: it has zero real posts, and an empty blog
 * route dilutes crawl budget and reads as an abandoned section. The page
 * still exists and is reachable (marked "SOON" in nav) — it just isn't
 * asking to be indexed until there are real posts on it.
 *
 * /admin and /admin/login are out for the obvious reason, and are also
 * noindex'd at the page level and disallowed in robots.js.
 */

const CORE_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/packages", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
];

// Local, city-qualified pages. These are where the Google Ads ad groups
// land, so they have to be independently crawlable — a paid landing page
// that only exists for ad traffic throws away the organic half of the same
// search demand. Priority sits just under the homepage for that reason.
const localLandingRoutes = LOCAL_LANDINGS.map((landing) => ({
  path: `/${landing.slug}`,
  priority: 0.9,
  changeFrequency: "monthly",
}));

// Pan-India pages. INTENTIONALLY EMPTY — none of these routes exist yet.
// Listing them now would put three 404s in the sitemap. Planned slugs:
//   hire-full-stack-developer-india
//   nextjs-development-company-india
//   mvp-development-startups-india
// Add each one here only once app/<slug>/page.js is live.
const NATIONAL_LANDING_SLUGS = [];

const nationalLandingRoutes = NATIONAL_LANDING_SLUGS.map((slug) => ({
  path: `/${slug}`,
  priority: 0.9,
  changeFrequency: "monthly",
}));

// Case studies. Real, statically generated pages with unique content, and
// exactly the kind of deep page a sitemap exists to surface. Slugs come
// from the same data /work/[slug] generates from, so they can't drift.
const caseStudyRoutes = [...LIVE_PROJECTS, ...TEMPLATE_PROJECTS].map((project) => ({
  path: `/work/${project.slug}`,
  priority: 0.6,
  changeFrequency: "monthly",
}));

/**
 * No `lastModified`. Stamping every route with `new Date()` on each build
 * claims the content changed on every deploy; Google's own guidance is that
 * an untrustworthy lastmod is worse than none, because the crawler stops
 * believing the signal. If real per-page modification dates ever exist
 * (from the CMS, or git), set it from those and not from build time.
 */
export default function sitemap() {
  return [
    ...CORE_ROUTES,
    ...localLandingRoutes,
    ...nationalLandingRoutes,
    ...caseStudyRoutes,
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}

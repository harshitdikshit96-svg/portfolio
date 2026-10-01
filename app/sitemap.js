import { SITE_URL, LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";
import { LOCAL_LANDINGS, NATIONAL_LANDINGS } from "@/lib/landings";
import { POSTS } from "@/lib/blog";

/**
 * Sitemap. Every entry is derived from the same data the routes render
 * from, so the file cannot list a URL that no longer exists — a sitemap
 * that points at 404s is worse than no sitemap, because it trains a crawler
 * to distrust the whole file. A new landing page (lib/landings.js) or post
 * (lib/blog) flows in here with no edit to this file.
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
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
];

// Keyword-targeted landing pages, local and national. These are also where
// the Google Ads ad groups land, so they have to be independently crawlable
// — a paid landing page that only exists for ad traffic throws away the
// organic half of the same search demand. Priority sits just under the
// homepage for that reason.
const landingRoutes = [...LOCAL_LANDINGS, ...NATIONAL_LANDINGS].map((landing) => ({
  path: `/${landing.slug}`,
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

// Posts are the one place real modification dates exist — each post
// carries its own datePublished / dateModified — so they are the one place
// lastModified is set.
const postRoutes = POSTS.map((post) => ({
  path: `/blog/${post.slug}`,
  priority: 0.6,
  changeFrequency: "monthly",
  lastModified: post.dateModified || post.datePublished,
}));

/**
 * No `lastModified` on anything but posts. Stamping every route with
 * `new Date()` on each build claims the content changed on every deploy;
 * Google's own guidance is that an untrustworthy lastmod is worse than
 * none, because the crawler stops believing the signal.
 */
export default function sitemap() {
  return [...CORE_ROUTES, ...landingRoutes, ...caseStudyRoutes, ...postRoutes].map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
      ...(lastModified ? { lastModified } : {}),
    })
  );
}

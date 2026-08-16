import { SITE_URL } from "@/lib/data";

const siteUrl = SITE_URL;

// /blog is deliberately left out: it has zero real posts, and an empty blog
// route in the sitemap dilutes crawl budget and reads as an abandoned
// section to search engines. The page itself still exists and is reachable
// (marked "SOON" in nav) — it's just not asking to be indexed until there
// are at least a few real posts on it.
const routes = ["", "/packages", "/services", "/work", "/about", "/contact"];

// No `lastModified` field: stamping every route with `new Date()` on every
// build claims the content changed on every deploy, which Google's own
// guidance says is worse than omitting the field — it can train a crawler
// to stop trusting the signal entirely.
export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
  }));
}

const siteUrl = "https://www.harshitcreates.in";

const routes = ["", "/work", "/about", "/contact", "/blog"];

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

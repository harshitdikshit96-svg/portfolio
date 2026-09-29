import { SITE_URL } from "@/lib/data";

/**
 * robots.txt.
 *
 * The disallows are defence in depth, not the primary control: /admin and
 * /admin/login already carry `robots: { index: false, follow: false }` in
 * their page metadata. But a meta tag only works once the crawler has
 * fetched the page, so it spends crawl budget and briefly exposes the route
 * in logs either way. Disallowing here stops the fetch happening at all.
 *
 * Note the division of labour, because getting it backwards is a classic
 * way to leak a page into the index: robots.txt controls CRAWLING, the meta
 * tag controls INDEXING. A URL that is disallowed here can still be indexed
 * (without a snippet) if something links to it, since the crawler never
 * reads the noindex. Keeping BOTH is what actually holds.
 *
 * /api/* is disallowed because those routes return JSON and errors, never
 * anything a search result should show. Next's own build artefacts under
 * /_next/ are excluded for the same reason — with `/_next/static/` and
 * `/_next/image` re-allowed, because Google needs the CSS, JS and images to
 * render the page for Core Web Vitals assessment. Blocking those makes
 * pages fail mobile-friendly and CWV checks.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image"],
        disallow: ["/admin", "/admin/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

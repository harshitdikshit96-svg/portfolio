import { SITE_URL } from "@/lib/data";

// Shared brand suffix — matches the `title.template` in app/layout.js
// ("%s — harshitcreates"). That template only affects the <title> tag, not
// og:title, so pages that want the two to read the same need to apply it
// themselves when building their `openGraph.title`.
const BRAND_SUFFIX = " — harshitcreates";

/**
 * Builds the full per-page metadata object (title, description, canonical,
 * Open Graph) so every leaf route gets a self-referencing og:url instead of
 * silently inheriting the homepage's from app/layout.js. `path` is the
 * route's path (e.g. "/services"), `title`/`description` are the raw
 * (un-templated) strings.
 */
export function pageMetadata({ title, description, path, type = "website" }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title}${BRAND_SUFFIX}`,
      description,
      type,
      url,
    },
  };
}

/**
 * BreadcrumbList JSON-LD for any route below the top level. `items` is an
 * ordered array of `{ name, path }`, starting with Home. Render the result
 * via a `<script type="application/ld+json">` tag, same pattern as
 * FaqSection.js's FAQPage block.
 */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

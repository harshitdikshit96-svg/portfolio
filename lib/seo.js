import { SITE_URL, ROLE_TAGLINE } from "@/lib/data";

// Shared brand suffix — matches the `title.template` in app/layout.js
// ("%s — harshitcreates"). That template only affects the <title> tag, not
// og:title, so pages that want the two to read the same need to apply it
// themselves when building their `openGraph.title`.
const BRAND_SUFFIX = " — harshitcreates";

// Next.js metadata merging is shallow *per top-level key*: a route segment
// that sets its own `openGraph` or `twitter` object replaces the parent's
// whole object, not just the fields it specifies (confirmed against
// node_modules/next/dist/docs/.../generate-metadata.md's "Overwriting
// fields" example, and verified live — curling /about and /work/airimation
// showed zero og:image/twitter:image tags before this fix, vs. the
// homepage which inherits app/layout.js's openGraph untouched and renders
// the image fine). Every page below calls pageMetadata(), which sets its
// own `openGraph`, so every one of them was silently dropping the shared
// image that app/opengraph-image.js generates. Pulling the image out into
// its own object and re-spreading it into every call is the fix the Next
// docs themselves recommend for this exact gotcha.
const sharedOgImage = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `Harshit Dixit — ${ROLE_TAGLINE}`,
};

/**
 * Builds the full per-page metadata object (title, description, canonical,
 * Open Graph, Twitter Card) so every leaf route gets a self-referencing
 * og:url and its own share-card image/title instead of silently inheriting
 * (or blanking out) the homepage's. `path` is the route's path (e.g.
 * "/services"), `title`/`description` are the raw (un-templated) strings.
 */
export function pageMetadata({ title, description, path, type = "website" }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title}${BRAND_SUFFIX}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      type,
      url,
      images: [sharedOgImage],
    },
    // `card` has to be repeated here (not just title/description) because
    // setting `twitter` at all replaces app/layout.js's whole twitter
    // object — omitting it would silently drop back to Twitter's default
    // card type instead of the large-image card the rest of the site uses.
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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

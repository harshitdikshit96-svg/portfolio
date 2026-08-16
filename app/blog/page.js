import Blog from "@/components/sections/Blog";

export const metadata = {
  title: "Blog",
  description: "Notes on frontend performance, systems, and building on the side — coming soon from Harshit Dixit.",
  alternates: { canonical: "/blog" },
  // No real posts yet — kept out of sitemap.js and out of the indexable set
  // until there's actual content, rather than asking Google to rank an
  // empty page.
  robots: { index: false, follow: true },
  // Doesn't set `openGraph` at all, so it correctly inherits app/layout.js's
  // whole openGraph object (image included — see lib/seo.js's comment on
  // why that inheritance breaks the moment a page sets its own openGraph).
  // `twitter` still needs its own title/description, though, or a shared
  // link to this page shows the homepage's Twitter Card text instead of
  // "Blog" — low priority since the page is noindexed with no real content
  // yet, but a one-line fix while touching every other page's version of
  // this same gap.
  twitter: {
    card: "summary_large_image",
    title: "Blog — harshitcreates",
    description: "Notes on frontend performance, systems, and building on the side — coming soon from Harshit Dixit.",
  },
};

export default function Page() {
  return <Blog />;
}

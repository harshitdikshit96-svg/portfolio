import Blog from "@/components/sections/Blog";

export const metadata = {
  title: "Blog",
  description: "Notes on frontend performance, systems, and building on the side — coming soon from Harshit Dixit.",
  alternates: { canonical: "/blog" },
  // No real posts yet — kept out of sitemap.js and out of the indexable set
  // until there's actual content, rather than asking Google to rank an
  // empty page.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <Blog />;
}

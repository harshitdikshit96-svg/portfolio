import { SITE_URL, SOCIAL, LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";
import { LOCAL_LANDINGS, NATIONAL_LANDINGS } from "@/lib/landings";
import { POSTS } from "@/lib/blog";

/**
 * /llms.txt — a plain-Markdown map of the site for AI assistants and answer
 * engines (the llmstxt.org convention). Google Search ignores it; it costs
 * nothing and gives tools that do read it a clean summary instead of a
 * scrape of the nav and footer.
 *
 * Generated from the same data as the pages and sitemap, so it can't list a
 * page that doesn't exist or miss a new one. Built once at build time.
 */
export const dynamic = "force-static";

const line = (path, label, note) => `- [${label}](${SITE_URL}${path})${note ? `: ${note}` : ""}`;

export function GET() {
  const body = [
    "# harshitcreates — Harshit Dixit",
    "",
    "> Freelance website and software developer based in Lucknow, India. Five years of production engineering at Bigbasket and Acko. Builds websites, e-commerce stores and custom software for Lucknow businesses, and works remotely with startups and teams across India on full-stack development (React, Next.js, Node.js, PostgreSQL), MVPs, technical SEO and fractional CTO work.",
    "",
    `Contact: ${SOCIAL.email} · [Contact page](${SITE_URL}/contact)`,
    "",
    "## Services in Lucknow",
    ...LOCAL_LANDINGS.map((l) => line(`/${l.slug}`, l.h1, l.metaDescription)),
    "",
    "## Services across India",
    ...NATIONAL_LANDINGS.map((l) => line(`/${l.slug}`, l.h1, l.metaDescription)),
    "",
    "## Case studies",
    ...[...LIVE_PROJECTS, ...TEMPLATE_PROJECTS].map((p) => line(`/work/${p.slug}`, p.name, p.tagline)),
    "",
    "## Engineering guides",
    ...POSTS.map((p) => line(`/blog/${p.slug}`, p.title, p.description)),
    "",
    "## About",
    line("/about", "About Harshit Dixit", "background, experience, education and talks"),
    line("/packages", "Website packages", "what each website tier includes"),
    line("/services", "All services", "every service explained in plain language"),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

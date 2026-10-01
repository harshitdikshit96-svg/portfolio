import * as fixCoreWebVitalsNextjs from "./posts/fix-core-web-vitals-nextjs";
import * as nextjsAppRouterSeo from "./posts/nextjs-app-router-seo";
import * as nodejsMemoryLeakDebugging from "./posts/nodejs-memory-leak-debugging";
import * as reactStateManagement from "./posts/react-state-management-best-practices";
import * as optimizePostgresql from "./posts/optimize-postgresql-query-performance";
import * as smallBuilds from "./posts/small-builds-real-problems";

/**
 * Every published post. Each module in ./posts exports `meta` and a default
 * component for the body — plain JSX rather than MDX, so posts need no
 * extra build tooling and can link with next/link like any other page.
 *
 * To publish a post: add its module to this list. The blog index,
 * /blog/[slug], the sitemap and the BlogPosting JSON-LD all read from here,
 * so nothing else needs touching.
 *
 * `dateModified` is only set when a post's content has actually changed —
 * it flows into the sitemap's lastmod and the article markup, and a date
 * that moves without the content moving teaches Google to ignore it.
 */
const MODULES = [
  smallBuilds,
  fixCoreWebVitalsNextjs,
  nextjsAppRouterSeo,
  optimizePostgresql,
  reactStateManagement,
  nodejsMemoryLeakDebugging,
];

export const POSTS = MODULES.map((mod) => ({ ...mod.meta, Body: mod.default })).sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

export function findPost(slug) {
  return POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

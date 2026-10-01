import Link from "next/link";

export const meta = {
  slug: "nextjs-app-router-seo",
  title: "Next.js App Router SEO: A Complete Checklist",
  metaTitle: "Next.js App Router SEO Checklist",
  description:
    "What decides whether a Next.js App Router site ranks: rendering, the Metadata API and its merge gotcha, sitemaps, canonicals, structured data and 404s.",
  keyword: "nextjs app router seo optimization",
  keywords: ["nextjs app router seo", "nextjs seo", "nextjs metadata api", "nextjs structured data", "nextjs sitemap"],
  datePublished: "2026-09-30",
  readingMinutes: 12,
  relatedLanding: "nextjs-development-company-india",
};

export default function Post() {
  return (
    <>
      <p>
        Next.js gives you everything you need to build a site that ranks well, and almost as many ways to quietly
        undo it. Most App Router SEO problems don&apos;t come from a missing feature. They come from a default
        that behaves differently from what you assumed — metadata that doesn&apos;t merge the way you&apos;d
        expect, a route that went dynamic without anyone noticing, a 404 page that returns 200.
      </p>
      <p>
        This is the checklist I work through on every Next.js site, roughly in order of how much damage each item
        does when it&apos;s wrong.
      </p>

      <h2>1. Make sure the content is in the HTML</h2>
      <p>
        Google renders JavaScript, but it does so in a second pass that can lag behind crawling, and other search
        engines and most AI crawlers don&apos;t render at all. The safe rule is that anything you want indexed —
        body text, headings, internal links, structured data — should be in the HTML the server sends.
      </p>
      <p>
        The App Router makes this the default: Server Components render on the server, and Client Components{" "}
        <em>also</em> render to HTML on the server before hydrating. The trouble starts with patterns that only
        produce content in the browser:
      </p>
      <ul>
        <li>
          Data fetched in a <code>useEffect</code> — the server HTML contains only the loading state.
        </li>
        <li>
          Components wrapped in <code>dynamic(() =&gt; import(...), {"{ ssr: false }"})</code>.
        </li>
        <li>Content that renders only after checking <code>window</code> or a media query in JavaScript.</li>
        <li>Tabs and accordions that don&apos;t render hidden panels at all until clicked.</li>
      </ul>
      <p>
        The quickest check is <code>curl</code>: fetch the page and search the raw HTML for a sentence from the
        body. If it isn&apos;t there, neither is it for any crawler that doesn&apos;t run JavaScript.
      </p>
      <pre>
        <code>{`curl -s https://example.com/services | grep -c "a sentence from your page"`}</code>
      </pre>

      <h2>2. Know which routes are static</h2>
      <p>
        A static route is pre-rendered at build time and served from the CDN — fast TTFB, fast LCP, and
        identical HTML for every crawler. Calling <code>cookies()</code>, <code>headers()</code>, reading{" "}
        <code>searchParams</code>, or making an uncached fetch opts the route into rendering per request. That&apos;s
        sometimes necessary, but it&apos;s often accidental — one analytics helper that reads a cookie inside the
        root layout can make the entire site dynamic.
      </p>
      <p>
        Check the route table printed by <code>next build</code> after every significant change. For dynamic
        segments like <code>/blog/[slug]</code>, return every known slug from <code>generateStaticParams</code> so
        they are pre-rendered, and set <code>export const dynamicParams = false</code> if unknown slugs should 404
        rather than render on demand.
      </p>

      <h2>3. Metadata: titles, descriptions and the merge gotcha</h2>
      <p>
        Set a <code>metadataBase</code> and a title template once in the root layout:
      </p>
      <pre>
        <code>{`// app/layout.js
export const metadata = {
  metadataBase: new URL("https://www.example.com"),
  title: {
    default: "Example — Web Development",
    template: "%s — Example",
  },
  description: "…",
};`}</code>
      </pre>
      <p>
        Each page then exports its own <code>metadata</code> (or <code>generateMetadata</code> for dynamic routes)
        with a short, unique <code>title</code> — the template adds the brand suffix. Keep the full title under
        about 60 characters and the description under about 155, or Google truncates them.
      </p>
      <p>
        Now the gotcha that catches almost everyone: <strong>metadata merges shallowly, per top-level key.</strong>{" "}
        If the root layout sets <code>openGraph</code> with an image, and a page sets its own{" "}
        <code>openGraph</code> with just a title, the page&apos;s object <em>replaces</em> the layout&apos;s — and
        the image is gone. The page has no <code>og:image</code> at all, and nothing warns you. The same applies to{" "}
        <code>twitter</code>.
      </p>
      <p>
        I found exactly this on this site: every page except the homepage was shipping without a share image
        because each one set its own <code>openGraph</code> title. The fix is to build page metadata through one
        helper that always includes the shared fields:
      </p>
      <pre>
        <code>{`// lib/seo.js
const ogImage = { url: "/opengraph-image", width: 1200, height: 630 };

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description },
  };
}`}</code>
      </pre>

      <h3>Streaming metadata</h3>
      <p>
        Since Next.js 15.2, <code>generateMetadata</code> can stream: for a route rendered at request time, the
        page&apos;s UI is sent first and the metadata tags are appended when they resolve. Googlebot executes
        JavaScript and reads them correctly; for “HTML-limited” bots such as social media link-preview crawlers,
        Next.js detects the user agent and blocks on metadata so it lands in the <code>&lt;head&gt;</code> as
        usual. You can widen that list with the <code>htmlLimitedBots</code> option if a crawler you care about
        isn&apos;t on it.
      </p>

      <h2>4. Canonical URLs</h2>
      <p>
        Every indexable page should declare its canonical URL, and it should be the exact URL you want in search
        results — same protocol, same host, same trailing-slash policy as your redirects. With a{" "}
        <code>metadataBase</code> set, a relative path is enough:
      </p>
      <pre>
        <code>{`export const metadata = {
  alternates: { canonical: "/services" },
};`}</code>
      </pre>
      <p>
        Watch for pages reachable at several URLs — with and without query parameters, with and without{" "}
        <code>www</code>, filtered listing pages — and make sure they all point to one canonical. Redirect the
        non-canonical host at the platform level (Vercel&apos;s domain settings do this) rather than in
        application code.
      </p>

      <h2>5. Sitemap and robots.txt, generated from your data</h2>
      <p>
        <code>app/sitemap.js</code> and <code>app/robots.js</code> generate both files at build time. The key is to
        generate the sitemap from the same data your routes render from, so it can never list a page that
        doesn&apos;t exist:
      </p>
      <pre>
        <code>{`// app/sitemap.js
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/blog";

export default function sitemap() {
  return [
    { url: SITE_URL, priority: 1 },
    { url: \`\${SITE_URL}/blog\`, priority: 0.7 },
    ...POSTS.map((post) => ({
      url: \`\${SITE_URL}/blog/\${post.slug}\`,
      lastModified: post.dateModified || post.datePublished,
    })),
  ];
}`}</code>
      </pre>
      <p>
        Leave out <code>lastModified</code> unless you have a real date. Setting it to <code>new Date()</code> on
        every build tells Google every page changed on every deploy, and Google&apos;s guidance is that it stops
        trusting a <code>lastmod</code> that is consistently inaccurate.
      </p>
      <h3>Sitemaps for large sites</h3>
      <p>
        A single sitemap file is capped at 50,000 URLs. At Bigbasket the catalogue ran past 500,000 product URLs,
        and regenerating the sitemaps took three hours; automating the build as a scheduled cron job brought that
        down to eight minutes and improved crawl efficiency by about 15%.
        Fresh, accurate sitemaps on a schedule matter more on a big catalogue than almost anything else in this
        list.
      </p>
      <p>
        In the App Router, <code>generateSitemaps</code> does the splitting for you: return one id per file, and
        the <code>sitemap</code> function receives that id (as a promise, in Next.js 16) to build each chunk.
      </p>
      <pre>
        <code>{`// app/product/sitemap.js
const PER_FILE = 50_000;

export async function generateSitemaps() {
  const total = await countProducts();
  return Array.from({ length: Math.ceil(total / PER_FILE) }, (_, id) => ({ id }));
}

export default async function sitemap({ id }) {
  const page = Number(await id);
  const products = await getProducts({ offset: page * PER_FILE, limit: PER_FILE });
  return products.map((p) => ({
    url: \`https://www.example.com/product/\${p.slug}\`,
    lastModified: p.updatedAt,
  }));
}`}</code>
      </pre>
      <p>
        In <code>robots.js</code>, don&apos;t disallow <code>/_next/static/</code> — Google needs your CSS and
        JavaScript to render the page. Remember too that robots.txt controls crawling, not indexing: to keep a page
        out of results, use <code>robots: {"{ index: false }"}</code> in its metadata, and don&apos;t also block it
        in robots.txt, or Google never sees the noindex.
      </p>

      <h2>6. Status codes that tell the truth</h2>
      <ul>
        <li>
          Call <code>notFound()</code> when a dynamic route&apos;s data doesn&apos;t exist, so the response is a real
          404 and not a 200 with “not found” text on it (a “soft 404”).
        </li>
        <li>
          Use <code>permanent: true</code> redirects in <code>next.config.js</code> for moved pages — Next.js sends
          a 308, which search engines treat like a 301 and pass ranking signals through.
        </li>
        <li>
          After a redesign or migration, map every old URL that had traffic or links to its new equivalent. Losing
          those is the most common way a relaunch loses its search traffic.
        </li>
      </ul>

      <h2>7. Structured data, as one linked graph</h2>
      <p>
        Render JSON-LD from a Server Component so it&apos;s in the initial HTML. Two details matter more than the
        choice of types:
      </p>
      <p>
        <strong>Escape <code>&lt;</code>.</strong> <code>JSON.stringify</code> doesn&apos;t escape it, so any string
        containing <code>&lt;/script&gt;</code> — from a CMS field, say — would close the script tag early.
      </p>
      <pre>
        <code>{`export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\\\u003c"),
      }}
    />
  );
}`}</code>
      </pre>
      <p>
        <strong>Give each entity one node and one <code>@id</code>.</strong> Define the organisation and the person
        once, in the root layout, and have every page-level node — <code>Service</code>,{" "}
        <code>BlogPosting</code>, <code>BreadcrumbList</code> — reference them by <code>@id</code> instead of
        restating them. Two slightly different copies of your business read to a crawler as two businesses.
      </p>
      <p>
        And only mark up what&apos;s visible. Build <code>FAQPage</code> or <code>Product</code> data from the same
        array the component renders, so the markup can&apos;t drift from the page.
      </p>

      <h2>8. Social images</h2>
      <p>
        An <code>opengraph-image.js</code> file in a route segment generates the share image with{" "}
        <code>ImageResponse</code> and wires up the <code>og:image</code> tags automatically — but see the merge
        gotcha above: once a page sets its own <code>openGraph</code> object, it must include the image too.
      </p>

      <h2>9. Performance is part of SEO</h2>
      <p>
        Core Web Vitals are a ranking signal, and more importantly, slow pages lose visitors before they convert.
        The App Router gives you the tools — static rendering, Server Components, <code>next/image</code>,{" "}
        <code>next/font</code> — but it doesn&apos;t use them for you. There&apos;s a full walkthrough in{" "}
        <Link href="/blog/fix-core-web-vitals-nextjs">how to fix Core Web Vitals in Next.js</Link>.
      </p>

      <h2>The short version</h2>
      <ol>
        <li>Content, links and JSON-LD in the server HTML — check with <code>curl</code>.</li>
        <li>Marketing routes static; check the <code>next build</code> route table.</li>
        <li>Title template and <code>metadataBase</code> in the root layout; unique title and description per page.</li>
        <li>One metadata helper, so <code>openGraph</code> and <code>twitter</code> never lose their images.</li>
        <li>A canonical on every indexable page, matching your redirects.</li>
        <li>Sitemap generated from route data; no fake <code>lastModified</code>.</li>
        <li>Real 404s via <code>notFound()</code>; permanent redirects for moved URLs.</li>
        <li>One linked structured-data graph, escaped, matching visible content.</li>
      </ol>
      <p>
        If you&apos;d like this checklist run against your own site, with the fixes implemented, that&apos;s what{" "}
        <Link href="/nextjs-development-company-india">Next.js development and SEO work</Link> covers.
      </p>
    </>
  );
}

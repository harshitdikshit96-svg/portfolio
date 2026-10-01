import Link from "next/link";

export const meta = {
  slug: "fix-core-web-vitals-nextjs",
  title: "How to Fix Core Web Vitals in Next.js (App Router)",
  metaTitle: "Fix Core Web Vitals in Next.js",
  description:
    "A practical guide to fixing LCP, INP and CLS in a Next.js App Router site — how to measure with field data, find the real cause, and ship the fix.",
  keyword: "fix core web vitals nextjs",
  keywords: ["fix core web vitals nextjs", "nextjs lcp", "nextjs inp", "nextjs cls", "nextjs performance"],
  datePublished: "2026-09-30",
  readingMinutes: 11,
  relatedLanding: "technical-seo-consultant-india",
};

export default function Post() {
  return (
    <>
      <p>
        Most Core Web Vitals advice for Next.js is a list of switches — use <code>next/image</code>, use{" "}
        <code>next/font</code>, add <code>preload</code>. Those help, but a site that already uses all of them can
        still fail every metric. The fix is almost always in finding the one element or script that is actually
        responsible, and that starts with measuring the right thing.
      </p>
      <p>
        At Bigbasket I worked on a React checkout that handles more than five million transactions a month. Getting
        its Largest Contentful Paint from 4.2 seconds down to 3.4, and time-to-interactive from 6 seconds to 3.6,
        didn&apos;t come from one big switch. It came from three unglamorous techniques — memoisation,
        code-splitting, and deferring non-critical assets — each applied where measurement showed it would matter.
        That pattern — measure, find the specific cause, fix only that — is what this guide is about.
      </p>
      <p>
        It works through the three metrics in the order they usually need fixing, with the App Router specifics
        that matter in Next.js 15 and 16.
      </p>

      <h2>The three metrics, and what “good” means</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>What it measures</th>
            <th>Good</th>
            <th>Poor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LCP — Largest Contentful Paint</td>
            <td>When the biggest visible element finishes rendering</td>
            <td>≤ 2.5 s</td>
            <td>&gt; 4.0 s</td>
          </tr>
          <tr>
            <td>INP — Interaction to Next Paint</td>
            <td>How quickly the page visibly responds to taps, clicks and key presses</td>
            <td>≤ 200 ms</td>
            <td>&gt; 500 ms</td>
          </tr>
          <tr>
            <td>CLS — Cumulative Layout Shift</td>
            <td>How much content moves unexpectedly while the page is open</td>
            <td>≤ 0.1</td>
            <td>&gt; 0.25</td>
          </tr>
        </tbody>
      </table>
      <p>
        Google assesses each at the <strong>75th percentile of real visits</strong>, split by mobile and desktop.
        That detail changes how you should debug: a Lighthouse run on a fast laptop is one visit on ideal hardware,
        and the users who drag your 75th percentile down are on mid-range Android phones and patchy mobile
        connections.
      </p>

      <h2>Step 1: measure with field data first</h2>
      <p>
        Start with what real users experience, then use lab tools to reproduce it. There are three sources worth
        checking:
      </p>
      <ul>
        <li>
          <strong>PageSpeed Insights</strong> — the top section (“Discover what your real users are experiencing”)
          is Chrome UX Report field data. The Lighthouse score underneath is a single lab run. If the two disagree,
          trust the field data.
        </li>
        <li>
          <strong>Search Console → Core Web Vitals</strong> — groups failing URLs by pattern, which tells you
          whether the problem is one template or the whole site.
        </li>
        <li>
          <strong>Your own real-user monitoring</strong> — for pages without enough traffic to appear in CrUX,
          report the metrics yourself.
        </li>
      </ul>
      <p>
        Next.js ships a hook for the last one. Put it in a small client component and render it once from the root
        layout:
      </p>
      <pre>
        <code>{`// app/web-vitals.js
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // metric.name is "LCP" | "INP" | "CLS" | "FCP" | "TTFB"
    navigator.sendBeacon?.(
      "/api/vitals",
      JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        page: location.pathname,
      })
    );
  });
  return null;
}`}</code>
      </pre>
      <p>
        If you already run Google Analytics through Tag Manager, sending these as events works just as well.
        What matters is that you can split the numbers by page and device, because a site-wide average hides the
        one template that is failing.
      </p>

      <h2>Step 2: fix LCP</h2>
      <p>
        LCP is usually the metric that fails first, and it is the most mechanical to fix once you know which
        element it is. In Chrome DevTools, record a trace in the Performance panel with CPU and network
        throttling on; the LCP marker names the element. It is nearly always a hero image, a large heading, or a
        background image set in CSS.
      </p>
      <p>
        LCP time breaks down into four parts, and each has a different fix:
      </p>
      <ol>
        <li>
          <strong>Time to first byte</strong> — the server response. If this alone is over about 800 ms, nothing
          else on this list will save you.
        </li>
        <li>
          <strong>Resource load delay</strong> — how long before the browser even <em>starts</em> fetching the LCP
          image.
        </li>
        <li>
          <strong>Resource load time</strong> — how long the download takes.
        </li>
        <li>
          <strong>Render delay</strong> — the gap between the image arriving and it being painted, usually caused by
          render-blocking CSS or JavaScript.
        </li>
      </ol>

      <h3>Make the page static where you can</h3>
      <p>
        The biggest TTFB win in the App Router is making sure a route that <em>could</em> be pre-rendered actually
        is. A single call to <code>cookies()</code>, <code>headers()</code> or an uncached fetch anywhere in the tree
        opts the whole route into per-request rendering. Run <code>next build</code> and check the route table: a
        marketing page that shows as dynamic is a page paying for a server render on every visit for no reason.
      </p>
      <p>
        Where a route genuinely needs request data, keep that part small and wrap it in a{" "}
        <code>&lt;Suspense&gt;</code> boundary, so the static shell — including the LCP element — streams
        immediately. With Cache Components enabled in Next.js 16, the <code>&quot;use cache&quot;</code> directive
        lets you cache individual components and functions instead of making the whole route one or the other.
      </p>

      <h3>Get the LCP image requested early</h3>
      <p>
        By default <code>next/image</code> lazy-loads, which is exactly wrong for the hero. Tell it this image
        matters:
      </p>
      <pre>
        <code>{`import Image from "next/image";

<Image
  src="/images/hero.webp"
  alt="Clinic reception with patients checking in"
  width={1200}
  height={800}
  fetchPriority="high"
  loading="eager"
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}</code>
      </pre>
      <p>
        In Next.js 16 the old <code>priority</code> prop is deprecated in favour of <code>preload</code>, and the
        docs now recommend <code>loading=&quot;eager&quot;</code> or <code>fetchPriority=&quot;high&quot;</code> for
        most cases. Use <code>preload</code> only when the image would otherwise be discovered late — for example,
        when it sits deep in a client component. Only do this for the one image that is actually the LCP element;
        marking five images as high priority makes them compete with each other.
      </p>
      <p>
        Two common traps: an LCP image set as a CSS <code>background-image</code> is invisible to the browser&apos;s
        preload scanner until the CSS is parsed, and a hero rendered inside a carousel that only mounts after
        hydration cannot start loading until the JavaScript has run. Both show up as a long resource load delay.
      </p>

      <h3>Send the right size</h3>
      <p>
        The <code>sizes</code> attribute is what lets the browser pick a small file on a phone. Without it,{" "}
        <code>next/image</code> assumes the image may fill the viewport and a phone can end up downloading a
        desktop-width file. Get <code>sizes</code> right before you spend time on formats — a correctly sized WebP
        usually beats a wrongly sized AVIF.
      </p>

      <h3>Don&apos;t let fonts delay text</h3>
      <p>
        When the LCP element is a heading, the font often decides LCP. <code>next/font</code> self-hosts the files
        and preloads them, and with <code>display: &quot;swap&quot;</code> text is painted in the fallback font
        immediately. Load only the weights you use: each weight is a separate file.
      </p>

      <h2>Step 3: fix INP</h2>
      <p>
        INP replaced First Input Delay as a Core Web Vital in March 2024, and it is much harder to pass. FID only
        measured the delay before the <em>first</em> interaction started being handled; INP measures the full time
        from any interaction to the next frame being painted, across the whole visit, and reports close to the
        worst one.
      </p>
      <p>
        Poor INP almost always means the main thread is busy when the user taps. In a Next.js app, that is usually
        one of four things:
      </p>
      <ul>
        <li>
          <strong>Hydration of a large client tree.</strong> Every component under a{" "}
          <code>&quot;use client&quot;</code> boundary ships JavaScript and must hydrate. Push the boundary down:
          keep layouts, headings and static content as Server Components and make only the interactive leaf a
          Client Component.
        </li>
        <li>
          <strong>Third-party scripts.</strong> Chat widgets, tag managers, heatmaps and ad scripts run on the same
          main thread as your handlers. Load anything non-essential with{" "}
          <code>&lt;Script strategy=&quot;lazyOnload&quot;&gt;</code> so it waits until the page is idle, and
          question whether each one earns its cost.
        </li>
        <li>
          <strong>Expensive state updates.</strong> A keystroke that re-renders a thousand-row list, or a filter
          that re-sorts everything synchronously. Wrap the non-urgent part in <code>startTransition</code> so React
          can paint the input first.
        </li>
        <li>
          <strong>Long synchronous handlers.</strong> Anything that runs for more than 50 ms blocks the next paint.
          Do the visible update first, then yield before the heavy work.
        </li>
      </ul>
      <pre>
        <code>{`"use client";
import { useState, useTransition } from "react";

export function ProductFilter({ products }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(products);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const next = e.target.value;
    setQuery(next); // urgent: the input updates immediately
    startTransition(() => {
      // non-urgent: React can interrupt this to keep typing responsive
      setVisible(products.filter((p) => p.name.toLowerCase().includes(next.toLowerCase())));
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} aria-label="Filter products" />
      <ProductList items={visible} dimmed={isPending} />
    </>
  );
}`}</code>
      </pre>
      <p>
        To find the slow interaction, use the Performance panel in DevTools: record, perform the interaction,
        and look for the long task under it. The field data from <code>useReportWebVitals</code> also tells you
        which pages have poor INP, which narrows the search considerably.
      </p>

      <h2>Step 4: fix CLS</h2>
      <p>
        Layout shift is the easiest metric to fix and the easiest to reintroduce. Nearly every shift comes from
        something taking up space it didn&apos;t reserve:
      </p>
      <ul>
        <li>
          <strong>Images without dimensions.</strong> <code>next/image</code> requires <code>width</code> and{" "}
          <code>height</code> (or <code>fill</code> inside a sized container) precisely so the browser can reserve
          the box. A plain <code>&lt;img&gt;</code> in Markdown or CMS content often has neither.
        </li>
        <li>
          <strong>Fonts swapping.</strong> When the web font replaces the fallback and the text reflows.{" "}
          <code>next/font</code> generates a size-adjusted fallback to minimise this — another reason to use it
          rather than a <code>&lt;link&gt;</code> to Google Fonts.
        </li>
        <li>
          <strong>Content injected above existing content.</strong> Cookie banners, promo bars and “download our
          app” strips that push the page down after it has rendered. Overlay them, or reserve their height in the
          initial HTML.
        </li>
        <li>
          <strong>Embeds and ads.</strong> Give the container a fixed <code>min-height</code> or an{" "}
          <code>aspect-ratio</code> before the iframe loads.
        </li>
        <li>
          <strong>Client-only rendering after hydration.</strong> A component that renders nothing on the server and
          something on the client (for example, based on <code>window.innerWidth</code>) shifts everything below
          it. Use CSS media queries for layout differences instead.
        </li>
      </ul>

      <h2>A checklist to work through</h2>
      <ol>
        <li>Check field data in PageSpeed Insights and Search Console; note which metric fails, on which device.</li>
        <li>Run <code>next build</code> and confirm marketing routes are static.</li>
        <li>Identify the LCP element in a throttled DevTools trace.</li>
        <li>
          Give that one image <code>fetchPriority=&quot;high&quot;</code> and a correct <code>sizes</code>; make
          sure it is in the server-rendered HTML.
        </li>
        <li>Move <code>&quot;use client&quot;</code> boundaries down to the smallest interactive components.</li>
        <li>Audit third-party scripts; lazy-load or remove what you can.</li>
        <li>Wrap expensive, non-urgent updates in <code>startTransition</code>.</li>
        <li>Reserve space for every image, embed and injected banner.</li>
        <li>Ship, then watch the field data — CrUX is a rolling 28-day window, so give it a few weeks.</li>
      </ol>
      <p>
        That last point catches people out: after a fix, Search Console&apos;s report won&apos;t move for weeks,
        because the field data is a rolling 28-day window. Your own <code>useReportWebVitals</code> numbers will
        move within days, which is the best reason to set it up before you start.
      </p>
      <p>
        If your site is failing and you&apos;d rather have someone find the cause and ship the fix, that&apos;s
        exactly what a{" "}
        <Link href="/technical-seo-consultant-india">technical SEO and performance audit</Link> covers.
      </p>
    </>
  );
}

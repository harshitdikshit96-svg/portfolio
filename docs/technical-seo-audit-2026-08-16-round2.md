# Technical SEO audit — harshitcreates.in (round 2: SearchFit SEO pass)

*Second pass, run via the SearchFit SEO plugin's `seo-audit` + `technical-seo` + `keyword-clustering` skills against the same local `harshit-portfolio` codebase as the first audit (`docs/technical-seo-audit-2026-08-16.md`). This pass widened the checklist — full OG/Twitter tag completeness per route, heading order (not just h1 presence), touch target sizes, client/server component split, broken-link mapping — rather than re-checking what round 1 already covered. Every finding below was verified against actual rendered HTML from the local dev server (`curl` + grep on `<meta>`/`<h1-3>` tags), not inferred from reading source alone. Six issues found; all six fixed directly this pass — none required a product/content decision.*

**Site**: harshitcreates.in (local `harshit-portfolio` codebase)
**Pages analyzed**: 8 routes (`/`, `/about`, `/services`, `/packages`, `/work`, `/work/[slug]` ×7, `/contact`, `/blog`) + root layout
**Score**: **92/100** (up from an estimated ~74 before this pass — the missing share-card image/title on every non-home page was the main drag)

## Critical Issues — fixed this pass

### 1. Every page except the homepage was sharing with no image and the wrong title/description
Confirmed by curling `/about` and `/work/airimation` and diffing their `<head>` against the homepage's: **zero** `og:image` or `twitter:image` tags on either subpage, and `twitter:title`/`twitter:description` frozen to the homepage's copy regardless of which page was actually shared.

Root cause: Next.js metadata merging is shallow *per top-level key* — a route that sets its own `openGraph` or `twitter` object replaces the parent's whole object, not just the fields it specifies (confirmed against this pinned Next.js version's own docs, `generate-metadata.md`'s "Overwriting fields" example). Every page routed through `pageMetadata()` in `lib/seo.js` — `/about`, `/services`, `/packages`, `/work`, `/work/[slug]`, `/contact` — sets its own `openGraph` (for a correct per-page `og:url`/title) without re-declaring `images`, so each one silently dropped the shared image `app/opengraph-image.js` generates. Only the homepage, which never overrides `openGraph`/`twitter` at all, was inheriting the root layout's version intact.

**Practical impact**: for months, sharing a link to any case study, the services page, the packages page, or the contact page — in WhatsApp, LinkedIn, Slack, iMessage, wherever — would have shown a blank/generic card with no image, and (for Twitter/X specifically) the homepage's title and description instead of the actual page's. That's the single highest-leverage fix in this pass, since link previews are often the only impression a page gets before a click.

**Fix**: pulled the shared OG image into its own object in `lib/seo.js` and spread it into every `pageMetadata()` call's `openGraph.images`, plus added an explicit `twitter: { card, title, description }` block (the `card` field has to be repeated too, for the same shallow-replace reason, or subpages would silently lose the large-image card type). Also added a matching `twitter` block to `app/blog/page.js`, which builds its metadata by hand rather than through `pageMetadata()`. Verified fixed by re-curling all three routes — `og:image`, `twitter:image`, `twitter:title`, and `twitter:description` now all render correctly and per-page. See `lib/seo.js`, `app/blog/page.js`.

## Warnings — fixed this pass

### 2. `/packages` skipped straight from `<h1>` to `<h3>`, twice, before any `<h2>`
`GuaranteeBlock` and `PackageBuilder` (both open with an `<h3>`) render directly under the page's `<h1>` on `/packages`, with no `<h2>` between them — a real heading-hierarchy skip (`h1 → h3 → h3 → h2 → h2`). The same two components render correctly on the homepage, because `Home.js` wraps them in its own `<h2>` ("Start with a budget..."); `/packages` just never got the equivalent wrapper. Screen readers and crawlers both use heading level as a structural signal, so a skip like this reads as a broken outline, not just a style choice.

Fixing it with a *visible* new heading would mean picking new on-page copy, which isn't a call to make unilaterally — so this was fixed with a standard, added `.sr-only` utility class (visually-hidden but present to assistive tech and crawlers) and one `<h2 className="sr-only">` above the two components. Zero visual change; verified the resulting order (`h1 → h2 → h3 → h3 → h2 → h2`) via curl. See `app/globals.css`, `app/packages/page.js`.

### 3. Mobile nav's hamburger button was a 32×32px tap target
`.nav-hamburger` was 32×32px — below the WCAG 2.5.5 / iOS Human Interface Guidelines minimum of 44×44px for a tap target — and it's the *only* way to open navigation on mobile, hit on every mobile pageview. Bumped the button to 44×44px; the three bars themselves stay a fixed 22px wide (previously `width: 100%` of the button, which would have stretched them 37% wider along with the tap area) so the icon looks the same, just easier to hit. See `app/globals.css`.

### 4. `ImageSlot.js` was marked `"use client"` with no client-only code in it
No hooks, no event handlers, no browser globals anywhere in the file — just `next/image` plus a plain prop check for the placeholder fallback, all of which works fine as a Server Component. An unnecessary `"use client"` directive ships that component's code (and the `next/image` wrapper around it) as client JS instead of letting it render server-side with no hydration cost — a small but real, verified performance opportunity given `ImageSlot` is used on nearly every page. Removed the directive; re-verified `/`, `/about`, and `/work` all still render correctly (200s, images present) with it gone. See `components/ImageSlot.js`.

### 5. Stale comment referencing the removed `BLOB_MANIFEST_URL` env var
`components/sections/Work.js` still explained the screenshot-manifest no-op behavior in terms of the `BLOB_MANIFEST_URL` env var that was eliminated in favor of `head()`-based lookup earlier in this project (see `lib/screenshots.js`). Not a functional bug, but confusing to a future reader chasing a var that no longer exists. Updated the comment to match current behavior.

## Opportunities

### 6. Keyword cluster map, and where the biggest untapped cluster actually needs to live
Full breakdown below. Headline finding: the largest single keyword cluster on the tracked list — 11 of roughly 30 keywords, all Lucknow/"near me" local-intent variants — has **zero dedicated on-page content**, only metadata placement. This isn't a new problem introduced by anything in the code; it's already correctly documented in `docs/seo-keywords.md` as "not yet done," and the doc is right that the single highest-leverage move for that cluster is finishing Google Business Profile setup, not adding more on-page copy (proximity/"near me" queries are won by GBP signals, not page content). Flagging it here mainly to size it precisely and to give one concrete content recommendation short of a full location-page build: see the cluster table below.

## Flagged in round 1, still open — needs your decision

Carried over unchanged from `docs/technical-seo-audit-2026-08-16.md`: the hero carousel's real `<h1>` and its `preload`-hinted image don't paint until the 1.2s auto-swap, which may be undermining the LCP hint's purpose and means visitors see the "how it works" slide before the actual headline. Two fixes on the table (reorder slides, or shorten just the first-swap delay) — still your call, not touched this pass.

## Noted, not acted on (unchanged from round 1)

- `docs/seo-keywords.md` still claims "web solutions architect" lives in `businessJsonLd.name`; it doesn't (it's in `jobTitle`). Doc-drift, not a site bug.
- Image alt text is solid across the site; minor phrasing polish possible but not a real gap.
- `/blog` is correctly `noindex`ed with no real posts yet — deliberate, not a finding.

## Everything else checked and already solid

- **Crawlability**: `robots.txt`, `sitemap.xml` (15 URLs — 6 top-level + 7 case studies + implicit root), canonical tags, and `noindex` on `/blog` all correct.
- **Internal linking**: every route in `NAV_DEFS` (`lib/data.js`) maps to a real page; no broken internal `href`s found anywhere in `app/` or `components/`; no orphan pages — every case-study page is linked from both `/work` and the homepage's featured-work grid.
- **Images**: every `ImageSlot` usage passes real `alt` text; `fill`-mode images size via a parent box (no CLS risk); fixed-size images pass explicit `width`/`height`; Blob-hosted screenshots go through `next/image` with the host correctly allow-listed in `next.config.mjs`; WebP-only is a deliberate, documented, reasonable call (AVIF encode cost not worth it for the LCP-critical hero photo).
- **Performance**: only the actual hero portrait sets `preload`; everything else lazy-loads by default; 10 of 38 components use `"use client"` and all ten have a real reason to (state, effects, browser APIs, or event handlers) — a reasonable ratio, not client-heavy.
- **Structured data**: `Person` + `ProfessionalService` (with `Service`/`Offer` sub-entities) on the root layout, `BreadcrumbList` on every sub-page, `FAQPage` on the FAQ section, `Service` schema per package tier on `/packages` — correctly typed and linked (`founder` rather than merging Person into the business entity). `Article`/`Product`/`HowTo` schema types genuinely don't apply yet (no blog posts, no products, and the 3-step sales process on `GuaranteeBlock` is marketing copy, not literal how-to instructions — correctly left unmarked rather than risking a manual action for schema misuse).
- **Fonts**: `next/font/google` with `display: "swap"` on both families — no invisible-text-during-load penalty.

---

## Keyword cluster map

Source: `docs/seo-keywords.md`'s full tracked list (~30 keywords). Grouped by intent/topic rather than by where each currently lives, so the gaps are visible at a glance.

### Cluster A — Local/proximity intent (Lucknow, "near me")
`website developer near me` · `web developer near me` · `website developer in Lucknow` · `web developer in Lucknow` · `website design Lucknow` · `website development Lucknow` · `website development company Lucknow` · `hire web developer Lucknow` · `best web developer in Lucknow` · `affordable website design Lucknow` · `SEO audit Lucknow` · `portfolio website developer in Lucknow`

**Status**: metadata-only for all 12 — the largest cluster, and the thinnest coverage. **Recommendation**: resist the instinct to build a dedicated landing page per variant (these are near-duplicate phrasings — a multi-page approach risks cannibalizing rather than compounding). Higher-leverage, in order: (1) finish and verify the Google Business Profile listing — this is the ranking factor that actually moves "near me"/proximity queries, not on-page copy; (2) once GBP is live, a single `/about` or homepage paragraph naming Lucknow explicitly alongside the areaServed structured data would be enough reinforcement for this cluster without diluting focus.

### Cluster B — Freelance/portfolio developer identity
`freelance website developer` · `freelance web developer` · `freelance website developer in Lucknow` · `portfolio website developer` · `portfolio website developer in Lucknow`

**Status**: best-covered cluster on the site — `/about` meta description, two FAQ Q&As written in near-verbatim query phrasing, and the Starter package tagline. **Recommendation**: none needed; this is close to a model example of the "also placed in" column actually being filled in.

### Cluster C — Technical/service-line differentiation
`website audit service` · `technical SEO audit` · `Core Web Vitals audit` · `SEO management services` · `Google Business Profile optimization` · `technical consultant` · `web solutions architect` · `fractional CTO` · `React developer` · `Next.js developer`

**Status**: the audit/consulting half is well placed (`/services` page, `GbpSection.js`, `jobTitle`). The stack-specific half — `React developer`, `Next.js developer` — is metadata-only with no visible reinforcement anywhere. **Recommendation**: these are lower-competition, high-intent long-tails (someone searching "Next.js developer" already knows what they want, unlike "web developer near me"). A single sentence on `/services` or `/about` naming the stack explicitly ("built in React and Next.js") would activate this sub-cluster for close to zero effort — it's plausible copy that's probably already true, not a new claim to invent.

### Cluster D — Industry/vertical solutions
`restaurant QR ordering system developer` · `booking website development` · `small business website developer` · `custom website development Lucknow` · `ecommerce website developer Lucknow`

**Status**: well covered — each maps to a specific `/services` category or package tier (Custom Web App, E-commerce Website), and the homepage hero copy targets the small-business audience directly even without the exact phrase. **Recommendation**: none needed.

### Cluster E — Brand/entity
`Harshit Dixit`

**Status**: covered — `personJsonLd.name`, every page title via the `%s — harshitcreates` template. **Recommendation**: none needed.

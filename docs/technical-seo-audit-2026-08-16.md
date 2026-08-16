# Technical SEO audit — harshitcreates.in

*Codebase audit of the local `harshit-portfolio` project. Findings below are grounded in the actual code (grep/read), the pinned Next.js version's own docs (`node_modules/next/dist/docs/`), and current (2026) Google guidance on title/description display limits. Six items were fixed directly this pass; one is flagged as a recommendation since it's a product trade-off, not a clear bug.*

## Fixed this pass

### 1. Title tag and meta description were both past Google's display limits
Google truncates titles at roughly 580px on desktop (~50-60 characters) and descriptions at roughly 155-160 characters. The old title was 66 characters; the old description was 215, with the one concrete credibility line ("shipping production systems at Acko and Bigbasket") sitting entirely past character 160 — it never rendered anywhere. Tightened the title to 59 characters and reordered the description so that line leads. See `app/layout.js`.

### 2. Three different phrasings of the same identity line across one preview card
The `<title>` tag, the OG share-card image, and the Person JSON-LD's `jobTitle` each used different wording for "what Harshit does" — visible and inconsistent in a single link-preview card (title/OG image stacked together). Unified the two *visible* surfaces (title, OG image) behind one `ROLE_TAGLINE` constant in `lib/data.js`. Deliberately did **not** collapse `jobTitle` into the same short string — `docs/seo-keywords.md` tracks "web solutions architect" and "technical consultant" as placed specifically in `jobTitle`, which has no display-length constraint, so it now carries the fuller phrase ("Freelance Web Developer, Technical Consultant & Web Solutions Architect") while the constrained surfaces stay short.

### 3. `/work/[slug]` case-study pages were missing from the sitemap entirely
Seven statically generated pages (Airimation, Shroomly, Mushroom Society, CarEasy, Chaal Tracker, the QR ordering system, the clinic template) each have unique titles, descriptions, and content, are linked from `/work`, and are individually indexable — but `app/sitemap.js` only listed the six top-level routes. Added them, generated from the same `LIVE_PROJECTS`/`TEMPLATE_PROJECTS` data every `/work/[slug]` page renders from, so this can't silently drift out of sync again.

### 4. `/about` and `/contact` had no `<h1>` on the page
Both used an `<h2>` as their effective top-level heading with no `<h1>` anywhere in the DOM — a real on-page SEO and accessibility gap (screen readers and crawlers both rely on the heading outline starting at h1). The homepage's hero explicitly documents a "one h1 per page" rule in a code comment; About/Contact just weren't given one. Changed both to `<h1>`, same styling, no visual change.

### 5. `robots.js` hardcoded the site origin instead of importing it
Every other file (`sitemap.js`, `layout.js`) reads `SITE_URL` from `lib/data.js`; `robots.js` had its own hardcoded copy of the same URL. Not a live bug today, but a real risk if the domain ever changes and this file gets missed. Now imports the shared constant.

## Flagged, not changed — needs a product decision

### 6. The hero's real `<h1>` and its preload-hinted image are invisible for the first 1.2 seconds of every page load
`components/HeroCarousel.js` keeps two slides mounted at all times and toggles visibility with `opacity` (`.hero-slide { opacity: 0 }`, `.hero-slide.is-active { opacity: 1 }`). `useState(0)` means slide 0 — the "how it works" process banner, no image, no `<h1>` — is what's actually painted first. The site's only `<h1>` and its `preload`-hinted hero portrait both live on slide 1, which sits at `opacity: 0` until the auto-swap timer flips over — and that timer is now 1.2 seconds (changed earlier this session, for an unrelated UX reason: giving the hero a faster auto-swap).

Two consequences:
- The `preload` hint (correct API for this pinned Next.js 16+ version — `priority` was deprecated in favor of it, confirmed against `node_modules/next/dist/docs`) downloads the image early, but it doesn't *paint* until the 1.2s crossfade. Chrome's LCP algorithm can register that later paint as the actual Largest Contentful Paint event, which means the preload hint may be doing less for the LCP score than intended — quite possibly the opposite of its purpose.
- The page's real value-proposition headline is what a visitor (and a rendering crawler) sees second, not first.

This isn't a clear-cut bug — it's a real trade-off between the auto-swap UX from earlier and LCP/first-impression timing. Two reasonable fixes, your call: (a) swap the slide order so the real hero (with the `<h1>` and image) is `slide 0`/shown first, and the process-steps banner becomes slide 1; or (b) keep the current order but shorten the delay before the first swap specifically (not the whole auto-swap interval) so the real hero appears sooner. Say the word and I'll implement whichever.

## Noted, not acted on

- `docs/seo-keywords.md` claims "web solutions architect" is placed in `businessJsonLd.name` (`app/layout.js`). It isn't — that field reads "Harshit Dixit — Freelance Web Developer & Fractional CTO", no "Web Solutions Architect" anywhere. `jobTitle` does carry it (see fix #2 above), so the keyword itself isn't missing from structured data — just a stale line in that tracking doc's placement notes. Low priority; flagging so the doc doesn't mislead later.
- Image alt text across the site (`${p.name} screenshot`, "Harshit Dixit portrait", etc.) is decent — descriptive, not generic or empty. Could be marginally richer ("Screenshot of the Airimation homepage" vs "Airimation screenshot") but this isn't a real gap, not worth the churn.
- `/blog` is correctly `noindex`ed and excluded from the sitemap since it has no real posts yet — this was already a deliberate, documented, correct call, not a finding.

## Everything else checked and already solid

- Every indexable route has its own `title`/`description`/canonical via the shared `pageMetadata()` helper in `lib/seo.js` — no page silently inherits the homepage's metadata.
- `BreadcrumbList` JSON-LD present on sub-pages; `Person` + `ProfessionalService` JSON-LD on the root layout, correctly linked via `founder` rather than merged.
- `next/font/google` usage has `display: "swap"` — no invisible-text-during-font-load penalty.
- Blob-hosted work-tile screenshots go through `next/image` with correct `sizes`, and `next.config.mjs` allow-lists the Blob host — no unoptimized `<img>` fallback.
- Sitemap deliberately omits `lastModified` (avoids the "everything changed on every deploy" trust problem with crawlers) — already correct, documented reasoning in-file.

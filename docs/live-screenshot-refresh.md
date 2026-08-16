# Live-fetch work-tile screenshots — Vercel Cron + Blob (Hobby, free)

Replaces manually re-screenshotting `public/images/proj-*.webp` every time a
live project site is redesigned. A daily cron job re-screenshots every work
project that has a live `url` and refreshes its tile image automatically.

## Why this design (not a live iframe)

An iframe embed of the real site scaled into the tile was considered and
rejected: several linked sites can send `X-Frame-Options`/CSP that blocks
being framed at all (out of our control, can change anytime), a full
external page loading per tile is heavy on `/work`'s load time, and a live
embed can show whatever transient state (cookie banner, mid-edit content)
the site happens to be in at the moment someone loads the page. A scheduled
screenshot keeps the existing fast, static-image approach and just
automates the refresh step.

## What's already built (this commit)

- `app/api/refresh-screenshots/route.js` — launches headless Chromium
  (`puppeteer-core` + `@sparticuz/chromium`), screenshots every project in
  `LIVE_PROJECTS`/`TEMPLATE_PROJECTS` that has a `url`, resizes to the
  existing 600×360 tile format with `sharp`, and uploads each as
  `work-screenshots/<slug>.webp` to Vercel Blob, plus a
  `work-screenshots/manifest.json` mapping slug → blob URL.
- `vercel.json` — schedules that route to run once a day (`0 3 * * *`).
  Hobby plan cron jobs are free but capped at once/day with ±59min timing
  precision — see [Vercel's cron pricing docs](https://vercel.com/docs/cron-jobs/usage-and-pricing).
  That's fine here; a work-tile screenshot doesn't need tighter freshness.
- `lib/screenshots.js` — `getScreenshotManifest()` fetches that manifest
  (cached at the edge, revalidated hourly) and `withScreenshot()`/
  `withScreenshots()` overlay a fresh blob URL onto a project's `image`/
  `imageLg` fields. Wired into `Home.js`, `Work.js`, and
  `app/work/[slug]/page.js`.
- `next.config.mjs` — allow-lists `*.public.blob.vercel-storage.com` so
  `next/image` will render the blob-hosted screenshots.

**Nothing above requires the pipeline to be active.** Until the setup below
is done, `getScreenshotManifest()` returns `{}` and every page falls back to
the static `/public/images/proj-*.webp` files exactly as before — this is
purely additive.

## One-time setup needed in your Vercel dashboard (I don't have access to do this part)

1. **Connect a Blob store to the project**: Project → Storage → Create
   Database → Blob. Connecting it auto-injects a `BLOB_READ_WRITE_TOKEN`
   env var into the project, which `@vercel/blob`'s `put()` call in the API
   route needs.
2. **Set `CRON_SECRET`**: Project → Settings → Environment Variables → add
   `CRON_SECRET` with any long random value. Vercel automatically sends this
   as `Authorization: Bearer <value>` when it invokes a scheduled cron job —
   the route checks for that exact header and returns 401 otherwise, so
   nobody else can trigger a screenshot run by guessing the URL. (Generate
   one with `openssl rand -hex 32` or similar.)
3. **Deploy** — pushing this branch/these files and deploying is what
   actually registers the cron job with Vercel; it does nothing before a
   deploy picks up `vercel.json`.
4. **Set `BLOB_MANIFEST_URL`**: after the cron has run once (or trigger it
   manually — see below), open the Blob store in the dashboard, find
   `work-screenshots/manifest.json`, copy its public URL (looks like
   `https://<store-id>.public.blob.vercel-storage.com/work-screenshots/manifest.json`),
   and set it as the `BLOB_MANIFEST_URL` env var. Redeploy (or wait for the
   next deploy) so `lib/screenshots.js` picks it up. This one manual step
   only has to happen once — after that, the manifest content updates daily
   without touching this env var again.
5. **(Optional) Trigger the first run manually** instead of waiting up to a
   day for the first cron fire: `curl -H "Authorization: Bearer <CRON_SECRET>" https://<your-domain>/api/refresh-screenshots`
   (or via the Vercel dashboard's "Cron Jobs" tab, which has a manual
   "Run" button once the project is deployed).

## Notes / things to watch

- Only projects with a live `url` in `lib/data.js` get auto-refreshed —
  template/demo-only projects without a `url` keep using their static
  image, same as today.
- Free-tier headroom is generous for this use case: Vercel Blob's Hobby
  free allowance is 5GB storage / 100GB data transfer / 100K+ operations
  per month — a handful of ~15-25KB webp tiles refreshed once a day is a
  rounding error against those limits.
- If a project's site is briefly down or slow when the cron fires, that one
  project's screenshot just doesn't update that day (the route continues on
  to the next project rather than failing the whole run) — the manifest
  keeps last-known-good until the next successful run.

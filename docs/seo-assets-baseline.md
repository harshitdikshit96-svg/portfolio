# SEO / Contact / Assets Baseline — pre-redesign snapshot

Captured 2026-08-15, right before importing and implementing the new
Claude Design homepage (`Harshit Creates Home.dc.html`). This is the
checklist of everything SEO-, contact-, and asset-related that already
works on the live site and must survive the redesign — either untouched,
or re-wired into whatever new presentational components replace the
current ones. A `v1-pre-redesign` git tag was also cut at the same point
as a hard rollback point (see bottom of this doc).

If a redesign step is about to delete or rewrite one of these files,
check this doc first and re-wire rather than drop.

## 1. Metadata & structured data — `app/layout.js`

- `metadata` export: title template (`"%s — harshit.dev"`), default title
  `"Harshit Dixit — Freelance Website Developer & Technical Consultant, Lucknow"`,
  description, `metadataBase`, canonical alternate, OpenGraph, Twitter card,
  `manifest: "/site.webmanifest"`.
- `keywords` array — local-SEO + technical terms, deliberately mixes
  plain-language search terms ("web developer near me") with qualifying
  technical terms (see comment in file for rationale). Not ranking-relevant
  to Google anymore but cheap to keep and other engines still read it.
- `viewport` export sets `themeColor: "#1a120e"`.
- **`personJsonLd`** — `Person` schema: name, jobTitle, description, image,
  email, `sameAs` (LinkedIn/GitHub), `alumniOf` (IIIT Lucknow), `knowsAbout`
  (flattened from `SKILL_GROUPS`).
- **`businessJsonLd`** — `ProfessionalService` schema, `@id` anchored at
  `${siteUrl}/#business`. Uses `areaServed` (Lucknow / UP / Remote) instead
  of a street address since this is a service-area business with no
  storefront — deliberate per Google's structured-data guidance. Linked to
  the Person node via `founder` (not merged) since they're different
  entity types. `sameAs` includes `SOCIAL.gbpUrl` filtered for null (hidden
  until the Google Business Profile exists). `makesOffer` is generated from
  `SERVICES` in `lib/data.js`.
- Both JSON-LD blocks are injected via `<script type="application/ld+json">`
  in the root layout body, ahead of `<SiteChrome>`.

**Re-wire rule:** any new layout/root component must keep emitting both
JSON-LD blocks and the `metadata`/`viewport` exports. The JSON-LD generator
logic can move file but shouldn't lose the `founder` link, the `sameAs`
null-filtering, or the `makesOffer` → `SERVICES` mapping.

## 2. Sitemap — `app/sitemap.js`

Static route list: `["", "/work", "/about", "/contact", "/blog"]`, priority
1.0 for home, 0.9 for `/contact`, 0.7 elsewhere, weekly/monthly change
frequency. **Deliberately omits `lastModified`** — stamping every route
with `new Date()` on every build falsely signals constant change and can
train crawlers to distrust the signal (see in-file comment). If the
redesign changes/adds routes, update `routes` here to match — don't let
the sitemap drift from the real route list.

## 3. Robots — `app/robots.js`

Allows all crawlers on `/`, points `sitemap` at `${siteUrl}/sitemap.xml`.
No changes needed unless a route needs to be excluded (e.g. `/packages`
internal admin views, if any get added).

## 4. OG image — `app/opengraph-image.js`

Generated 1200×630 PNG via `next/og` `ImageResponse`. Hardcodes hex
approximations of the oklch palette (`bg #1a120e`, `text #f2e9da`,
`textMuted #a99a89`, `accent #e2a463`) because satori (the renderer behind
`ImageResponse`) doesn't support `oklch()` — picked to visually match
`lib/colors.js`, not derived from it. If the redesign changes the palette,
these hex values need manual re-matching, not a blind copy from
`lib/colors.js`.

## 5. Manifest & icon

- `public/site.webmanifest` — name, short_name, description, start_url,
  standalone display, `background_color`/`theme_color` `#1a120e`, icon
  pointing at `/icon.svg`.
- `app/icon.svg` — 64×64 rounded-square favicon, dark bg
  (`oklch(0.16 0.035 45)`), serif "H" glyph, accent dot
  (`oklch(0.76 0.13 60)`).

## 6. Error / not-found pages

- `app/not-found.js` — 404 page, `metadata: { robots: { index: false, follow: true } }`
  so it's excluded from indexing but still crawlable for link-following.
  CTAs: "Go home" / "Get in touch".
- `app/error.js` — client error boundary, logs to console, "Try again" /
  "Go home" CTAs.
- `app/global-error.js` — replaces the entire root layout on a failure
  there, so it renders its own `<html>/<body>` from scratch and
  deliberately avoids `SiteChrome` or anything else that could itself be
  implicated in the failure. Keep this file self-contained if it's ever
  touched during the redesign — don't make it depend on new shared
  components.

## 7. Contact flow

- `components/sections/Contact.js` — page copy, renders `ContactForm`,
  `ConsultationCta` (Calendly embed via `CALENDLY_URL` in `lib/data.js`,
  still a placeholder — needs the real link), then a direct-email fallback
  and LinkedIn/GitHub links.
- `components/ContactForm.js` — client component, no backend: builds a
  `mailto:` link from name/email/service/message and redirects the browser
  to it (`SOCIAL.email` as recipient, subject `Freelance inquiry: {service}`).
  Service dropdown is sourced from `SERVICES` in `lib/data.js`.
- `app/contact/page.js` — page-level `metadata` (title, description,
  canonical `/contact`).
- `components/ConsultationCta.js` (untracked/new — v2 work) — Calendly
  booking block reused on `/`, `/packages`, and `/contact`.

**Re-wire rule:** the mailto-based submit flow and the `SERVICES`-sourced
dropdown are the actual lead-capture mechanism — a redesign that replaces
`Contact.js`'s markup must still call into `ContactForm`/reproduce its
submit behavior, not just carry over the visual shell.

## 8. Contact / identity data — `lib/data.js` → `SOCIAL`

```js
export const SOCIAL = {
  email: "harshitdikshit96@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshitdixit96/",
  github: "https://github.com/harshitdikshit96-svg",
  resumeHref: "/resume/Harshit.pdf",
  gbpUrl: null, // set once the Google Business Profile is live
};
```

Consumed by: `Footer.js`, `Contact.js`, `ContactForm.js`, `layout.js`
(JSON-LD `sameAs`/`email`). `gbpUrl` is intentionally `null` until a real
Google Business Profile exists — every consumer already null-checks it
rather than rendering a dead link. Keep that null-check pattern in any
replacement components.

## 9. Assets inventory — `public/`

- `public/images/hero-portrait.webp`, `about-portrait.webp` — profile
  photography used in Home/About hero slots.
- `public/images/proj-airimation.webp` + `-lg.webp`, `proj-shroomly-lg.webp`
  (no small crop — the `-lg` is reused for both slots per comment in
  `lib/data.js`), `proj-careasy-lg.webp`, `proj-chaal-lg.webp` — project
  thumbnails for the Work section, referenced via `PROJECTS` in
  `lib/data.js` (`image`/`imageLg` fields, paired with `slotId` for
  `ImageSlot.js`).
- `public/resume/Harshit.pdf` — linked from `SOCIAL.resumeHref`, opened in
  Footer and elsewhere.
- `public/site.webmanifest` — see §5.

If the redesign introduces new hero/project imagery, keep these files
until every reference to them (grep `lib/data.js` and any component using
`ImageSlot`) is confirmed migrated — don't delete opportunistically.

## 10. Other SEO-relevant copy/behavior worth preserving

- `app/contact/page.js`, and presumably `app/about/page.js`,
  `app/work/page.js`, `app/blog/page.js` each carry their own per-route
  `metadata` (title/description/canonical) — confirm each survives if
  those route files get rewritten.
- The `keywords` list in `app/layout.js` was deliberately kept accurate as
  of the last SEO pass (see `docs/v2-deliverables.md` §8) — don't let it
  silently go stale during the redesign.

## Rollback point

Current working tree (including the not-yet-committed v2 deliverables:
`/packages` page, `PackageBuilder.js`, `UspBanner.js`,
`ConsultationCta.js`, and the SEO/schema updates to `layout.js`,
`Contact.js`, `Footer.js`, `Nav.js`, `Home.js`, `Services.js`,
`lib/data.js`, `globals.css`) was committed and tagged **`v1-pre-redesign`**
before any redesign work began. To see or restore the pre-redesign site:

```
git checkout v1-pre-redesign -- .
```

or to inspect without touching the working tree:

```
git show v1-pre-redesign:app/layout.js
```

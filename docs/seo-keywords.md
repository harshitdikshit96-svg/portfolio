# SEO keyword targets

Tracking doc for every keyword this site is optimized for — created per the
explicit ask to document the full list and where each one is placed. All of
these live in `app/layout.js`'s `metadata.keywords` array (low ranking
weight on its own, per the comment in that file, but harmless to keep
accurate for the engines/aggregators that still read it). The real ranking
signal is on-page visible copy, headings and structured data — the "Also
placed in" column is what actually moves the needle; a keyword with no
second placement is metadata-only for now.

## Explicit target list (from the user)

| Keyword | Also placed in |
|---|---|
| website developer near me | — (metadata only; "near me" queries are won mostly by Google Business Profile proximity signals, not on-page copy — see `components/GbpSection.js`) |
| website developer in Lucknow | `app/layout.js` `businessJsonLd.areaServed`, footer location line |
| freelance website developer | `app/about/page.js` meta description, FAQ "Are you a freelance website developer in Lucknow?" (`lib/data.js` → `FAQ_ITEMS`) |
| freelance website developer in Lucknow | FAQ question + answer (`lib/data.js` → `FAQ_ITEMS`) |
| portfolio website developer | Starter package tagline (`lib/data.js` → `PACKAGE_TIERS[0].tagline`), FAQ "Do you build portfolio websites?" |
| portfolio website developer in Lucknow | — (metadata only) |

## Competitor-research-derived terms

Sourced from the Lucknow web-developer competitive scan in
`docs/v2-deliverables.md` §1 (Deep Infotech, Duplex Technologies, Webguard,
Webdigitronix, Mojo Technologies, Softgen, Abhi Web Solutions, Ajay
Upadhyay, Digital Bhaiya) — these are the phrase patterns that market
appears to target.

| Keyword | Also placed in |
|---|---|
| web developer near me | — (metadata only) |
| web developer in Lucknow | — (metadata only) |
| website design Lucknow | — (metadata only) |
| website development Lucknow | — (metadata only) |
| website development company Lucknow | — (metadata only) |
| hire web developer Lucknow | — (metadata only) |
| best web developer in Lucknow | — (metadata only) |
| affordable website design Lucknow | — (metadata only) |
| small business website developer | Home hero copy targets this audience directly ("For dentists, clinics, salons and local service businesses") without using the exact phrase |
| custom website development Lucknow | Custom Web App package tier (`lib/data.js` → `PACKAGE_TIERS`) |
| ecommerce website developer Lucknow | E-commerce Website package tier |

## Pre-existing terms (carried over, unchanged)

| Keyword | Also placed in |
|---|---|
| website audit service | `/services` page (Audits category) |
| technical SEO audit | `/services` page |
| SEO audit Lucknow | — (metadata only) |
| Core Web Vitals audit | `/services` page |
| SEO management services | `/services` page (SEO & Growth category) |
| Google Business Profile optimization | `/services` page, `components/GbpSection.js` on the Contact page |
| restaurant QR ordering system developer | `/services` page (Industry Solutions category) |
| booking website development | `/services` page, Custom Web App package tier |
| technical consultant | `app/layout.js` `personJsonLd.jobTitle` |
| React developer | — (metadata only) |
| Next.js developer | — (metadata only) |
| web solutions architect | `app/layout.js` `businessJsonLd.name`, `personJsonLd.jobTitle` |
| fractional CTO | `lib/data.js` → `SERVICES` ("Technical Advisory / Fractional CTO") |
| Harshit Dixit | `app/layout.js` `personJsonLd.name`, page titles |

## Structured data already in place

- `personJsonLd` (Person) and `businessJsonLd` (ProfessionalService) in
  `app/layout.js` — `areaServed` lists Lucknow, Uttar Pradesh, and Remote.
- `FAQPage` JSON-LD emitted by `components/FaqSection.js`, generated
  directly from `FAQ_ITEMS` — several answers are written in
  near-verbatim search-query phrasing (see the two Lucknow/portfolio
  entries above) specifically so both classic SEO (featured snippets) and
  AI answer engines can extract them directly.

## Not yet done

- Most "near me" / exact-city-name long-tail phrases are metadata-only —
  weaving all of them into visible copy without keyword-stuffing would
  need more page surface area than currently exists (e.g. dedicated
  location-landing content), which wasn't part of this pass.
- The single highest-leverage thing outside this codebase: getting the
  real Google Business Profile live and verified. "Near me" and
  proximity-based queries are won there, not through on-page SEO — see
  `components/GbpSection.js` and `docs/v2-deliverables.md` §6 for what's
  still needed from Harshit directly (Google account verification can't be
  automated here).

# SEO keyword targets

## Keyword → page map (September 2026)

One page per search intent. If a new keyword fits an existing page's
intent, add it to that page's `keywords` in `lib/landings.js` rather than
creating a second page for it — two pages chasing one query split the
signal. Landing-page copy lives in `lib/landings.js`; posts in `lib/blog/`.

### Lucknow

| Page | Head term | Also written for |
|---|---|---|
| `/` (homepage) | freelance website developer in Lucknow | website developer near me (mostly won by the Google Business Profile, which links here) |
| `/website-design-lucknow` | website design lucknow | website developer in lucknow, best website developer in lucknow, website developer near me |
| `/seo-services-lucknow` | seo services lucknow | seo expert in lucknow, best seo company in lucknow, local seo services in lucknow |
| `/software-development-lucknow` | custom software development lucknow | custom software developer in lucknow, software development company in lucknow near me |
| `/ecommerce-website-development-lucknow` | ecommerce website development lucknow | ecommerce website developer lucknow |
| `/website-redesign-lucknow` | website redesign services lucknow | website redesign lucknow |
| `/digital-marketing-lucknow` | digital marketing agency lucknow | google ads management lucknow |

### India / remote

| Page | Head term | Also written for |
|---|---|---|
| `/hire-full-stack-developer-india` | hire freelance full stack developer india | hire remote full stack engineer india, react node js developer india, react js developer for hire india, full stack nextjs developer freelance |
| `/nextjs-development-company-india` | next js development company india | hire nextjs developer india, nextjs seo expert india |
| `/mvp-development-startups-india` | mvp development for startups india | custom software development services india, scalable web application development india |
| `/technical-seo-consultant-india` | technical seo consultant india | website speed optimization services india, web application performance audit india, nextjs seo expert india |
| `/fractional-cto-india` | fractional cto for early stage startups india | fractional cto india |

### Blog (informational)

| Post | Keyword |
|---|---|
| `/blog/fix-core-web-vitals-nextjs` | fix core web vitals nextjs |
| `/blog/nextjs-app-router-seo` | nextjs app router seo optimization |
| `/blog/nodejs-memory-leak-debugging` | node js memory leak debugging guide |
| `/blog/react-state-management-best-practices` | react state management best practices |
| `/blog/optimize-postgresql-query-performance` | how to optimize postgresql query performance |

### Considered and dropped

- **white label web development services india** — an agency-reseller offer the site doesn't make.
- **programmatic seo services india** — no proof on the site to back it.
- **tailwind css developer india**, **supabase developer india** — tool-level searches with low buying intent; the stack is mentioned on the pages that fit.
- **system design for high traffic applications**, **distributed systems architecture for startups** — dominated by large publishers and course platforms; not winnable from this domain yet.

---

## Earlier notes (kept for history)


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
| web developer in Lucknow | `/work` intro copy ("a Next.js and React developer based in Lucknow") |
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
| React developer | `/work` intro copy |
| Next.js developer | `/work` intro copy |
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
- `ItemList` of `CreativeWork` JSON-LD emitted by
  `components/sections/Work.js`, one entry per live/template project —
  lets search and answer engines extract "here are Harshit's actual
  projects" as structured entities instead of only unstructured card copy.

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

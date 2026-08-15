# HLD — v3 homepage/site refinement (post Claude-Design implementation)

Follow-up pass on top of the "Harshit Creates" redesign (see git log /
docs/seo-assets-baseline.md for what that shipped). This doc is the
tracking list for the next round of changes — status marked per item,
worked one at a time, updated as each lands.

## Deliverables

1. **Lean header nav** — Header carries only Home, Packages, About, and the
   "Free consultation" button. Everything else currently in the header
   (Work, Blog, Contact, Resume, LinkedIn, GitHub, the "open to freelance"
   pill) moves into the footer, which becomes the catch-all for secondary
   links.
2. **Remove the hero portrait** — the photo in the homepage hero isn't
   pulling its weight; drop it and let the hero copy/CTAs take the full
   width.
3. **Rewrite site content for AEO/SEO** — content across the site
   rewritten so it reads well both for traditional search (SEO) and for
   answer engines / AI assistants (AEO): direct, extractable
   answer-shaped copy, clear headings, concrete claims.
4. **"Why us" section redesign** — the current 5-card grid reads flat.
   Redo as a single-line, standout tile layout (carousel or equivalent)
   with hover animation so the USPs actually pop instead of blending in.
5. **De-localize service-estimate copy** — pricing/scope doesn't actually
   change by location, so stop leading every section with "Lucknow" /
   "local businesses." Keep the real local presence (address, GBP, area
   served in JSON-LD) but stop over-indexing hero/section copy on it.
6. **Hover animations on tiles** — applies across the redesigned tile-style
   sections (USP tiles, template cards, etc.) — motion on hover so the
   grid feels alive, not static.
7. **Services catalog: drop prices, add a details page** — the "beyond a
   one-time build" pricing cards lose their per-item prices (packages
   already carry pricing) and become a plain offerings list. New page
   explains, in layman's terms, what each service actually is and what
   it does for the client.
8. **"Selected work" → "Custom templates"** — replace the real client
   project showcase with genericized template cards (lorem-ipsum
   placeholder copy) demonstrating build capability rather than past
   client work. Leave a visible note under the section that real
   template content/screenshots are a follow-up, not done here.
9. **Fix the floating CTA** — the scroll-gated sticky button was
   effectively "broken" (invisible until scroll past 520px, easy to
   miss). Rebuild as an always-visible floating action button, styled
   after the persistent circular bubble pattern on shroomly.in (one of
   Harshit's own builds) — present from page load, not scroll-triggered.

## Status

| # | Item | Status |
|---|------|--------|
| 1 | Lean header nav | done |
| 2 | Remove hero portrait | done |
| 3 | AEO/SEO content rewrite | done |
| 4 | "Why us" tile redesign | done |
| 5 | De-localize copy | done |
| 6 | Hover animations on tiles | done |
| 7 | Services catalog: no prices + details page | done |
| 8 | Selected work → Custom templates | done |
| 9 | Always-on floating CTA | done |

Working these one at a time in the order above; this table gets updated
as each lands.

## v4 — pricing/promo, visual polish, GBP + keyword SEO

1. **Reduce rounding site-wide** — cards and buttons are currently very
   rounded (pill buttons, 20–28px card radii). Dial back to a tighter,
   more professional radius scale across every box and button on the
   site.
2. **Full-width promo banner** — a top-of-site strip (above the nav,
   scrolls away, not sticky) announcing a limited-time 50% off discount.
3. **Discounted package pricing** — on the package tiles, show the
   original price struck through next to the new 50% off price. Move the
   "starting at" label above the price and reword it "starts @".
4. **Rebalance add-on pricing** — add-ons keep list price (little/no
   discount, unlike the tiers) — average add-on price rebalanced to the
   ₹2,500–3,000 band.
5. **Google Business Profile section** — an actual on-page GBP section
   (previously missing), not just the conditional footer link — NAP-style
   business info plus a review/"find us on Google" call to action, ready
   to go live the moment the real GBP URL is set.
6. **Keyword SEO pass + keyword-tracking file** — optimize for the
   explicit target list (website developer near me / in Lucknow,
   freelance website developer [in Lucknow], portfolio website developer
   [in Lucknow]) plus terms competitors in the earlier research
   (docs/v2-deliverables.md §1) are likely ranking for. Document every
   targeted keyword and where it's placed in a new docs file.

### Status

| # | Item | Status |
|---|------|--------|
| 1 | Reduce rounding site-wide | done |
| 2 | Full-width promo banner | done |
| 3 | Discounted package pricing + starts@ | done |
| 4 | Rebalance add-on pricing | done |
| 5 | Google Business Profile section | done |
| 6 | Keyword SEO pass + tracking file | done |

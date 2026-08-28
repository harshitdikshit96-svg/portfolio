# Analytics setup — GTM + GA4 event tracking

Added 2026-08-28. Extends the pageview-only GTM/GA4 wiring that was
already live (see `lib/data.js`'s `GTM_ID` comment) with custom event
tracking, replicating the pattern already proven on shroomly.in's GTM
container (`GTM-PCVGG73C`) — scoped down to the subset that's actually
relevant to a lead-gen portfolio site (no ecommerce events).

## Where tracking is fired from (code side)

`lib/analytics.js` exports a single `trackEvent(name, params)` helper — a
thin wrapper around `window.dataLayer.push({ event: name, ...params })`.
No measurement code lives in the app itself; the helper just pushes a
plain object onto the dataLayer GTM's own snippet (in `app/layout.js`)
already creates. This means new tags/params can be added or changed in
the GTM UI later without another deploy.

Three events are wired up, matching GA4's recommended-event names:

- **`generate_lead`** — fired with a `lead_type` param whenever someone
  takes a lead-gen action. Sources:
  - `components/CalendlyLink.js` (`lead_type: "calendly_click"`) — the
    shared client component every "Book a free call" CTA renders through
    (HeroCarousel, Home.js, app/services/page.js, StickyCta.js all use it
    instead of a raw `<a>`, so the tracking only has to live in one place).
  - `components/ContactForm.js` (`lead_type: "contact_form"`) — fired
    right before the mailto redirect in `handleSubmit`.
  - `components/PackageBuilder.js` (`lead_type: "package_request"`) —
    fired right before the mailto redirect in `handleRequest`.
- **`select_content`** — fired with `content_type` and `item_id` params.
  Source: `components/TrackContentView.js`, a `"use client"` leaf with no
  visible output that fires once on mount via `useEffect`. Rendered from
  `app/work/[slug]/page.js` (a server component) as
  `<TrackContentView contentType="case_study" itemId={project.slug} />`.
- **`select_item`** — fired with an `item_id` param when someone picks a
  package tier. Source: `components/PackageBuilder.js`'s tier-selection
  button `onClick`.

`generate_lead`, `select_content`, and `select_item` were chosen because
they're the subset of shroomly's event set that maps to this site's
actual funnel (browse → pick a package/tier → book a call or send a
contact form). Shroomly's ecommerce-specific events — `add_to_cart`,
`begin_checkout`, `purchase`, `remove_from_cart`, `view_cart`,
`view_item` — were deliberately **not** replicated; there's no
cart/checkout/purchase flow here.

## Where it's picked up (GTM side)

Container `GTM-W97LNZG3` (account "harshitcreates", workspace 3). For
each event above, three things exist:

- A **Data Layer Variable** named `DLV - <param>` (Variable Type: "Data
  Layer Variable", Data Layer Version 2) for each event parameter key —
  `DLV - lead_type`, `DLV - content_type`, `DLV - item_id`.
- A **Custom Event trigger** named `CE - <event>` (Trigger Type: "Custom
  Event", Event name = the literal dataLayer event name, fires on all
  custom events, no extra filter conditions) — `CE - generate_lead`,
  `CE - select_content`, `CE - select_item`.
- A **"Google Analytics: GA4 Event" tag** named `GA4 - <event>`, bound to
  the existing "harshitcreates.in - Web" Google Tag config (Measurement
  ID `G-VVGYEZSR2F`) rather than a separate config, with the matching
  `CE - <event>` trigger as its firing trigger and its Event Parameters
  set to the corresponding `{{DLV - ...}}` variables.

This exactly mirrors shroomly's own tag/trigger/variable naming and
structure, confirmed by reverse-engineering shroomly's container directly
in the GTM UI before building this one.

**If you add a new tracked event:** add the `trackEvent(...)` call in
code, then in GTM add any new `DLV - <param>` variables it needs, a
`CE - <event>` trigger, and a `GA4 - <event>` tag wired to that trigger —
same three-piece pattern as above. No code deploy is needed for anything
past the initial `trackEvent` call (e.g. renaming a GA4 event param) since
that all lives in GTM.

## Publishing

New tags/triggers/variables land in the GTM **workspace** as a draft —
they don't affect the live site until the workspace is reviewed and
**Submitted** as a new container version. Always confirm with whoever
owns the site before submitting, since that's the one step that changes
real tracking behavior in production.

# Google Ads launch plan — Lucknow website/SEO test campaign

Drafted 2026-08-30. A ready-to-paste plan for a first, deliberately small (₹3,000 total)
Google Ads test — not a sustained monthly campaign. Purpose: find out whether Lucknow
search demand exists for this offer and whether the site converts cold search traffic,
before committing more budget. Every number below is a starting point to adjust once
real auction data comes in during the first few days.

**Blocker on my end:** there's no Google Ads account yet under `harshitdikshit96@gmail.com`
(checked — that address currently only has the sign-up/marketing page, no account). I can't
create one or enter billing myself (payment details are something only you can enter). Once
the account exists, ping me and I'll build this directly in the Ads UI rather than you
pasting it in by hand.

## 0. Before you create the account

- Sign up under **harshitdikshit96@gmail.com** — the same identity that already owns the
  GTM container, the GA4 property, and the just-linked Search Console property. Keeping
  everything on one identity means GA4 linking and conversion import (§5) just work,
  no cross-account sharing needed.
- The Google Ads sign-up page was showing **"₹20,000 in ad credit — sign up and complete
  billing setup to redeem your offer. Terms apply."** at the time this was written. Worth
  checking at sign-up — I haven't read the actual terms (minimum spend match requirements
  are typical for these offers), so verify before counting on it, but it could meaningfully
  extend this first test if it applies.

## 1. Campaign structure

One campaign only. At ₹3,000 total, splitting budget across a Brand campaign + multiple
Search campaigns (the usual 2026 best-practice structure) would starve everything of both
budget and the conversion data any bidding strategy needs to learn — better to keep it
simple and put every rupee behind actual prospect searches.

| Setting | Value | Why |
|---|---|---|
| Campaign type | Search | Highest-intent traffic per rupee; skip Performance Max and Display for this test — they need more budget and conversion history than ₹3k can give them. |
| Networks | Google Search only | Uncheck Search Partners — partner-network clicks are typically lower quality, not worth the risk on this small a budget. |
| Locations | Lucknow, Uttar Pradesh (city target, optionally add a ~15–20km radius) | Matches the GBP service area already set up. |
| Location options | **"Presence: people in or regularly in your targeted locations"** — not the "presence or interest" default | The default also serves people merely searching *about* Lucknow from elsewhere, which wastes budget at this scale. |
| Languages | English (add Hindi if you want to catch Hinglish/Hindi-language searches — optional, the site itself is English-only right now) | |
| Bidding | Manual CPC | No conversion history yet for Smart Bidding/Target CPA to use — automated bidding needs data it doesn't have. Start manual, revisit once there's a real conversion count. |
| Budget type | **Daily budget**, not Google's new "Campaign total budgets" feature | Total Budgets is in open beta for Search in 2026 and explicitly recommends *against* pairing it with Manual CPC (it wants automated bidding to pace itself) — adds risk for no benefit at this size. |
| Daily budget | ₹150–200/day | At ₹175/day this runs ~17 days before hitting ₹3,000 — enough runway to see real search-term data without needing daily math. |
| **Action required of you** | Check spend in the Ads UI/app every day or two and pause the campaign once it's near ₹3,000 | Daily budgets can overspend up to ~2x on a single high-traffic day (Google's own pacing behavior) — fine over a month, but worth watching closely on a budget this tight. |
| Ad extensions | Sitelinks, callouts, structured snippets (see §4) | All free — no bid cost, meaningful CTR/Quality Score lift. Skipping call extensions per your call. |

## 2. Ad groups & keywords

Landing page for every keyword: **the homepage** (per your call — visitor sees the full
picture and picks their own next step; also the simplest to set up).

Two ad groups, not more. "Dashboards"/"analytics" as standalone local searches barely
exist in Lucknow — nobody's Googling "dashboard developer Lucknow." That capability is
folded into ad copy and sitelinks instead (§4), and belongs to organic content on
`/services` longer-term rather than paid search.

### Ad group 1 — Website Design & Development

```
[website design Lucknow]
[web developer Lucknow]
[website designing company Lucknow]
"website design in Lucknow"
"web development company Lucknow"
"affordable website design Lucknow"
"cheap website developer Lucknow"
"website in 24 hours"
"website within 24 hours"
"small business website Lucknow"
"website design price"
```

### Ad group 2 — SEO & Local SEO

```
[SEO services Lucknow]
[local SEO Lucknow]
"SEO company Lucknow"
"SEO expert Lucknow"
"digital marketing agency Lucknow"
"SEO services for small business"
"Google My Business optimization Lucknow"
```

`[brackets]` = exact match, `"quotes"` = phrase match. Deliberately no broad match —
broad + Smart Bidding is the current (2026) best-practice combo, but it explicitly wants
50+ monthly conversions of history to work well; with a ₹3k test we'll have nowhere near
that, so broad match would mostly just spend on guesses. Phrase/exact keeps every click
closer to something we actually typed.

## 3. Negative keywords (campaign-level)

Blocks the traffic that would burn this budget without ever being a real prospect —
job-seekers, DIY/course-seekers, and people price-shopping domains/DIY builders rather
than looking to hire someone:

```
"free website"
"free template"
"wordpress theme"
"wordpress plugin"
"web design course"
"web developer jobs"
"web design jobs"
"seo jobs"
"internship"
"salary"
"how to make a website"
"diy website builder"
"wix"
"shopify"
"godaddy"
"hostinger"
"domain price"
"college project"
"resume"
"portfolio website examples"
```

Add to this list from the **Search Terms report** daily during the run — with this little
budget, catching one irrelevant query early matters more than usual.

## 4. Ad copy — one Responsive Search Ad per ad group

Every claim below is pulled straight from the live site (HeroCarousel, package tiers) —
nothing invented. Character-counted against Google's limits (30 for headlines, 90 for
descriptions) with a script before finalizing, so these should paste in clean.

**Headlines** (use all 12 — RSA wants at least this many for good rotation coverage):

```
Website Design in Lucknow       (25)
Websites Starting at ₹4,000     (27)
Live Website in 24 Hours        (24)
Free 30-Min Consultation        (24)
First Draft in ~3 Hours         (23)
Local Lucknow Web Team          (22)
SEO + Website Design            (20)
Remote-Friendly Service         (23)
Book a Free Strategy Call       (25)
Small Business Websites         (23)
Fast, Affordable, Local         (23)
See Our Live Work               (17)
```

For ad group 2 (SEO), swap in these two in place of two of the website-specific ones:

```
SEO Services in Lucknow         (23)
Websites, SEO & Booking         (23)
```

**Descriptions** (4, rotate all):

```
Get a live website in 24 hours, starting at just ₹4,000. Book a free 30-min call today.  (87)
Websites, SEO & booking systems for Lucknow businesses. Draft ready in about 3 hours.     (85)
See real, live client sites before you pay anything. Free consultation, no pressure.      (84)
Website design, local SEO & custom dashboards - one team, fast turnaround, fair pricing.  (88)
```

**Final URL** for both ad groups: `https://www.harshitcreates.in/`

## 5. Ad extensions (set once, apply account/campaign-wide)

**Sitelinks:**
- Packages & Pricing → `/packages`
- Our Work → `/work`
- Services → `/services`
- Book a Free Call → `/contact` (or the Calendly link directly)

**Callouts:**
- Free 30-min consultation
- First draft in ~3 hrs
- Live in 24 hours
- Remote-friendly

**Structured snippets** (header: "Services"):
- Website Design, SEO, Booking Systems, Local SEO

## 6. Conversion tracking — reuse what's already live

We just shipped and published GA4 event tracking for exactly this (see
`docs/analytics-setup.md`). No new tracking code needed — just import it:

1. In the new Ads account: **Tools & Settings → Linked accounts → Google Analytics
   (GA4)** — link the `harshitcreates.in` GA4 property (same one already linked to
   Search Console).
2. **Tools & Settings → Conversions → + New conversion action → Import → Google
   Analytics 4 properties** → select the `generate_lead` event → Import.
3. Mark `generate_lead` as the **Primary** conversion action. It already fires from
   all three lead paths (Calendly click, contact form submit, package request) — no
   need to split into separate conversion actions at this volume; one combined "lead"
   signal is the right level of granularity for a ₹3k test.
4. Set **"Count"** to *One* per click (not *Every*) — a visitor who both views a
   package and books a call shouldn't count as two leads.

## 7. What ₹3,000 realistically buys — set expectations up front

Directional only — actual Ads auction data in the first few days will tell for sure,
and these are the numbers to sanity-check the campaign against once it's running:

- India-wide B2B/digital-services CPCs generally run ₹80–400/click, but that's blended
  across metros; Lucknow (tier-2, less competition) on tightly-scoped local keywords
  with negatives applied should land meaningfully lower — a reasonable planning range
  is **₹20–40/click**.
- At that range, ₹3,000 buys roughly **75–150 clicks total** over the campaign's run.
- Cold search traffic landing on a homepage (not a dedicated high-intent landing page)
  typically converts at **2–5%** — so a realistic outcome is **single-digit leads**
  from this first ₹3k, not dozens.
- That's the honest expectation: this round is a **signal test** — does anyone search
  these terms in real volume, does the ad copy get clicked, does the homepage turn cold
  traffic into a `generate_lead` event at all — not a volume play. Use what it shows to
  decide whether (and how much) to scale, rather than judging ROI on this round alone.

## 8. Once the account + billing exist

Ping me and I'll build this directly in the Ads UI (campaign, ad groups, keywords,
negatives, both RSAs, extensions, GA4 conversion import) rather than you pasting it in
by hand — same pattern as the GTM work: I'll build it **paused**, walk you through what
I set up, and only turn it live once you've confirmed the numbers above still look right
to you.

# v2 Deliverables — harshitcreates.in Lead-Gen Relaunch

Tracking doc for the current push: turn the site into an active lead-generation tool, not just a portfolio. Status marked per item — this is a living doc, add to it as scope grows.

## 1. Competitor research (done)

Searched "website developer in Lucknow" and "web developer near me" and walked the results plus a Lucknow-specific footer-credit search (from the earlier Digital Mart Lab exercise). Findings:

- The Lucknow market is dominated by agencies (Deep Infotech, Duplex Technologies, Webguard, Webdigitronix, Mojo Technologies, Softgen) — heavy on generic "we do everything" copy, keyword-stuffed titles, little to no visible pricing.
- **Two direct solo-freelancer competitors** worth watching: **Abhi Web Solutions** (abhi-web-solutions.vercel.app — purple/blue gradient hero, "Freelance Web Developer in Lucknow / Website Development & SEO Solutions," service cards with feature checklists, no pricing shown, CTA is "Hire Web Developer") and **Ajay Upadhyay** (ajayupadhyay.online — similar personal-freelancer positioning).
- **Nobody in the visible results leads with a delivery-time promise** ("24hr delivery," "3hr draft") or a live price. That's a real gap — it's the single most differentiating thing in the USP list below, and worth keeping prominent rather than burying it.
- One agency (Digital Bhaiya) advertises websites "starting from ₹3,500/month" — a subscription-style low-anchor price point exists in this market; something to be aware of as a price-comparison point, not necessarily to match.
- Visual pattern across competitors: dark-ish or gradient hero, bold headline naming the service + city, two CTA buttons (primary "hire/start" + secondary "see services"), then a service-card grid. Our existing dark editorial look is differentiated enough — no need to copy the gradient look, just adopt the "headline names the service + city" and "two CTA buttons" pattern, which we've now done.

## 2. USPs (shipped)

Added a marketing-friendly USP strip (`components/UspBanner.js`, data in `lib/data.js` → `USPS`), placed right after the hero on the homepage and on `/packages`:

- ⚡ Website delivered in 24 hrs
- 📝 First draft in 3 hrs
- ☎️ Free online consultation
- 🎨 Free draft website
- 🌍 Remote-friendly

These are stated as real operational commitments, not vague marketing — worth a gut-check before launch that 24hr/3hr is genuinely achievable for the *standard* scope (a Starter site), since this is the kind of claim a client will hold you to.

## 3. Packages & add-ons — multi-tier selection model (shipped)

New page: **`/packages`**, component `components/PackageBuilder.js`, data in `lib/data.js` → `PACKAGE_TIERS` and `ADDONS`.

- Four base tiers: Starter Website (₹8,000+), Business Website (₹18,000+), E-commerce Website (₹35,000+), Custom Web App (₹40,000+) — matches the earlier researched catalog.
- Twelve add-ons, each independently priced and each **also sellable standalone** (a visitor who already has a site can request just "Admin Panel" or just "Booking System" without buying a full package): login/auth, admin panel, booking system, payment gateway, blog/CMS, WhatsApp integration, analytics setup, on-page SEO, multi-language, inventory management, live chat, newsletter signup.
- Interactive selector: pick a tier, toggle add-ons, see a running "starting at" total, click through to a prefilled email request — mirrors the e-commerce-style configurator you described (pick a plan, then upsell add-ons).
- Every price is labeled "starting at**" with the same negotiable disclaimer used in the earlier catalog research.

## 4. Header + navigation (shipped)

`components/Nav.js`:
- Added a **Packages** link to primary nav.
- Added a persistent **"Free consultation →"** button in both desktop and mobile nav — this is now visible on every page, not buried in a Contact link.

## 5. Consultation request block (shipped, needs your Calendly link)

New component `components/ConsultationCta.js` — an embedded scheduler block (not just a link), placed on the homepage (after Services), on `/packages`, and on `/contact`.

**Action needed from you:** it currently points at a placeholder URL (`CALENDLY_URL` in `lib/data.js`). Set up a free Calendly account (syncs to your Google Calendar — see the reasoning in the earlier catalog doc for why this beats Google's native booking page, which needs paid Workspace) and drop the real link in that one constant — every instance of the block updates automatically.

## 6. Google Business Profile (not started — needs you)

This one I can't do for you directly: creating a GBP requires signing into your own Google account and completing phone/postcard verification, which is outside what I can do on your behalf. What I can do once it exists:

- Wire the profile URL into `SOCIAL.gbpUrl` in `lib/data.js` — the footer and the `ProfessionalService` JSON-LD `sameAs` array are already coded to pick it up automatically (currently `null`, both hidden until set).
- Help draft the profile description, category selection, and initial posts once you've created it.
- Advise on getting it ranked: consistent NAP (name/address/phone) across the site and profile, the review-gathering plan from known contacts (already discussed), regular GBP posts, and the "near me" / city-qualified keyword targeting already reflected in `app/layout.js`.

## 7. Recent projects → reusable proof-of-concept templates (scoped, not built)

The idea: take Airimation, Shroomly, CarEasy, and Chaal Tracker and turn each into a genericized, deployable template a prospect can see live and imagine their own business in — much stronger proof than a static screenshot in the Work section.

This is a real build task per project (strip client-specific branding/content, replace with placeholder business data, redeploy to a template subdomain or separate Vercel project) — not something to rush into the same pass as the rest of this list. Proposed next step: pick the strongest 1–2 candidates (Airimation's booking/lead-funnel pattern and CarEasy's marketplace/WhatsApp-lead pattern both generalize well) and scope one properly before doing all four.

## 8. Other things surfaced during this pass

- **Nav crowding risk:** the desktop nav now carries logo + 6 tabs + resume link + freelance pill + a new CTA button. It's fine at the current 1024px breakpoint (switches to mobile menu below that), but worth a visual check in the 1024–1280px range where it could feel tight.
- **SEO keyword loop closed:** the `keywords` array in `app/layout.js` (left open in the last session) now includes the audit/local-SEO/OMS-derived terms from the earlier keyword research, since this pass already touched that file.
- **PackageBuilder → lead quality:** the "Request this package" button sends a prefilled email summarizing the exact tier + add-ons chosen — this turns a browse session into a qualified, specific inbound lead instead of a generic "tell me about your services" message. Worth watching whether this converts better than the plain contact form once there's traffic.
- **Not yet done:** actually verifying `npm run build` succeeds — this session's sandbox can't fetch the Next.js build binary for its CPU architecture, so only `npm run lint` (clean) ran against your real project config. Worth a `npm run dev` check on your end before treating this as final.

## Open decisions for you

1. Calendly (or alternative) account + real booking link.
2. Are the 24hr/3hr delivery claims genuinely committable for a Starter-tier scope, or should the wording be softened (e.g. "as fast as 24 hrs")?
3. Priority order for the project-to-template conversion — which 1–2 projects first?
4. When you're ready to start the GBP, want me to draft the profile description/category/initial posts as a follow-up?

// Site-wide constants: origin, contact channels, nav, USPs and social
// links. Kept small and free of page copy on purpose — client components
// (Nav, CalendlyLink, LeadActions, MobileLeadBar, ContactForm) import from
// here, and everything in this file ships in the browser bundle.

// Google Tag Manager container for harshitcreates.in (account: harshitcreates,
// under harshitdikshit96@gmail.com). GA4 (property "harshitcreates.in",
// measurement ID G-VVGYEZSR2F) is wired up as a tag inside this container
// rather than loaded directly, so future tags/pixels only need adding in
// the GTM UI, not another code deploy.
export const GTM_ID = "GTM-W97LNZG3";

// Single source of truth for the production origin — every JSON-LD block
// and per-page metadata export that needs an absolute URL reads from here.
export const SITE_URL = "https://www.harshitcreates.in";

// Single source of truth for the short role/identity line — used verbatim
// in the <title> tag, the OG share-card image, and the Person JSON-LD's
// jobTitle. These previously drifted into three different phrasings
// ("Freelance Website Developer & Technical Consultant" in the title vs.
// "Freelance Technical Consultant & Web Solutions Architect" in the OG
// image and structured data), which read as inconsistent across a single
// share-preview card. Kept short (fits the title tag's ~50-60 char SERP
// display limit) since that's the most length-constrained consumer.
export const ROLE_TAGLINE = "Freelance Web Developer & Tech Consultant";

// `header: true` marks the lean set shown in the top nav bar (desktop and
// mobile) — everything else here still shows up in the footer's "Explore"
// column, which is the catch-all for secondary links.
export const NAV_DEFS = [
  { id: "home", label: "Home", href: "/", header: true },
  { id: "packages", label: "Packages", href: "/packages", header: true },
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work", href: "/work", header: true },
  { id: "about", label: "About", href: "/about", header: true },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "/contact" },
];

// Headline reasons to pick us over a template builder or a faceless agency —
// each one is a real operational commitment, not filler copy, so the banner
// and any page that surfaces these stays honest. `id` picks the matching SVG
// in UspBanner.js's ICONS map — plain emoji were dropped because a couple of
// them rendered as empty circles on browser/OS combos without a color-emoji
// font for that codepoint; an inline SVG can't fail to render that way.
export const USPS = [
  { id: "delivery", label: "Website delivered in 24 hrs", detail: "for standard scopes, once content is shared" },
  { id: "draft", label: "First draft in 3 hrs", detail: "see it before you commit to anything" },
  { id: "consultation", label: "Free online consultation", detail: "no cost to just talk through your project" },
  { id: "preview", label: "Free draft website", detail: "a real preview, not a mockup screenshot" },
  { id: "remote", label: "Remote-friendly", detail: "same process and pricing, wherever your business is" },
];

// A single place to point every "book a call" CTA at. Swap CALENDLY_URL for
// the real scheduling link once the account exists — every consumer of this
// constant (ConsultationCta, Nav) already handles it being a placeholder.
export const CALENDLY_URL = "https://calendly.com/harshitdikshit96/30min";

// WhatsApp is the primary contact channel for this market, not email. The
// Lucknow business census behind our market research found only 5–19% of
// local businesses even publish an email address, while WhatsApp is
// universal — so every enquiry path on the site offers it as the fast
// alternative to a form.
//
// Two different numbers on purpose. WhatsApp stays on the number that has
// been published all along, so any thread already open with a prospect
// keeps working; calls go to a separate line, which also means the number
// printed in the Google Ads call asset can be swapped or tracked without
// disturbing the WhatsApp channel.
//
// Write either however is readable — both are sanitised to digits below,
// so "+91 70194 72655" and "917019472655" are equivalent. Set either to
// null to take that one channel off the site: every consumer checks for
// null and falls back to the booking link.
export const WHATSAPP_NUMBER = "+919335785136";
export const CALL_NUMBER = "+917019472655";

export const WHATSAPP_GREETING =
  "Hi Harshit — I found harshitcreates.in and wanted to talk about a website.";

// wa.me and tel: both want digits only — no "+", no spaces, no dashes.
// Sanitising here rather than demanding a particular format in the
// constants above means each number can be written however is readable
// without producing a broken link.
const toDigits = (n) => (n ?? "").replace(/\D/g, "");
const WHATSAPP_DIGITS = toDigits(WHATSAPP_NUMBER);
const CALL_DIGITS = toDigits(CALL_NUMBER);

export const WHATSAPP_URL = WHATSAPP_DIGITS
  ? `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
  : null;

// The call line. A local services buyer who is ready to talk will phone,
// and until recently the site gave them nowhere to do that. `PHONE_DISPLAY`
// is the human-readable form for on-screen text; `PHONE_URL` is the tel:
// href. Both come from CALL_NUMBER, not the WhatsApp one.
export const PHONE_DISPLAY = CALL_DIGITS
  ? `+${CALL_DIGITS.slice(0, 2)} ${CALL_DIGITS.slice(2, 7)} ${CALL_DIGITS.slice(7)}`
  : null;

export const PHONE_URL = CALL_DIGITS ? `tel:+${CALL_DIGITS}` : null;

export const SOCIAL = {
  email: "harshitdikshit96@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshitdixit96/",
  github: "https://github.com/harshitdikshit96-svg",
  resumeHref: "/resume/Harshit.pdf",
  // Every consumer (Footer, layout.js JSON-LD `sameAs`, GbpSection) reads
  // from here — set once, it shows up everywhere automatically.
  gbpUrl: "https://share.google/lrJTL6Nx1coPXB8n9",
  // Why this ISN'T the same CID-based embed used elsewhere: the GBP listing
  // behind gbpUrl is registered as a service-area business ("Areas served:
  // Lucknow and nearby areas") with no public street address — confirmed by
  // opening the listing directly (Google's own map preview for it falls
  // back to a wide, zoomed-out view of the whole Uttar Pradesh region, not
  // a Lucknow-centered pin, because there's no address to zoom to). A
  // `cid=`-based embed of that same listing inherits that same zoomed-out
  // fallback, which reads as "wrong location" even though nothing is
  // technically broken. Embedding a plain city query instead gives an
  // intentional, correctly-scoped view of the service area. If a real
  // office address is ever added to the GBP listing, switch back to a
  // `cid=`-based embed (see harshit-portfolio git history/docs) so the pin
  // reflects that exact address instead.
  gbpEmbedSrc: "https://www.google.com/maps?q=Lucknow,+Uttar+Pradesh,+India&output=embed",
  // Google's Place ID for this same GBP listing — not secret, safe to keep
  // here as a plain constant (unlike the Places API key, which is a
  // server-only env var: GOOGLE_PLACES_API_KEY). Confirmed via Place
  // Details (displayName "Harshit Creates", websiteUri harshitcreates.in)
  // — resolved from the account's own "Get more reviews" g.page link
  // rather than a name search, since this listing has no public address
  // for Places Text Search to match against. lib/gbpReviews.js uses it to
  // fetch real review content server-side; see docs/gbp-reviews-setup.md.
  gbpPlaceId: "ChIJg6vcOHleTgoRbkfPXwEmW84",
};

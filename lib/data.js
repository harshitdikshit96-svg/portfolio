// Static content for the portfolio. Computed once at module load since none
// of this depends on component state — no reason to recompute per render.

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
  { id: "blog", label: "Blog", href: "/blog", soon: true },
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
// One number drives three things — the tel: link, the wa.me link, and the
// number printed on the button — so it lives here once. Write it however
// is readable; it is sanitised to digits below, so "+91 70194 72655" and
// "917019472655" both work. Set it to null to take every phone and
// WhatsApp CTA off the site at once: each consumer checks for null and the
// booking link stays as the fallback.
export const CONTACT_NUMBER = "+917019472655";

export const WHATSAPP_GREETING =
  "Hi Harshit — I found harshitcreates.in and wanted to talk about a website.";

// wa.me wants digits only — no "+", no spaces, no dashes. Sanitising here
// rather than demanding a particular format in the constant above means the
// number can be written however is readable (+91 70194 72655) without
// producing a broken link.
const CONTACT_DIGITS = (CONTACT_NUMBER ?? "").replace(/\D/g, "");

export const WHATSAPP_URL = CONTACT_DIGITS
  ? `https://wa.me/${CONTACT_DIGITS}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
  : null;

// The tap-to-call side of the same number. A local services buyer who is
// ready to talk will call, and until recently the site gave them nowhere to
// do that. `PHONE_DISPLAY` is the human-readable form for on-screen text;
// `PHONE_URL` is the tel: href.
export const PHONE_DISPLAY = CONTACT_DIGITS
  ? `+${CONTACT_DIGITS.slice(0, 2)} ${CONTACT_DIGITS.slice(2, 7)} ${CONTACT_DIGITS.slice(7)}`
  : null;

export const PHONE_URL = CONTACT_DIGITS ? `tel:+${CONTACT_DIGITS}` : null;

// Base packages for the multi-tier selector (/packages). Prices are
// "starting at" floors, not fixed quotes — see catalog doc for the
// reasoning. `compatibleAddonIds` restricts which ADDONS are offered as
// checkboxes under each package; leave empty/omitted to allow all.
export const PACKAGE_TIERS = [
  {
    id: "starter",
    name: "Starter Website",
    tagline: "A clean, fast, mobile-ready presence — a portfolio or brochure site, done properly.",
    basePriceFrom: 4000,
    scope: "1–5 pages · static/brochure",
    includes: [
      "Responsive design (mobile + desktop)",
      "Contact form wired to your email",
      "Basic on-page SEO",
      "Free first draft within 3 hrs",
    ],
  },
  {
    id: "business",
    name: "Business Website",
    tagline: "CMS-driven, so you can edit content yourself without calling a developer every time.",
    basePriceFrom: 9000,
    scope: "5–10 pages · CMS-editable",
    includes: [
      "Everything in Starter",
      "Blog / news section",
      "Google Analytics + Search Console wired in",
      "Self-editable content via CMS",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce Website",
    tagline: "A full online store — catalog, cart, and checkout, ready to take real orders.",
    basePriceFrom: 17500,
    scope: "Product catalog · cart · payments",
    includes: [
      "Everything in Business",
      "Product catalog & inventory basics",
      "Payment gateway integration",
      "Order notifications",
    ],
  },
  {
    id: "custom",
    name: "Custom Web App",
    tagline: "Booking systems, ordering systems, internal tools — built to your exact workflow.",
    basePriceFrom: 20000,
    scope: "Scoped per project · booking/ordering/portal-class work",
    includes: [
      "Everything in Business",
      "Custom workflow logic",
      "Role-based access where needed",
      "Third-party API integrations",
    ],
  },
];

// Every add-on is also independently sellable — someone with an existing
// site can buy just the admin panel or just the login system without
// buying a full package. `standalone: true` marks those.
export const ADDONS = [
  { id: "login", name: "User Login / Authentication", price: 2100, standalone: true, desc: "Accounts, sign-in, and session handling." },
  { id: "admin-panel", name: "Admin Panel / Dashboard", price: 3300, standalone: true, desc: "A private screen to manage your own content or orders." },
  { id: "booking", name: "Booking / Appointment System", price: 3700, standalone: true, desc: "Slot-based scheduling for clinics, salons, consultants." },
  { id: "payments", name: "Payment Gateway Integration", price: 2500, standalone: true, desc: "Razorpay/Stripe-style checkout wired in." },
  { id: "blog-cms", name: "Blog / CMS Module", price: 2500, standalone: true, desc: "Publish updates without touching code." },
  { id: "whatsapp", name: "WhatsApp Chat Integration", price: 1200, standalone: true, desc: "One-tap WhatsApp from any page." },
  { id: "analytics", name: "Analytics + Search Console Setup", price: 1200, standalone: true, desc: "Know who's visiting and how they found you." },
  { id: "seo-onpage", name: "On-Page SEO Optimization", price: 2100, standalone: true, desc: "Titles, meta, schema, and structure tuned for search." },
  { id: "multilang", name: "Multi-language Support", price: 3300, standalone: true, desc: "Serve content in more than one language." },
  { id: "inventory", name: "Inventory Management Module", price: 4600, standalone: true, desc: "Track stock levels tied to your catalog." },
  { id: "live-chat", name: "Live Chat Widget", price: 1700, standalone: true, desc: "Real-time chat with visitors on your site." },
  { id: "newsletter", name: "Newsletter Signup", price: 1200, standalone: true, desc: "Capture emails and export them anytime." },
];

// Each service leads with the outcome a client is actually buying, then the
// detail, then an honest ballpark on how the engagement typically runs —
// not a fabricated price, just a realistic expectation to help people
// self-qualify before reaching out.
export const SERVICES = [
  {
    title: "Architecture & Performance Audits",
    outcome: "Find out exactly why it's slow or fragile — and what to fix first.",
    desc: "A structured review of an existing product — where it's fragile, where it's slow, and a prioritized plan to fix both before they cost you customers or engineers.",
    engagement: "Typically 1–2 weeks · delivered as a written report + prioritized fix list",
  },
  {
    title: "Full-Stack Product Builds",
    outcome: "Go from a scoped idea to a shipped, production-ready product.",
    desc: "From a scoped idea to a shipped product — React/Next.js frontend, Node.js backend, deployed and handed off cleanly, whether it's an MVP or a full rebuild.",
    engagement: "Typically 4–10 weeks · scope depends on MVP vs. full rebuild",
  },
  {
    title: "Technical Advisory / Fractional CTO",
    outcome: "Senior engineering judgment on tap, without a full-time hire.",
    desc: "Ongoing input on stack decisions, hiring, and roadmap for a founder or small team who needs senior engineering judgment without a full-time hire.",
    engagement: "Ongoing retainer · a few hours a week",
  },
  {
    title: "Website Design & Freelance App Development",
    outcome: "A site or tool built and maintained by one accountable person.",
    desc: "Website design and development, ordering/booking systems, internal tools, and integrations for individual businesses that need something built and maintained by one accountable person.",
    engagement: "Scoped per project · fixed-fee for defined work, hourly for ongoing support",
  },
];

// The "beyond a one-time build" service catalog — shown as a plain
// offerings list on the homepage (no prices; packages already carry
// pricing) and in full, layman-terms detail on /services. Distinct from
// `SERVICES` above, which is the outcome-led list used in the contact-form
// dropdown and the JSON-LD `makesOffer` array.
export const SERVICE_CATALOG = [
  {
    category: "Audits",
    slug: "audits",
    blurb: "A clear, written diagnosis of what's wrong with a site before you spend anything fixing it.",
    items: [
      {
        name: "Website Health Audit",
        summary: "A full check-up of your existing site.",
        detail:
          "We go through your website the way a visitor and a search engine both would — broken links, confusing navigation, slow pages, missing basics — and hand you a plain-English report.",
        benefit: "You know exactly what's costing you visitors and customers before you pay to fix anything.",
      },
      {
        name: "Technical SEO Audit",
        summary: "Why search engines aren't showing your site.",
        detail:
          "A look under the hood at the technical things Google actually checks — page speed, mobile-friendliness, structured data, indexing errors — explained without the jargon.",
        benefit: "You stop guessing why competitors outrank you and get a prioritized fix list instead.",
      },
      {
        name: "Core Web Vitals Audit",
        summary: "How fast and smooth your site actually feels.",
        detail:
          "We measure your site against Google's real speed/stability benchmarks and point out exactly which images, scripts or fonts are slowing it down.",
        benefit: "A faster site keeps more visitors from leaving before it even loads — and Google ranks it higher for that.",
      },
      {
        name: "Website + SEO Bundle",
        summary: "Both audits above, done together.",
        detail: "The health audit and the technical SEO audit combined into one report, at a lower combined cost than booking them separately.",
        benefit: "One conversation, one report, no duplicate work explaining your site twice.",
      },
    ],
  },
  {
    category: "SEO & Growth",
    slug: "seo-growth",
    blurb: "Ongoing, monthly work to keep a site visible and improving — not a one-time fix.",
    items: [
      {
        name: "GBP + Local SEO Management",
        summary: "Keeping your Google Business Profile active and accurate.",
        detail:
          "We manage your Google Business listing — photos, posts, hours, review replies — and the on-page signals that help you show up when someone nearby searches for what you do.",
        benefit: "More of the free, high-intent traffic that comes from people actively searching for your service.",
      },
      {
        name: "Full SEO Management",
        summary: "Ongoing, hands-off search optimization.",
        detail: "Monthly keyword tracking, content and on-page tweaks, and technical fixes — the GBP work above, plus everything else that moves search rankings over time.",
        benefit: "Your site keeps improving in search results without you having to think about it month to month.",
      },
      {
        name: "Analytics & Search Console Monitoring",
        summary: "Someone actually watching your traffic data.",
        detail: "We keep an eye on Google Analytics and Search Console for you and flag anything that needs attention — a traffic drop, a broken page, a new opportunity.",
        benefit: "Problems get caught in weeks, not discovered by accident months later.",
      },
    ],
  },
  {
    category: "Industry Solutions",
    slug: "industry-solutions",
    blurb: "Purpose-built tools for specific business types, not a generic template stretched to fit.",
    items: [
      {
        name: "Restaurant QR Ordering System",
        summary: "Scan-to-order for tables, no app required.",
        detail: "Customers scan a code at their table, browse your menu, and order straight from their phone — orders land directly with staff.",
        benefit: "Fewer order mistakes, faster table turnover, and no commission cut to a third-party app.",
      },
      {
        name: "Clinic Booking & Appointment Website",
        summary: "Online appointment slots for clinics and consultants.",
        detail: "A booking calendar wired into your site so patients or clients pick an open slot themselves instead of calling during business hours.",
        benefit: "Fewer phone interruptions for your front desk, and fewer no-shows with automatic reminders.",
      },
      {
        name: "Inventory Management System",
        summary: "A simple dashboard to track what's in stock.",
        detail: "A private screen where you or your staff update stock levels as items come in and go out, with low-stock alerts.",
        benefit: "Fewer stockouts and less time spent on manual counts or spreadsheets.",
      },
    ],
  },
  {
    category: "Ongoing Care",
    slug: "ongoing-care",
    blurb: "Fixes, updates and monitoring after launch, billed monthly.",
    items: [
      {
        name: "Website Care Plan",
        summary: "Someone accountable for your site after it ships.",
        detail: "Regular updates, security patches, small content changes and uptime monitoring, so the site doesn't quietly break or go stale after launch.",
        benefit: "One point of contact for anything that goes wrong — no scrambling to find the original developer months later.",
      },
    ],
  },
];

// Real, live sites built for real businesses — as opposed to
// TEMPLATE_PROJECTS below, which are capability demos. No fabricated
// reviews/testimonials on any of these: see the honest `detail` copy
// instead of a quote box, and only `url` when a production domain is
// actually confirmed live.
const RAW_LIVE_PROJECTS = [
  {
    slug: "airimation",
    index: "01",
    name: "Airimation",
    role: "Co-founder & site build",
    tint: "oklch(0.76 0.13 60)",
    slotId: "proj-airimation",
    image: "/images/proj-airimation.webp",
    imageLg: "/images/proj-airimation-lg.webp",
    tagline:
      "Marketing and booking site for a drone-swarm light-show startup — storyboard-to-sky choreography, live safety systems, and a lead funnel for government, festival and wedding shows.",
    detail:
      "Built end-to-end as co-founder: the public marketing site, a booking/lead funnel for government, festival and wedding shows, and the storyboard-to-sky choreography workflow behind the scenes.",
    tags: ["Next.js", "React", "Node.js"],
    status: "Live",
    url: "https://airimation.in",
  },
  {
    slug: "shroomly",
    index: "02",
    name: "Shroomly",
    role: "Freelance build",
    tint: "oklch(0.66 0.11 195)",
    slotId: "proj-shroomly",
    // No dedicated small crop was uploaded for this one — reuse the -lg shot.
    image: "/images/proj-shroomly-lg.webp",
    imageLg: "/images/proj-shroomly-lg.webp",
    tagline:
      "Production site for a mushroom-foods and knowledge-center business — shop, blog, business/FPO consulting, and an admin panel for inventory, blog posts, orders and leads.",
    detail:
      "Next.js 14 on Postgres (Neon) via Drizzle ORM, with a custom admin panel (single-admin JWT auth) for products, blog, orders and leads, plus first-party self-hosted pageview analytics — no third-party tracker, no cookie-consent banner needed.",
    tags: ["Next.js", "React", "Postgres", "Drizzle"],
    status: "Live",
    url: "https://shroomly.in",
  },
  {
    slug: "mushroom-dmr",
    index: "03",
    name: "Mushroom Society of India",
    role: "Rebuild",
    tint: "oklch(0.7 0.1 130)",
    slotId: "proj-mushroom-dmr",
    image: "/images/proj-mushroom-dmr-lg.webp",
    imageLg: "/images/proj-mushroom-dmr-lg.webp",
    tagline:
      "A modern rebuild of the Mushroom Society of India's site — journal, membership, and decades of archived research-society content migrated into a fast, navigable Next.js site.",
    detail:
      "MSI (est. 1990) publishes Mushroom Research, the society's biannual peer-reviewed journal, and runs patron/life/annual/institutional membership tiers. This rebuild migrates the society's old archived HTML — editorial board, history, back volumes, membership forms — into a structured, fast, mobile-friendly Next.js site.",
    tags: ["Next.js", "React"],
    status: "Live",
    url: "https://www.themushroomsociety.in",
  },
];

export const LIVE_PROJECTS = RAW_LIVE_PROJECTS.map((p, i) => ({ ...p, delay: i * 80 }));

// Real, working builds that demonstrate a capability — not paid client
// engagements. Framed honestly as concept/demo builds rather than claiming a
// client relationship; a couple are modeled on real local businesses using
// their public information, same as a spec pitch, not a live deployment.
const RAW_TEMPLATE_PROJECTS = [
  {
    slug: "careasy",
    index: "01",
    name: "CarEasy",
    role: "Freelance build",
    tint: "oklch(0.76 0.13 60)",
    slotId: "proj-careasy",
    image: "/images/proj-careasy-lg.webp",
    imageLg: "/images/proj-careasy-lg.webp",
    tagline:
      "Used-car marketplace concept — listings, comparison, and a WhatsApp-first lead flow built for fast buyer decisions.",
    detail:
      "A marketplace-pattern build: browsable listings, side-by-side comparison, and a WhatsApp-first contact flow instead of a slow contact form — the pattern generalizes to any classifieds or listings-led business.",
    tags: ["Next.js", "React"],
    status: "Live demo",
    url: "https://careasy-tau.vercel.app/",
  },
  {
    slug: "chaal-tracker",
    index: "02",
    name: "Chaal Tracker",
    role: "Side project",
    tint: "oklch(0.66 0.11 195)",
    slotId: "proj-chaal",
    image: "/images/proj-chaal-lg.webp",
    imageLg: "/images/proj-chaal-lg.webp",
    tagline:
      "A no-fuss poker-night companion — host a session, track the pot in powers of two, and settle up without spreadsheets.",
    detail:
      "A small, focused real-time utility app — session hosting, live pot tracking, and settle-up math, no spreadsheet. Shows the same real-time-state pattern that powers order/queue tracking for a business.",
    tags: ["React", "TypeScript"],
    status: "Live demo",
    url: "https://chaal-tracker.vercel.app/",
  },
  {
    slug: "oms",
    index: "03",
    name: "Restaurant QR Ordering System",
    role: "Concept build",
    tint: "oklch(0.76 0.13 60)",
    slotId: "proj-oms",
    image: "/images/proj-oms-lg.webp",
    imageLg: "/images/proj-oms-lg.webp",
    tagline:
      "Scan-to-order for restaurant tables — a QR code per table opens the menu, sends the order straight to a kitchen dashboard, no app download.",
    detail:
      "Each table gets its own QR code and order token; orders land on a live kitchen dashboard and an admin panel tracks status end to end. This is the exact build behind the \"Restaurant QR Ordering System\" listed on the Services page.",
    tags: ["Next.js", "Prisma"],
    status: "Not deployed",
    url: null,
  },
  {
    slug: "clinic-template",
    index: "04",
    name: "Dental Clinic Booking Template",
    role: "Template build",
    tint: "oklch(0.7 0.1 130)",
    slotId: "proj-clinic-template",
    // No dedicated small crop was uploaded for this one — reuse the -lg shot.
    image: "/images/proj-clinic-template-lg.webp",
    imageLg: "/images/proj-clinic-template-lg.webp",
    tagline:
      "A dental-clinic booking site template — appointment requests, service menu, hours and location — genericized from a real client build so it's ready to re-skin for any local clinic or salon.",
    detail:
      "An appointment-request flow (form → database, no payment) plus a full clinic site: services, hours, doctors, and location — every business detail lives in a single data file, so pointing it at a real business's name, contact info and address re-skins the whole site with no other code changes. Shows the booking/local-SEO pattern for any clinic, salon or consultant business.",
    tags: ["Next.js", "Tailwind", "Postgres"],
    status: "Not deployed",
    url: null,
  },
];

export const TEMPLATE_PROJECTS = RAW_TEMPLATE_PROJECTS.map((t, i) => ({ ...t, delay: i * 70 }));

const RAW_EXPERIENCE = [
  {
    period: "Nov 2024 – Jan 2026",
    role: "Software Engineer II — Frontend (Full-stack)",
    company: "Acko Insurance",
    desc: "Led frontend and full-stack delivery across insurance product lines — architected a distributed policy-issuance engine, owned a savings-rewards program end to end, and built RTO-integrated challan tooling.",
  },
  {
    period: "Jul 2021 – Sep 2024",
    role: "Software Engineer I",
    company: "Bigbasket (TATA Enterprise)",
    desc: "Owned performance and checkout experience for a high-traffic grocery platform — rebuilt the checkout flow for speed, shipped a real-time dynamic charges engine, and scaled a rewards program to a large subscriber base.",
  },
];
export const EXPERIENCE = RAW_EXPERIENCE.map((e, i) => ({ ...e, delay: i * 130 }));

const RAW_SKILL_GROUPS = [
  { label: "frontend", items: ["React", "Next.js", "TypeScript", "Redux/Zustand", "Core Web Vitals"] },
  { label: "backend", items: ["Node.js", "Express", "PostgreSQL", "Redis"] },
  { label: "infra", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
];
export const SKILL_GROUPS = RAW_SKILL_GROUPS.map((g, i) => ({ ...g, delay: i * 100 }));

export const TALKS = [
  { org: "Bennett University", topic: "GenAI in Practice: Industry Perspective" },
  { org: "LNMIIT Jaipur", topic: "engineering fundamentals & industry readiness" },
];

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

// Direct, self-contained Q&A pairs — written for both traditional SEO
// (featured snippets) and answer-engine/AI-assistant extraction (AEO):
// each answer leads with the concrete fact, no scene-setting. Rendered on
// the homepage via FaqSection.js, which also emits the matching FAQPage
// JSON-LD from this exact list — keep the two in sync.
export const FAQ_ITEMS = [
  {
    question: "How fast can you build a website?",
    answer:
      "Standard-scope sites go live in as fast as 24 hours once content is ready, with a free first working draft in about 3 hours so you see real work before paying anything.",
  },
  {
    question: "Do you only work with businesses in Lucknow?",
    answer:
      "No. Pricing, process and turnaround are the same regardless of where your business is — Lucknow is just where the work is based. Every consultation, draft and handoff happens remotely the same way for local and out-of-state clients alike.",
  },
  {
    question: "Are you a freelance website developer in Lucknow?",
    answer:
      "Yes — I'm a freelance website developer based in Lucknow, building websites for local and remote clients alike. If you're searching for a website developer near you, this is exactly the kind of work I take on, whether that's a portfolio site, a business site, or a booking/ordering system.",
  },
  {
    question: "Do you build portfolio websites?",
    answer:
      "Yes — personal and professional portfolio websites are one of the most common Starter-package builds, alongside business, e-commerce and booking sites.",
  },
  {
    question: "How much does a website cost?",
    answer: `Packages start at ₹${PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")} for a Starter site and scale up from there based on scope — see the full breakdown on the packages page. Every price is a negotiable starting point, confirmed together on a free consultation call.`,
  },
  {
    question: "What's included in the free consultation?",
    answer:
      "A free 30-minute call to talk through what you need, plus a free first working draft of the site itself — not a mockup screenshot — before you commit to anything.",
  },
  {
    question: "Can I just add one feature to my existing website?",
    answer:
      "Yes. Every add-on — login/auth, booking, payments, an admin panel, and more — is sellable standalone, without buying a full package.",
  },
  {
    question: "Do you offer anything beyond building the website?",
    answer:
      "Yes — audits, ongoing SEO management, and post-launch care plans are all available separately. See the services page for what each one is and how it helps.",
  },
];

// ---------------------------------------------------------------------------
// Recurring work. PACKAGE_TIERS above covers one-time builds; this covers the
// monthly side, which had prices nowhere on the site before — /services
// described SEO management and care plans in detail but never said what they
// cost, so the only number a visitor ever saw was the ₹4,000 build floor.
// That is the single reason the whole offer read as "cheap websites" rather
// than "an agency you can retain".
//
// `marketFrom` is the low end of what Lucknow agencies charge for the same
// thing (see the Lucknow market research doc: local SEO ₹12,000–25,000/mo,
// Google Ads management ₹8,000–25,000/mo, full retainers ₹25,000–35,000/mo).
// It's shown next to our own price on purpose — a lower number on its own
// reads as "not a real vendor", the same number next to what everyone else
// charges reads as the saving it actually is.
// ---------------------------------------------------------------------------
export const RETAINERS = [
  {
    id: "local-seo",
    name: "Local SEO",
    priceFrom: 8000,
    marketFrom: 12000,
    scope: "Google Business Profile + on-page, monthly",
    summary: "Show up when someone nearby searches for what you do.",
    includes: [
      "Google Business Profile managed — posts, photos, hours, review replies",
      "Local citations and NAP consistency",
      "On-page and location-page optimisation",
      "Monthly ranking and enquiry report",
    ],
  },
  {
    id: "ads",
    name: "Google Ads Management",
    priceFrom: 6000,
    marketFrom: 8000,
    scope: "Monthly, or 12% of ad spend — whichever is higher",
    summary: "Paid search run by someone who tracks whether it actually produced an enquiry.",
    includes: [
      "Campaign build, keyword and negative-keyword management",
      "Conversion tracking wired properly — real enquiries, not page views",
      "Search-term review and bid management",
      "Monthly report in cost-per-enquiry, not impressions",
    ],
  },
  {
    id: "growth",
    name: "Growth Retainer",
    priceFrom: 14000,
    marketFrom: 25000,
    scope: "SEO + Ads + reporting, monthly",
    summary: "Everything above, run together, with one person accountable for the number of enquiries.",
    includes: [
      "Everything in Local SEO and Google Ads Management",
      "Content and landing-page work each month",
      "Analytics and Search Console monitored, not just installed",
      "One monthly call to go through what worked",
    ],
  },
  {
    id: "care",
    name: "Website Care Plan",
    priceFrom: 2500,
    marketFrom: null,
    scope: "Updates, monitoring and small changes, monthly",
    summary: "Someone accountable for the site after it ships.",
    includes: [
      "Security patches and dependency updates",
      "Uptime monitoring",
      "Small content and copy changes",
      "One point of contact when something breaks",
    ],
  },
];

// ---------------------------------------------------------------------------
// Keyword-targeted local landing pages.
//
// Why these exist: every Google Ads ad group used to point at the homepage.
// A homepage has to speak to everyone, so cold paid traffic landed on copy
// that answered none of the question they'd just typed — which is a large
// part of why the campaign produced no enquiries. Each entry below is a
// page written for one search, with the matching offer and the enquiry form
// on it, and is the landing page its ad group should point to.
//
// `keyword` and `volume` are the real Keyword Planner figures for Lucknow
// (Aug 2025 – Jul 2026) that justify the page existing — kept here so the
// reasoning stays attached to the page rather than living only in a doc.
// ---------------------------------------------------------------------------
export const LOCAL_LANDINGS = [
  {
    slug: "digital-marketing-lucknow",
    keyword: "digital marketing agency lucknow",
    volume: 4400,
    navLabel: "Digital Marketing",
    serviceType: "Digital marketing services",
    h1: "Digital Marketing Agency in Lucknow",
    metaTitle: "Digital Marketing Agency in Lucknow",
    metaDescription:
      "Lucknow digital marketing run by one engineer, not a call centre — SEO, Google Ads and the website itself. Retainers from ₹14,000/month. Free 20-minute check of your listing.",
    lede:
      "Most Lucknow agencies will sell you a monthly retainer and report impressions. I build the site, run the search and the ads on it, and report the only number that matters — how many real enquiries came in.",
    problem: [
      "You are paying for marketing and can't tell what it produced.",
      "Your competitors show up on Google Maps and you don't.",
      "Enquiries come in on WhatsApp and nobody follows them up.",
    ],
    retainerIds: ["growth", "ads", "local-seo"],
    packageIds: [],
    proofSlugs: ["shroomly", "airimation", "mushroom-dmr"],
    faqs: [
      {
        question: "How much does a digital marketing agency in Lucknow cost?",
        answer:
          "Lucknow agencies typically start around ₹15,000 a month and run to ₹35,000 for a full retainer. Here a Growth Retainer — SEO, Google Ads and monthly reporting together — starts at ₹14,000 a month, and single services start lower: Local SEO from ₹8,000 and Google Ads management from ₹6,000.",
      },
      {
        question: "What makes this different from a bigger agency?",
        answer:
          "You get one engineer who builds and runs everything, instead of an account manager relaying instructions to a team you never meet. That means fewer clients at a time, and it means the person changing the website is the same person reading the analytics.",
      },
      {
        question: "Do I need a new website first?",
        answer:
          "Not always. If the current site loads fast and converts, the work is SEO and ads on top of it. The free 20-minute check tells you which of the two you actually need before you spend anything.",
      },
    ],
  },
  {
    slug: "software-development-lucknow",
    keyword: "software company lucknow",
    volume: 1600,
    navLabel: "Software & Automation",
    serviceType: "Custom software development",
    h1: "Custom Software & Automation, Built in Lucknow",
    metaTitle: "Software Development Company in Lucknow",
    metaDescription:
      "Custom software, dashboards, booking and ordering systems built in Lucknow by an ex-Acko, ex-Bigbasket engineer. Scoped on a call, built from ₹20,000.",
    lede:
      "Booking systems, ordering systems, admin dashboards, internal tools and the automation that connects them — built by an engineer who spent five years shipping production software at Bigbasket and Acko, not outsourced to a template.",
    problem: [
      "Your team runs the business out of WhatsApp threads and spreadsheets.",
      "You want a dashboard that shows your real numbers, not a monthly PDF.",
      "Off-the-shelf software almost fits, and the gap costs staff hours every week.",
    ],
    retainerIds: ["care"],
    packageIds: ["custom", "ecommerce"],
    proofSlugs: ["oms", "clinic-template", "chaal-tracker"],
    faqs: [
      {
        question: "What kind of software do you build?",
        answer:
          "Booking and appointment systems, restaurant QR ordering, inventory and admin dashboards, customer portals, and integrations between tools a business already uses. Anything web-based where an off-the-shelf product doesn't quite fit the workflow.",
      },
      {
        question: "How is a custom build priced?",
        answer:
          "Custom work starts at ₹20,000 and is scoped on a call, because the honest answer depends entirely on what it has to do. You get a fixed quote for a defined scope before any work begins — no hourly billing on a moving target.",
      },
      {
        question: "Can you automate our WhatsApp enquiries?",
        answer:
          "Yes. Enquiry and booking automation — web form, WhatsApp and calendar wired into one flow with automatic follow-up — is one of the most common requests, and usually the fastest to pay for itself in reclaimed staff time.",
      },
    ],
  },
  {
    slug: "seo-services-lucknow",
    keyword: "seo services lucknow",
    volume: 880,
    navLabel: "SEO Services",
    serviceType: "Search engine optimisation",
    h1: "SEO Services in Lucknow",
    metaTitle: "SEO Services in Lucknow",
    metaDescription:
      "Local SEO for Lucknow businesses from ₹8,000/month — Google Business Profile, technical fixes and monthly reporting. Free audit before you commit to anything.",
    lede:
      "Two thirds of the businesses in Lucknow don't have a website at all, and most of the ones that do have never had the technical basics checked. That is the opportunity — local search here is far less contested than the agencies pitching you will admit.",
    problem: [
      "You rank below competitors with worse products and older websites.",
      "Your Google Business Profile is out of date or barely filled in.",
      "Someone set up Analytics once and nobody has looked at it since.",
    ],
    retainerIds: ["local-seo", "growth"],
    packageIds: [],
    proofSlugs: ["shroomly", "mushroom-dmr"],
    faqs: [
      {
        question: "How much do SEO services cost in Lucknow?",
        answer:
          "Local agencies quote ₹12,000–25,000 a month for local SEO. Here it starts at ₹8,000 a month, and a full Growth Retainer that adds Google Ads and monthly reporting starts at ₹14,000.",
      },
      {
        question: "How long before SEO works?",
        answer:
          "Google Business Profile and local map results can move within weeks. Organic rankings for competitive terms realistically take three to six months. Anyone promising page one in thirty days is either guessing or selling you something else.",
      },
      {
        question: "Do I get a report I can actually read?",
        answer:
          "Monthly, in plain language — what moved, what didn't, and how many enquiries came from search. Not a forty-page automated PDF of keyword positions nobody opens.",
      },
    ],
  },
  {
    slug: "website-design-lucknow",
    keyword: "website design lucknow",
    volume: 480,
    navLabel: "Website Design",
    serviceType: "Website design and development",
    h1: "Website Design in Lucknow",
    metaTitle: "Website Design & Development in Lucknow",
    metaDescription:
      "Websites for Lucknow businesses from ₹4,000 for a simple static site and ₹9,000 for a full CMS business site — against a local market that starts at ₹15,000. Free first draft in about 3 hours.",
    lede:
      "A real, working first draft in about three hours — before you pay anything. Standard-scope sites go live within 24 hours of the content arriving. Every price below is scoped, so you know exactly what the number buys.",
    problem: [
      "Customers search for you, find nothing, and call someone else.",
      "You have an Instagram page doing the job a website should be doing.",
      "The last developer disappeared and nobody can edit the site.",
    ],
    retainerIds: ["care", "local-seo"],
    packageIds: ["starter", "business", "ecommerce", "custom"],
    proofSlugs: ["airimation", "shroomly", "careasy"],
    faqs: [
      {
        question: "What does a ₹4,000 website actually include?",
        answer:
          "That is the Starter tier: a 1–5 page static or brochure site — responsive on mobile and desktop, a contact form wired to you, and basic on-page SEO. It is a real website, deliberately scoped small. A CMS-driven business site you can edit yourself starts at ₹9,000, and e-commerce at ₹17,500.",
      },
      {
        question: "Why is this cheaper than the agencies quoting ₹15,000 and up?",
        answer:
          "No office, no account managers, no sales team — one engineer with low overhead. The same reason the turnaround is shorter. The scope of each tier is published above so you can compare it against any quote you've been given rather than taking that on faith.",
      },
      {
        question: "Can I see the site before I pay?",
        answer:
          "Yes — the free first draft is a real working preview at a live link, not a mockup image. If it isn't right, you have paid nothing.",
      },
    ],
  },
];

// Static content for the portfolio. Computed once at module load since none
// of this depends on component state — no reason to recompute per render.

// Google Tag Manager container for harshitcreates.in (account: harshitcreates,
// under harshitdikshit96@gmail.com). GA4 (property "harshitcreates.in",
// measurement ID G-VVGYEZSR2F) is wired up as a tag inside this container
// rather than loaded directly, so future tags/pixels only need adding in
// the GTM UI, not another code deploy.
export const GTM_ID = "GTM-W97LNZG3";

// Single source of truth for the current promo: the top banner and every
// package-tier price (PackageBuilder) both read `discountPct` from here, so
// changing or ending the offer is a one-line edit. Add-ons are deliberately
// NOT discounted — see the note on ADDONS below.
export const PROMO = {
  active: true,
  discountPct: 50,
  message: "Launch offer — 50% off every website package this month.",
};

// Rounds to the nearest ₹100 so discounted prices stay clean round numbers
// rather than showing paise-level noise.
export const getDiscountedPrice = (from) =>
  PROMO.active ? Math.round((from * (1 - PROMO.discountPct / 100)) / 100) * 100 : from;

// `header: true` marks the lean set shown in the top nav bar (desktop and
// mobile) — everything else here still shows up in the footer's "Explore"
// column, which is the catch-all for secondary links.
export const NAV_DEFS = [
  { id: "home", label: "Home", href: "/", header: true },
  { id: "packages", label: "Packages", href: "/packages", header: true },
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work", href: "/work" },
  { id: "about", label: "About", href: "/about", header: true },
  { id: "blog", label: "Blog", href: "/blog", soon: true },
  { id: "contact", label: "Contact", href: "/contact" },
];

// Headline reasons to pick us over a template builder or a faceless agency —
// each one is a real operational commitment, not filler copy, so the banner
// and any page that surfaces these stays honest.
export const USPS = [
  { icon: "⚡", label: "Website delivered in 24 hrs", detail: "for standard scopes, once content is shared" },
  { icon: "📝", label: "First draft in 3 hrs", detail: "see it before you commit to anything" },
  { icon: "☎️", label: "Free online consultation", detail: "no cost to just talk through your project" },
  { icon: "🎨", label: "Free draft website", detail: "a real preview, not a mockup screenshot" },
  { icon: "🌍", label: "Remote-friendly", detail: "same process and pricing, wherever your business is" },
];

// A single place to point every "book a call" CTA at. Swap CALENDLY_URL for
// the real scheduling link once the account exists — every consumer of this
// constant (ConsultationCta, Nav) already handles it being a placeholder.
export const CALENDLY_URL = "https://calendly.com/harshitdikshit96/30min";

// Base packages for the multi-tier selector (/packages). Prices are
// "starting at" floors, not fixed quotes — see catalog doc for the
// reasoning. `compatibleAddonIds` restricts which ADDONS are offered as
// checkboxes under each package; leave empty/omitted to allow all.
export const PACKAGE_TIERS = [
  {
    id: "starter",
    name: "Starter Website",
    tagline: "A clean, fast, mobile-ready presence — a portfolio or brochure site, done properly.",
    basePriceFrom: 8000,
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
    basePriceFrom: 18000,
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
    basePriceFrom: 35000,
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
    basePriceFrom: 40000,
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
// Add-ons deliberately sit outside the package-tier discount (PROMO only
// applies to base tier prices). Priced at a flat ~17% cut off the previous
// list (rounded to a clean ₹100) — that works out to an average ₹508 off
// per add-on, and brings the list average down to ~₹2,450.
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

const RAW_PROJECTS = [
  {
    index: "01",
    name: "Airimation",
    role: "Co-founder & site build",
    tint: "oklch(0.76 0.13 60)",
    slotId: "proj-airimation",
    image: "/images/proj-airimation.webp",
    imageLg: "/images/proj-airimation-lg.webp",
    tagline:
      "Marketing and booking site for a drone-swarm light-show startup — storyboard-to-sky choreography, live safety systems, and a lead funnel for government, festival and wedding shows.",
    tags: ["Next.js", "React", "Node.js"],
    url: "https://airimation.in",
  },
  {
    index: "02",
    name: "Shroomly",
    role: "Freelance build",
    tint: "oklch(0.66 0.11 195)",
    slotId: "proj-shroomly",
    // No dedicated small crop was uploaded for this one — reuse the -lg shot.
    image: "/images/proj-shroomly-lg.webp",
    imageLg: "/images/proj-shroomly-lg.webp",
    tagline:
      "Pre-launch brand site for a mushroom products business — positioning, product lineup, and a B2B contact flow ahead of its first harvest.",
    tags: ["Next.js", "React"],
    url: "https://shroomly.in",
  },
  {
    index: "03",
    name: "CarEasy",
    role: "Freelance build",
    tint: "oklch(0.76 0.13 60)",
    slotId: "proj-careasy",
    image: "/images/proj-careasy-lg.webp",
    imageLg: "/images/proj-careasy-lg.webp",
    tagline:
      "Used-car marketplace concept — listings, comparison, and a WhatsApp-first lead flow built for fast buyer decisions.",
    tags: ["Next.js", "React"],
    url: "https://careasy-tau.vercel.app/",
  },
  {
    index: "04",
    name: "Chaal Tracker",
    role: "Side project",
    tint: "oklch(0.66 0.11 195)",
    slotId: "proj-chaal",
    image: "/images/proj-chaal-lg.webp",
    imageLg: "/images/proj-chaal-lg.webp",
    tagline:
      "A no-fuss poker-night companion — host a session, track the pot in powers of two, and settle up without spreadsheets.",
    tags: ["React", "TypeScript"],
    url: "https://chaal-tracker.vercel.app/",
  },
];

export const PROJECTS = RAW_PROJECTS.map((p, i) => ({ ...p, delay: i * 80 }));

// Generic build-capability showcase for the homepage — genericized
// (lorem-ipsum copy, no client names/screenshots) rather than real client
// work, which lives on /work instead. Swap in real template previews here
// once they exist; see the note rendered under this section on the
// homepage.
const RAW_TEMPLATE_SHOWCASE = [
  {
    name: "Restaurant & Café",
    tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    name: "Clinic & Salon Booking",
    tagline: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  },
  {
    name: "Local Retail & Services",
    tagline: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Booking & Ordering App",
    tagline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
  },
];
export const TEMPLATE_SHOWCASE = RAW_TEMPLATE_SHOWCASE.map((t, i) => ({ ...t, delay: i * 70 }));

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
  // The no-API-key Maps embed trick (?output=embed) needs a numeric CID
  // rather than the share link above — resolved by following the share
  // link through to its Maps place page, whose hex feature ID converts to
  // this decimal. Swap this if the profile's Maps listing ever changes.
  gbpEmbedSrc: "https://www.google.com/maps?cid=16389083201720469065&output=embed",
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
    answer: `Packages start at ₹${getDiscountedPrice(PACKAGE_TIERS[0].basePriceFrom).toLocaleString("en-IN")} for a Starter site${
      PROMO.active ? ` (${PROMO.discountPct}% off the usual ₹${PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")}, for a limited time)` : ""
    } and scale up from there based on scope — see the full breakdown on the packages page. Every price is a negotiable starting point, confirmed together on a free consultation call.`,
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

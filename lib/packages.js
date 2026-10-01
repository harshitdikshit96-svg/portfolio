// Website packages, add-ons and monthly retainers. Imported client-side by
// PackageBuilder and HeroCarousel, so keep it to package data only.

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

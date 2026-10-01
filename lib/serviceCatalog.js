// The plain-language service catalog rendered on the homepage and
// /services. Server-only in practice; kept out of lib/services.js so the
// contact form's dropdown doesn't pull this copy into the client bundle.

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

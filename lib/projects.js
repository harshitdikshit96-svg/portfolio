// Case-study data for /work, /work/[slug], the homepage and the landing
// pages' proof sections. Server-rendered only — import it from server
// components, never from a "use client" file, or every case study's full
// story ships to the browser.

// Real, live sites built for real businesses — as opposed to
// TEMPLATE_PROJECTS below, which are capability demos. No fabricated
// reviews/testimonials on any of these: see the honest `detail` copy
// instead of a quote box, and only `url` when a production domain is
// actually confirmed live.
const RAW_LIVE_PROJECTS = [
  {
    slug: "airimation",
    metaDescription:
      "Marketing and booking site for a drone light-show startup — show choreography, safety systems and a lead funnel for government, festival and wedding shows.",
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
      "Built end-to-end as co-founder: the public marketing site, a booking/lead funnel for government, festival and wedding shows, a scroll-driven swarm animation, and a show simulator that lets a visitor design a drone show and share it as a link.",
    // Long-form case study, rendered as its own sections on /work/[slug].
    // Written from Harshit's own account of each project — no figure here
    // that he hasn't given.
    story: {
      brief:
        "Airimation is an early-stage drone light-show company in New Delhi, building Biscope — a pipeline that takes a client's story from storyboard to a choreographed swarm of hundreds of LED drones. At the prototype stage, it needed more than a brochure: a site that could make investors and clients see a drone show before a single drone had flown.",
      challenge:
        "A drone show is hundreds of independent objects moving in formation. Rendering that in a browser, alongside an ordinary marketing site, meant animating a large number of objects at once while keeping the page responsive — no stutter on scroll, no delay before the content appears, and smooth on a normal phone, not just a fast laptop. The biggest single piece of work was the show simulator itself.",
      approach:
        "The swarm is drawn on a canvas rather than built from page elements, so hundreds of drones cost one paint instead of hundreds of layout updates. Visitors scroll through lift-off, formation and the Biscope pipeline as the swarm flies. The \u201cDesign your show\u201d simulator lets anyone pick a fleet size and a set of formations, plays the show over a night sky, and produces a link they can send to whoever else is deciding.",
      timeline: "13 days, from the first discussion to final delivery.",
      outcome:
        "Airimation is still prototyping its hardware, and the simulator does a job no pitch deck can: investors watch a show the company designed instead of imagining one. It has become a central part of how the company pitches.",
    },
    tags: ["Next.js", "React", "Node.js"],
    status: "Live",
    url: "https://airimation.in",
  },
  {
    slug: "shroomly",
    metaDescription:
      "Production Next.js site for a mushroom-foods business — shop, blog and consulting, with an admin panel for inventory, posts, orders and leads.",
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
    story: {
      brief:
        "Shroomly is a mushroom-foods business that is also a knowledge centre: it sells products online, publishes guides, and consults for farmers and farmer-producer organisations (FPOs). It needed one site that does both jobs — a working shop and a content library — and that a small team could run without a developer on call.",
      challenge:
        "Nothing in it was exotic; e-commerce is familiar ground after three years on Bigbasket's checkout. The difficulty was the number of moving parts: catalogue, cart and orders, a blog, consulting enquiries, and an admin panel to run all of it. The client also wanted full visibility into how the site was used, and the tracking turned out to be as much work as the shop.",
      approach:
        "The site runs on Next.js with a PostgreSQL database and one admin panel for products, stock, orders, blog posts and leads. Analytics is layered: first-party pageview analytics built into the site itself, plus Google Analytics 4 through Google Tag Manager for marketing, and Search Console connected from launch so search performance was measured from day one.",
      timeline: "22 days from the first discussion to final delivery — most of it on the analytics, tracking and admin work rather than the storefront.",
      outcome:
        "The owner runs the whole business — products, stock, orders, content and leads — from one admin panel, and can see from launch day where visitors come from and what they do, in the site's own analytics and in GA4.",
    },
    tags: ["Next.js", "React", "Postgres", "Drizzle"],
    status: "Live",
    url: "https://shroomly.in",
  },
  {
    slug: "mushroom-dmr",
    metaDescription:
      "A Next.js rebuild of the Mushroom Society of India's site — journal, membership and decades of archived research content, made fast and navigable.",
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
      "MSI (est. 1990) publishes Mushroom Research, the society's biannual peer-reviewed journal, and runs patron/life/annual/institutional membership tiers. After the old site's domain expired and the site disappeared, its content — editorial board, history, back volumes, membership forms — was recovered from web archives and rebuilt as a structured, fast, mobile-friendly Next.js site.",
    story: {
      brief:
        "The Mushroom Society of India publishes Mushroom Research, its peer-reviewed journal, and runs membership for researchers and institutions. Its website's domain had expired, the site had gone offline, and the society had no usable copy of the content. The quotes it received elsewhere were high, came with long timelines, and assumed the society could hand over all of its content itself.",
      challenge:
        "There was nothing to migrate from. Before the site could be rebuilt, it had to be found.",
      approach:
        "The old site was recovered page by page from public web archives — the slow part, but it brought back most of the society's content: the editorial board, history, journal back volumes and membership forms. That content was then restructured into a fast, mobile-friendly Next.js site, so the society is no longer depending on a single set of hand-written HTML files.",
      timeline: "5 days, from recovering the old site out of the archives to launching the new one.",
      outcome:
        "The society has its site back, with its archive intact, delivered in days rather than months and for a fraction of what it had been quoted. As a research society's site it needs no marketing or tracking stack — just to be online, readable and easy to keep up to date.",
    },
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
      "Built as a demo for a used-car dealer: browsable listings, side-by-side comparison, and a WhatsApp-first contact flow instead of a slow contact form — the pattern generalizes to any classifieds or listings-led business.",
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
      "Built in about two hours on a trip, for a poker night in a shared dorm where nobody had chips: host a session, track the pot live, and settle up at the end. Small, but it's the same real-time-state pattern that powers order and queue tracking for a business.",
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
      "Built as a ready-to-deploy template to help restaurants and cafés move to online ordering. Each table gets its own QR code and order token; orders land on a live kitchen dashboard and an admin panel tracks status end to end. This is the exact build behind the \"Restaurant QR Ordering System\" listed on the Services page.",
    tags: ["Next.js", "Prisma"],
    status: "Not deployed",
    url: null,
  },
  {
    slug: "clinic-template",
    metaDescription:
      "A dental-clinic booking site template — appointment requests, services, hours and location — ready to re-skin for any local clinic or salon.",
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

// Static content for the portfolio. Computed once at module load since none
// of this depends on component state — no reason to recompute per render.

export const NAV_DEFS = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/work" },
  { id: "about", label: "About", href: "/about" },
  { id: "blog", label: "Blog", href: "/blog", soon: true },
  { id: "contact", label: "Contact", href: "/contact" },
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
    title: "Freelance Web & App Development",
    outcome: "A site or tool built and maintained by one accountable person.",
    desc: "Websites, ordering/booking systems, internal tools, and integrations for individual businesses that need something built and maintained by one accountable person.",
    engagement: "Scoped per project · fixed-fee for defined work, hourly for ongoing support",
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
export const HOME_PROJECTS = PROJECTS.slice(0, 2);

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

const RAW_FACT_CHIPS = [
  { label: "EXPERIENCE", value: "5+ years, Acko & Bigbasket" },
  { label: "EDUCATION", value: "IIIT Lucknow, B.Tech IT" },
  { label: "FOCUS", value: "React/Next.js, systems, performance" },
];
export const FACT_CHIPS = RAW_FACT_CHIPS.map((f, i) => ({ ...f, delay: i * 90 }));

const MARQUEE_WORDS = [
  "REACT",
  "NEXT.JS",
  "NODE.JS",
  "TYPESCRIPT",
  "SYSTEM DESIGN",
  "PERFORMANCE",
  "AWS",
  "FREELANCE",
];
// Doubled so the CSS marquee (translateX -50%) loops seamlessly.
export const MARQUEE_ITEMS = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

// Letter-by-letter intro reveal: each letter's animation-delay keeps
// incrementing across both words so the whole name types on as one beat.
let letterCounter = 0;
export const INTRO_WORDS = ["HARSHIT", "DIXIT"].map((word) => ({
  word,
  letters: word.split("").map((ch) => ({ ch, delay: letterCounter++ * 45 })),
}));

export const TALKS = [
  { org: "Bennett University", topic: "GenAI in Practice: Industry Perspective" },
  { org: "LNMIIT Jaipur", topic: "engineering fundamentals & industry readiness" },
];

export const SOCIAL = {
  email: "harshitdikshit96@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshitdixit96/",
  github: "https://github.com/harshitdikshit96-svg",
  resumeHref: "/resume/Harshit.pdf",
};

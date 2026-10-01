// The outcome-led service list — used by the contact-form dropdown
// (client) and the business node's offer catalog (lib/schema.js).

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

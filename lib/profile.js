// Harshit's experience, stack and talks — rendered on /about and used in
// the Person structured data.

const RAW_EXPERIENCE = [
  {
    period: "Nov 2024 – Jan 2026",
    role: "Software Engineer II — Frontend (Full-stack)",
    company: "Acko Insurance",
    desc: "Architected Safebuy, a distributed insurance engine issuing 50K+ policies a month with sub-200ms API responses (React, Next.js, Node.js, Redis, Docker on AWS). Led a savings-account rewards program end to end that added 80K+ newly engaged users, built challan tooling across 12+ state RTO APIs, designed Redis-backed re-engagement workflows, and extended Strapi CMS to cut an ops team's data turnaround from 2 days to under 10 minutes.",
  },
  {
    period: "Jul 2021 – Sep 2024",
    role: "Software Engineer I",
    company: "Bigbasket (TATA Enterprise)",
    desc: "Optimised the checkout flow across 5M+ monthly transactions — LCP from 4.2s to 3.4s, time-to-interactive from 6s to 3.6s. Built the frontend of a real-time dynamic charges engine for 2M+ daily users, scaled the bb Elevate rewards interface to 1M+ subscribers at under 1.5s page loads, cut p95 latency from 380ms to 300ms at 10K requests a minute, and automated sitemap builds for 500K+ product URLs from 3 hours to 8 minutes.",
  },
];
export const EXPERIENCE = RAW_EXPERIENCE.map((e, i) => ({ ...e, delay: i * 130 }));

const RAW_SKILL_GROUPS = [
  { label: "frontend", items: ["React", "Next.js", "TypeScript", "Redux/Zustand", "Tailwind CSS", "Core Web Vitals", "SEO"] },
  { label: "backend", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Redis", "Strapi CMS"] },
  { label: "infra", items: ["AWS", "Docker", "Kubernetes", "Akamai CDN", "OpenTelemetry", "Jenkins", "CI/CD"] },
];
export const SKILL_GROUPS = RAW_SKILL_GROUPS.map((g, i) => ({ ...g, delay: i * 100 }));

export const TALKS = [
  { org: "Bennett University", topic: "GenAI in Practice: Industry Perspective" },
  { org: "LNMIIT Jaipur", topic: "engineering fundamentals & industry readiness (invited speaker, in a personal capacity)" },
];

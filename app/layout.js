import { Space_Grotesk, Public_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { SOCIAL, SKILL_GROUPS, SERVICES } from "@/lib/data";

// Space Grotesk (headings) + Public Sans (body) replace the site's old
// system-serif look as part of the "Harshit Creates" redesign — see
// docs/seo-assets-baseline.md for what the previous look/palette was.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://www.harshitcreates.in";
const defaultTitle = "Harshit Dixit — Freelance Website Developer & Technical Consultant";
// Leads with "for businesses anywhere" rather than the city — pricing and
// process don't change by location, so the copy shouldn't over-index on
// Lucknow either (the real local signals — areaServed, GBP — still live in
// the JSON-LD below and don't need repeating in prose).
const defaultDescription =
  "Freelance website design and development, technical consulting, and architecture audits for businesses anywhere — remote-friendly, based in Lucknow. Five-plus years shipping production systems at Acko and Bigbasket.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s — harshitcreates",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  // Mixes the plain-language terms a local business owner actually
  // searches ("website design", "web developer near me") with the more
  // specific technical terms that qualify inbound leads once they land —
  // Google no longer weighs this tag for ranking, but it costs nothing to
  // keep accurate and other engines/aggregators still read it.
  // Full target list (explicit asks + competitor-research terms from
  // docs/v2-deliverables.md §1) is tracked in docs/seo-keywords.md, along
  // with where each one is placed beyond this tag.
  keywords: [
    "website developer near me",
    "web developer near me",
    "website developer in Lucknow",
    "web developer in Lucknow",
    "freelance website developer",
    "freelance web developer",
    "freelance website developer in Lucknow",
    "portfolio website developer",
    "portfolio website developer in Lucknow",
    "website design Lucknow",
    "website development Lucknow",
    "website development company Lucknow",
    "hire web developer Lucknow",
    "best web developer in Lucknow",
    "affordable website design Lucknow",
    "small business website developer",
    "custom website development Lucknow",
    "ecommerce website developer Lucknow",
    "website audit service",
    "technical SEO audit",
    "SEO audit Lucknow",
    "Core Web Vitals audit",
    "SEO management services",
    "Google Business Profile optimization",
    "restaurant QR ordering system developer",
    "booking website development",
    "technical consultant",
    "React developer",
    "Next.js developer",
    "web solutions architect",
    "fractional CTO",
    "Harshit Dixit",
  ],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "harshitcreates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#EDE8F5",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harshit Dixit",
  url: siteUrl,
  jobTitle: "Freelance Technical Consultant & Web Solutions Architect",
  description: defaultDescription,
  image: `${siteUrl}/images/hero-portrait.webp`,
  email: `mailto:${SOCIAL.email}`,
  sameAs: [SOCIAL.linkedin, SOCIAL.github],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "IIIT Lucknow",
  },
  knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
};

// A service-area business (no storefront), so `areaServed` stands in for a
// street address per Google's structured-data guidance for businesses like
// this. Linked to the Person node above via `founder` rather than merged
// into it, since a person and a service offering are different entities.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#business`,
  name: "Harshit Dixit — Freelance Web Developer & Fractional CTO",
  description: defaultDescription,
  url: siteUrl,
  image: `${siteUrl}/images/hero-portrait.webp`,
  logo: `${siteUrl}/icon.svg`,
  email: `mailto:${SOCIAL.email}`,
  founder: {
    "@type": "Person",
    name: "Harshit Dixit",
    url: siteUrl,
    sameAs: [SOCIAL.linkedin, SOCIAL.github],
  },
  sameAs: [SOCIAL.linkedin, SOCIAL.github, SOCIAL.gbpUrl].filter(Boolean),
  areaServed: [
    { "@type": "City", name: "Lucknow" },
    { "@type": "State", name: "Uttar Pradesh" },
    { "@type": "Place", name: "Remote (Worldwide)" },
  ],
  makesOffer: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.desc,
      areaServed: ["Lucknow", "Remote"],
    },
  })),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${publicSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

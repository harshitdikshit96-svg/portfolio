import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { SOCIAL, SKILL_GROUPS, SERVICES } from "@/lib/data";

const siteUrl = "https://www.harshitcreates.in";
const defaultTitle = "Harshit Dixit — Freelance Technical Consultant & Web Solutions Architect";
const defaultDescription =
  "Five-plus years shipping frontend and full-stack systems for large consumer platforms. Now taking on freelance web development, architecture reviews, and technical consulting.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s — harshit.dev",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  keywords: [
    "freelance web developer",
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
    siteName: "harshit.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
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
  sameAs: [SOCIAL.linkedin, SOCIAL.github],
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
    <html lang="en" data-scroll-behavior="smooth">
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

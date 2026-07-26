import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { SOCIAL, SKILL_GROUPS } from "@/lib/data";

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
  email: `mailto:${SOCIAL.email}`,
  sameAs: [SOCIAL.linkedin, SOCIAL.github],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "IIIT Lucknow",
  },
  knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

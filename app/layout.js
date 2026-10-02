import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { gtmBootstrap } from "@/lib/gtmLoader";
import { personSchema, professionalServiceSchema, webSiteSchema } from "@/lib/schema";
import { GTM_ID, SITE_URL } from "@/lib/data";
import { LOCAL_LANDINGS, NATIONAL_LANDINGS } from "@/lib/landings";

// Space Grotesk (headings) + DM Sans (body). Space Grotesk carries over from
// the previous light theme — the dark reference build happens to use it too,
// so the headings needed no change. DM Sans replaces Public Sans for body
// copy to match that reference: it has a slightly larger x-height and looser
// default tracking, which is what keeps long paragraphs readable on a dark
// ground where thin strokes tend to fill in.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = SITE_URL;
// Google truncates title tags at roughly 580px on desktop (~50-60
// characters for most fonts) and meta descriptions at roughly 155-160
// characters — anything past that point is never shown in the SERP
// snippet or a link-preview card, so it can't help SEO or a click-through
// decision no matter what it says. The previous versions of both were over
// those limits (title: 66 chars; description: 215, with the one concrete
// credibility line — "shipping production systems at Acko and Bigbasket"
// — sitting past character 160 and never actually rendering). Fixed by
// tightening the title and moving that line to the front of the
// description so it's inside the part that reliably displays.
// Leads with the head term the homepage is meant to rank for. ROLE_TAGLINE
// stays as-is for the OG image and the Person node, where the broader
// "web developer & tech consultant" framing still fits.
const defaultTitle = "Harshit Dixit — Freelance Website Developer in Lucknow";
// Names the city once, because the homepage is the page the Google Business
// Profile links to and the one most likely to rank for "website developer
// in Lucknow"; then "across India", because most of the national work is
// remote and the India landing pages hang off this one.
const defaultDescription =
  "Freelance website and software developer in Lucknow, ex-Acko and ex-Bigbasket. Websites, custom software and SEO for businesses across India.";

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
  themeColor: "#06070A",
};

// The graph is built in lib/schema.js so every node has one definition and
// one @id. These three are emitted site-wide; leaf routes add their own
// Service / FAQPage / BreadcrumbList nodes that reference these by @id
// rather than restating the business.
const siteGraph = [
  personSchema({
    description: defaultDescription,
    image: `${siteUrl}/images/hero-portrait.webp`,
  }),
  professionalServiceSchema({
    description: defaultDescription,
    image: `${siteUrl}/images/hero-portrait.webp`,
    logo: `${siteUrl}/icon.svg`,
  }),
  webSiteSchema({ description: defaultDescription }),
];

// Footer link lists, reduced to what a link needs. The footer is a server
// component rendered here and handed to SiteChrome (a client component) as
// a prop, so neither the footer nor lib/landings.js ships to the browser.
const toLink = (l) => ({ href: `/${l.slug}`, label: l.navLabel });
const footerLinks = {
  lucknow: LOCAL_LANDINGS.map(toLink),
  india: NATIONAL_LANDINGS.map(toLink),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        {/* Google Tag Manager — GA4 and any future tags/pixels are configured
            inside the GTM container itself (tagmanager.google.com), not
            hardcoded here. See GTM_ID in lib/data.js. */}
        {/* Loads on first interaction, a fallback timer, or immediately for
            ad clicks — see lib/gtmLoader.js for the rules and why. A plain
            inline <script> rather than next/script, so it runs during HTML
            parsing instead of waiting for hydration. */}
        <script id="gtm-bootstrap" dangerouslySetInnerHTML={{ __html: gtmBootstrap }} />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <JsonLd schema={siteGraph} />
        <SiteChrome footer={<Footer links={footerLinks} />}>{children}</SiteChrome>
      </body>
    </html>
  );
}

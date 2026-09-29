import Script from "next/script";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { personSchema, professionalServiceSchema, webSiteSchema } from "@/lib/schema";
import { GTM_ID, SITE_URL, ROLE_TAGLINE } from "@/lib/data";

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
const defaultTitle = `Harshit Dixit — ${ROLE_TAGLINE}`;
// Leads with the Acko/Bigbasket credibility line, then "for businesses
// anywhere" rather than the city — pricing and process don't change by
// location, so the copy shouldn't over-index on Lucknow either (the real
// local signals — areaServed, GBP — still live in the JSON-LD below and
// don't need repeating in prose).
const defaultDescription =
  "Freelance web developer — 5+ years shipping production systems at Acko and Bigbasket. Website design, development, technical consulting and audits, remote-friendly for businesses anywhere.";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        {/* Google Tag Manager — GA4 and any future tags/pixels are configured
            inside the GTM container itself (tagmanager.google.com), not
            hardcoded here. See GTM_ID in lib/data.js. */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

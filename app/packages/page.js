import { colors } from "@/lib/colors";
import { PACKAGE_TIERS, SITE_URL } from "@/lib/data";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import PackageBuilder from "@/components/PackageBuilder";
import GuaranteeBlock from "@/components/GuaranteeBlock";
import ConsultationCta from "@/components/ConsultationCta";
import UspBanner from "@/components/UspBanner";
import Services from "@/components/sections/Services";

export const metadata = pageMetadata({
  title: "Packages & Pricing",
  description:
    "Website packages and pricing — starter sites, business/CMS sites, e-commerce, and custom web apps, each with optional add-ons. Free first draft before you pay.",
  path: "/packages",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
]);

// One Service+Offer per package tier — derived from PACKAGE_TIERS so the
// schema price can never drift from what's actually rendered on the page.
// priceSpecification uses `minPrice` rather than a flat `price` because
// these are "starts @" figures, not fixed quotes — advertising a fixed
// price in schema the page doesn't actually charge is a manual-action risk.
const servicesJsonLd = PACKAGE_TIERS.map((tier) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: tier.name,
  description: tier.tagline,
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: [
    { "@type": "City", name: "Lucknow" },
    { "@type": "State", name: "Uttar Pradesh" },
    { "@type": "Place", name: "Remote (India-wide)" },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "INR",
      minPrice: tier.basePriceFrom,
    },
  },
}));

export default function Page() {
  return (
    <section data-screen-label="Packages" style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {servicesJsonLd.map((service) => (
        <script
          key={service.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
      <div style={{ fontSize: 13, color: colors.accent, marginBottom: 12 }}>
        {"// packages & pricing"}
      </div>
      <h1 style={{ fontSize: "clamp(32px, 4.4vw, 48px)", margin: "0 0 18px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 700 }}>
        Pick a base package, add what you need.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.75, color: colors.textDim, maxWidth: 620, margin: "0 0 40px" }}>
        Every project starts from one of four base packages. From there, add exactly the features your business
        needs — login systems, admin panels, booking, payments, and more — each priced on its own. Already have a
        site? Every add-on below is available standalone too.
      </p>

      <div style={{ marginBottom: 60 }}>
        <UspBanner />
      </div>

      <GuaranteeBlock />

      <PackageBuilder />

      <Services />

      <ConsultationCta />
    </section>
  );
}

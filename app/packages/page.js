import { colors } from "@/lib/colors";
import PackageBuilder from "@/components/PackageBuilder";
import ConsultationCta from "@/components/ConsultationCta";
import UspBanner from "@/components/UspBanner";

export const metadata = {
  title: "Packages & Pricing",
  description:
    "Website packages and pricing — starter sites, business/CMS sites, e-commerce, and custom web apps, each with optional add-ons like login, admin panels, booking systems, and payment integration. Every price is a negotiable starting point.",
  alternates: { canonical: "/packages" },
};

export default function Page() {
  return (
    <section data-screen-label="Packages" style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.accent, marginBottom: 12 }}>
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

      <UspBanner />

      <PackageBuilder />

      <ConsultationCta />
    </section>
  );
}

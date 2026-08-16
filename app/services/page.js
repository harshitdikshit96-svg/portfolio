import Link from "next/link";
import { colors } from "@/lib/colors";
import { SERVICE_CATALOG, CALENDLY_URL } from "@/lib/data";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import ConsultationCta from "@/components/ConsultationCta";

export const metadata = pageMetadata({
  title: "Website & SEO Services",
  description:
    "Website and SEO help explained plainly — audits, ongoing SEO management, and industry-specific booking systems. Free 30-min call to scope what you need.",
  path: "/services",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

export default function Page() {
  return (
    <section data-screen-label="Services" style={{ padding: "80px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div style={{ fontSize: 13, color: colors.accent, marginBottom: 12 }}>{"// services, explained"}</div>
      <h1 style={{ fontSize: "clamp(32px, 4.4vw, 48px)", margin: "0 0 18px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 720 }}>
        What each service is, and what it actually does for you.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.75, color: colors.textDim, maxWidth: 660, margin: "0 0 60px" }}>
        No jargon, no fixed price list here — packages are priced on{" "}
        <Link href="/packages" style={{ color: colors.accent }}>
          the packages page
        </Link>
        . This page is just a plain-language answer to &ldquo;what is this, and why would I need it,&rdquo; so you
        can pick what&apos;s relevant before we talk pricing.
      </p>

      {SERVICE_CATALOG.map((group) => (
        <div key={group.category} id={group.slug} style={{ marginBottom: 64, scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            {group.category}
          </h2>
          {group.blurb && (
            <p style={{ fontSize: 15, color: colors.textDim, margin: "0 0 28px", maxWidth: 640 }}>{group.blurb}</p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {group.items.map((item) => (
              <div
                key={item.name}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  padding: "24px 28px",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 14, color: colors.accentDeep, marginBottom: 12 }}>{item.summary}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textDimmer, margin: "0 0 12px" }}>
                  {item.detail}
                </p>
                <div style={{ display: "flex", gap: 8, fontSize: 14, lineHeight: 1.6, color: colors.text }}>
                  <span style={{ color: colors.teal, flexShrink: 0 }}>→</span>
                  <span>{item.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
          background: colors.accentTint,
          border: `1px solid ${colors.accentBorderSoft}`,
          borderRadius: 10,
          padding: "20px 28px",
          marginBottom: 40,
        }}
      >
        <p style={{ margin: 0, fontSize: 15 }}>Not sure which of these applies to you? Ask on a free call.</p>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a free call
        </a>
      </div>

      <ConsultationCta />
    </section>
  );
}

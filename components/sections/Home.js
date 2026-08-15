import { colors } from "@/lib/colors";
import { CALENDLY_URL, TEMPLATE_SHOWCASE, PACKAGE_TIERS, PROMO, getDiscountedPrice } from "@/lib/data";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import UspBanner from "@/components/UspBanner";
import PackageBuilder from "@/components/PackageBuilder";
import ServiceCatalog from "@/components/ServiceCatalog";
import ConsultationCta from "@/components/ConsultationCta";
import FaqSection from "@/components/FaqSection";
import GbpSection from "@/components/GbpSection";

const kickerStyle = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: colors.accentDeep,
};

const h2Style = {
  fontSize: "clamp(26px,3vw,38px)",
  lineHeight: 1.18,
  margin: "12px 0 0",
  maxWidth: "22ch",
  letterSpacing: "-0.01em",
};

export default function Home() {
  return (
    <section data-screen-label="Home" style={{ animation: "fadeUp 0.25s ease both" }}>
      <div style={{ padding: "90px 0 60px", position: "relative", zIndex: 1, maxWidth: 760 }}>
        <span style={kickerStyle}>Websites · Local SEO · Booking Systems</span>
        <h1
          style={{
            fontSize: "clamp(36px, 4.8vw, 58px)",
            lineHeight: 1.1,
            margin: "14px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          Websites &amp; local SEO for small, local businesses.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: colors.textDim, maxWidth: "56ch", margin: "20px 0 0" }}>
          For dentists, clinics, salons and local service businesses — same process and pricing wherever
          you&apos;re based. Live in as fast as 24 hours, with a free first draft in about 3, so you see the real
          thing before
          you pay for anything.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a free call
          </a>
          <a href="#packages" className="btn-secondary">
            See packages &amp; prices
          </a>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }}>
          {[
            `Starts @ ₹${getDiscountedPrice(PACKAGE_TIERS[0].basePriceFrom).toLocaleString("en-IN")}${PROMO.active ? ` (${PROMO.discountPct}% off)` : ""}`,
            "First draft in ~3 hrs",
            "Free 30-min call",
            "Remote-friendly",
          ].map((tag) => (
            <span key={tag} className="tag tag-outline">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 0 90px" }}>
        <span style={kickerStyle}>Why local businesses call first</span>
        <h2 style={h2Style}>Commitments most web developers won&apos;t make.</h2>
        <div style={{ marginTop: 28 }}>
          <UspBanner />
        </div>
      </div>

      <div id="packages" style={{ margin: "0 0 100px", scrollMarginTop: 90 }}>
        <span style={kickerStyle}>Build your package</span>
        <h2 style={h2Style}>Start with a budget. Build up from there.</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: colors.textDim, maxWidth: "62ch", margin: "14px 0 40px" }}>
          Pick a starting package, then add exactly what your business needs — the total updates as you go. Every
          add-on is also sellable on its own.
        </p>
        <PackageBuilder />
      </div>

      <div id="services" style={{ margin: "0 0 100px", scrollMarginTop: 90 }}>
        <span style={kickerStyle}>Services</span>
        <h2 style={h2Style}>Beyond a one-time build.</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: colors.textDim, maxWidth: "64ch", margin: "14px 0 36px" }}>
          Audits, growth retainers and industry builds — for dentists, clinics, salons, gyms and other local service
          businesses, wherever you&apos;re based.
        </p>
        <ServiceCatalog />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginTop: 24,
            background: colors.accentTint,
            border: `1px solid ${colors.accentBorderSoft}`,
            borderRadius: 10,
            padding: "20px 28px",
          }}
        >
          <p style={{ margin: 0, fontSize: 15 }}>Not sure where to start? The 30-minute discovery call is free.</p>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a free call
          </a>
        </div>
      </div>

      <ConsultationCta
        heading="Let's talk about your website — free, no pressure."
        subtext="30 minutes, on a call. Bring your questions; leave with a clear price and a plan."
      />

      <div style={{ margin: "100px 0 40px" }}>
        <span style={kickerStyle}>Custom templates</span>
        <h2 style={h2Style}>A sense of what we can build for your industry.</h2>
        <div className="card-grid-2" style={{ marginTop: 24 }}>
          {TEMPLATE_SHOWCASE.map((t) => (
            <Reveal
              key={t.name}
              delay={t.delay}
              className="template-card"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 10, overflow: "hidden" }}
            >
              <ImageSlot fill height={150} placeholder="template preview" />
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 10 }}>{t.name}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDimmer }}>{t.tagline}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p style={{ fontSize: 13, color: colors.textFaintest, marginTop: 22, fontStyle: "italic" }}>
          Placeholder previews for now — real template screenshots and live demos are a follow-up, not part of this
          pass.
        </p>
      </div>

      <FaqSection />

      <div style={{ margin: "0 0 40px" }}>
        <GbpSection />
      </div>
    </section>
  );
}

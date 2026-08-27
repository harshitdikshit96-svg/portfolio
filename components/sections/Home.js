import { colors } from "@/lib/colors";
import { CALENDLY_URL, LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";
import { getScreenshotManifest, withScreenshots } from "@/lib/screenshots";
import TileCarousel from "@/components/TileCarousel";
import ProjectCard from "@/components/ProjectCard";
import UspBanner from "@/components/UspBanner";
import HeroCarousel from "@/components/HeroCarousel";
import GuaranteeBlock from "@/components/GuaranteeBlock";
import PackageBuilder from "@/components/PackageBuilder";
import ServiceCatalog from "@/components/ServiceCatalog";
import ConsultationCta from "@/components/ConsultationCta";
import FaqSection from "@/components/FaqSection";
import GbpSection from "@/components/GbpSection";
import Link from "next/link";

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

// Featured Work highlights: two real live builds, two capability demos —
// pulled straight from the same data /work uses, no separate copy to keep
// in sync.
const FEATURED_WORK = [LIVE_PROJECTS[0], LIVE_PROJECTS[1], TEMPLATE_PROJECTS[0], TEMPLATE_PROJECTS[2]];

export default async function Home() {
  // See components/sections/Work.js for the full explanation — no-op until
  // the screenshot-refresh pipeline is set up.
  const manifest = await getScreenshotManifest();
  // This teaser mixes live and template projects, each independently
  // numbered 01, 02... within its own category on /work — reusing that
  // number here would put two "01" badges side by side. Renumbering by
  // position in this specific curated list keeps the badges unique and
  // reads as "here are 4 highlights," which is what this list actually is.
  const featuredWork = withScreenshots(FEATURED_WORK, manifest).map((p, i) => ({
    ...p,
    index: String(i + 1).padStart(2, "0"),
  }));

  return (
    <section data-screen-label="Home" style={{ animation: "fadeUp 0.25s ease both" }}>
      <HeroCarousel />

      <div style={{ margin: "0 0 90px" }}>
        <span style={kickerStyle}>Why local businesses call first</span>
        <h2 style={h2Style}>Commitments most web developers won&apos;t make.</h2>
        <div style={{ marginTop: 28 }}>
          <UspBanner />
        </div>
      </div>

      <div style={{ margin: "0 0 100px" }}>
        <span style={kickerStyle}>Featured work</span>
        <h2 style={h2Style}>Real builds, not mockups.</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: colors.textDim, maxWidth: "62ch", margin: "14px 0 40px" }}>
          A mix of live sites built for real businesses and capability demos showing the kind of work we can do for
          yours.
        </p>
        <TileCarousel label="featured work">
          {featuredWork.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </TileCarousel>
        <div style={{ marginTop: 24 }}>
          <Link href="/work" className="btn-secondary" style={{ display: "inline-block" }}>
            See all work →
          </Link>
        </div>
      </div>

      <div style={{ margin: "0 0 100px" }}>
        <span style={kickerStyle}>Reviews</span>
        <h2 style={h2Style}>Real feedback, from Google.</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: colors.textDim, maxWidth: "62ch", margin: "14px 0 32px" }}>
          No cherry-picked quotes here — real, verifiable reviews straight from Google.
        </p>
        <GbpSection />
      </div>

      <div id="packages" style={{ margin: "0 0 100px", scrollMarginTop: 90 }}>
        <span style={kickerStyle}>Build your package</span>
        <h2 style={h2Style}>Start with a budget. Build up from there.</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: colors.textDim, maxWidth: "62ch", margin: "14px 0 40px" }}>
          Pick a starting package, then add exactly what your business needs on top of it. Every add-on is also
          sellable on its own.
        </p>
        <GuaranteeBlock />
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

      <FaqSection />
    </section>
  );
}

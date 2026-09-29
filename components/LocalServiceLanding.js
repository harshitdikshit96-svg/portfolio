import Link from "next/link";
import { colors } from "@/lib/colors";
import {
  SITE_URL,
  USPS,
  RETAINERS,
  PACKAGE_TIERS,
  LIVE_PROJECTS,
  TEMPLATE_PROJECTS,
} from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import ConsultationCta from "@/components/ConsultationCta";
import CalendlyLink from "@/components/CalendlyLink";
import LeadActions from "@/components/LeadActions";
import MobileLeadBar from "@/components/MobileLeadBar";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, faqPageSchema } from "@/lib/schema";


/**
 * One keyword-targeted local landing page, rendered from a LOCAL_LANDINGS
 * entry in lib/data.js.
 *
 * Every Google Ads ad group used to point at the homepage. A homepage has
 * to speak to everybody at once, so paid traffic arrived on copy that
 * answered none of the question the visitor had just typed into Google.
 * These pages exist so each ad group can land on a page that repeats its
 * own search back to the visitor, shows real work, and puts the enquiry
 * form on the same screen.
 *
 * These pages no longer show prices. They previously listed every retainer
 * and package price beside what Lucknow agencies charge for the same work;
 * that comparison went with them, since a competitor's number with none of
 * ours next to it is just an unanchored figure. The engagements themselves
 * still come from RETAINERS and PACKAGE_TIERS, so the list stays in step
 * with the rest of the site — only the numbers are gone. The one place a
 * figure still appears is the homepage hero, under an asterisk.
 */
export default function LocalServiceLanding({ landing }) {
  const retainers = landing.retainerIds
    .map((id) => RETAINERS.find((r) => r.id === id))
    .filter(Boolean);
  const packages = landing.packageIds
    .map((id) => PACKAGE_TIERS.find((p) => p.id === id))
    .filter(Boolean);
  const allProjects = [...LIVE_PROJECTS, ...TEMPLATE_PROJECTS];
  const proof = landing.proofSlugs.map((s) => allProjects.find((p) => p.slug === s)).filter(Boolean);

  // Both graphs come from lib/schema.js. The Service node's `provider` is an
  // @id reference to the single business node in the root layout — this used
  // to mint a second, thinner ProfessionalService inline, which reads to a
  // crawler as two different businesses sharing a name.
  const pageGraph = [
    serviceSchema({
      name: landing.h1,
      serviceType: landing.serviceType,
      description: landing.metaDescription,
      path: `/${landing.slug}`,
      areaServed: {
        "@type": "City",
        name: "Lucknow",
        containedInPlace: { "@type": "State", name: "Uttar Pradesh" },
      },
    }),
    faqPageSchema(landing.faqs),
  ];

  return (
    <section data-screen-label={landing.navLabel} style={{ padding: "72px 0 40px", animation: "fadeUp 0.25s ease both" }}>
      <JsonLd schema={pageGraph} />

      {/* ---- opener ---- */}
      <div style={{ fontSize: 13, color: colors.accent, marginBottom: 12 }}>{"// lucknow · remote-friendly"}</div>
      <h1
        style={{
          fontSize: "clamp(32px, 4.6vw, 52px)",
          margin: "0 0 20px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          maxWidth: 760,
          lineHeight: 1.1,
        }}
      >
        {landing.h1}
      </h1>
      <p style={{ fontSize: 17.5, lineHeight: 1.75, color: colors.textDim, maxWidth: 660, margin: "0 0 28px" }}>
        {landing.lede}
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {/* Call and WhatsApp lead the row on purpose. A visitor arriving
            from a search ad is closer to picking up a phone than to
            choosing a slot in a calendar, and this is the only place on
            the page they could do it before scrolling. */}
        <LeadActions source={landing.slug} />
        <CalendlyLink className="btn-ghost">Book a free 20-min check</CalendlyLink>
        <Link href="#enquire" className="btn-ghost">
          Or send details →
        </Link>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 64px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 20px",
          fontSize: 14,
          color: colors.textDimmer,
        }}
      >
        {USPS.slice(0, 4).map((u) => (
          <li key={u.id} style={{ display: "flex", gap: 7, alignItems: "baseline" }}>
            <span style={{ color: colors.teal }}>✓</span>
            <span>{u.label}</span>
          </li>
        ))}
      </ul>

      {/* ---- the problem ---- */}
      <h2 style={{ fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
        Any of this sound familiar?
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 64, maxWidth: 660 }}>
        {landing.problem.map((line) => (
          <div
            key={line}
            style={{
              display: "flex",
              gap: 12,
              padding: "14px 18px",
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 15.5,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: colors.accent, flexShrink: 0 }}>—</span>
            <span>{line}</span>
          </div>
        ))}
      </div>

      {/* ---- what's included ---- */}
      <h2 style={{ fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
        What you get
      </h2>
      <p style={{ fontSize: 15, color: colors.textDim, margin: "0 0 28px", maxWidth: 640 }}>
        Every engagement is scoped to what your business actually needs, then quoted as one fixed number on a
        free call — before anything begins.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {retainers.map((r) => (
          <div
            key={r.id}
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: "22px 26px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "baseline" }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: colors.accentDeep, whiteSpace: "nowrap" }}>
                {r.scope}
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textDimmer, margin: "12px 0 12px" }}>{r.summary}</p>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5 }}>
              {r.includes.map((inc) => (
                <li key={inc} style={{ fontSize: 14.5, lineHeight: 1.6, color: colors.textDimmer }}>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {packages.map((p) => (
          <div
            key={p.id}
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: "22px 26px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "baseline" }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: colors.accentDeep, whiteSpace: "nowrap" }}>
                {p.scope}
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textDimmer, margin: "12px 0 0" }}>{p.tagline}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14.5, color: colors.textFaint, margin: "0 0 64px", maxWidth: 640 }}>
        Full list of packages and add-ons on{" "}
        <Link href="/packages" style={{ color: colors.accent }}>
          the packages page
        </Link>
        . Anything bigger or unusual is scoped on a call — you get a fixed quote before work starts.
      </p>

      {/* ---- proof ---- */}
      {proof.length > 0 && (
        <>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            Real work, live where you can check it
          </h2>
          <p style={{ fontSize: 15, color: colors.textDim, margin: "0 0 28px", maxWidth: 640 }}>
            No stock screenshots and no invented testimonials — these are builds you can open yourself.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 64,
            }}
          >
            {proof.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  padding: "20px 22px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                  <span style={{ fontSize: 16.5, fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: colors.textFaint, whiteSpace: "nowrap" }}>{p.status}</span>
                </div>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: colors.textDimmer }}>{p.tagline}</span>
                <span style={{ fontSize: 13.5, color: colors.accent, marginTop: 2 }}>See the build →</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ---- enquiry ---- */}
      <div id="enquire" style={{ scrollMarginTop: 90, marginBottom: 64 }}>
        <h2 style={{ fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          Tell me what you need
        </h2>
        <p style={{ fontSize: 15, color: colors.textDim, margin: "0 0 28px", maxWidth: 640 }}>
          A mobile number is enough to start — I&apos;ll come back within one working day with a straight answer on
          what it would take and what it would cost.
        </p>
        <ContactForm />
      </div>

      {/* ---- faq ---- */}
      <h2 style={{ fontSize: "clamp(22px,2.6vw,28px)", fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.01em" }}>
        Questions people actually ask
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 56, maxWidth: 760 }}>
        {landing.faqs.map((f) => (
          <div
            key={f.question}
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 8 }}>{f.question}</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: colors.textDimmer, margin: 0 }}>{f.answer}</p>
          </div>
        ))}
      </div>

      <ConsultationCta />
      <MobileLeadBar />
    </section>
  );
}

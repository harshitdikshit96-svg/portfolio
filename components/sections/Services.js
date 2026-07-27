import { colors } from "@/lib/colors";
import { SERVICES } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Services() {
  return (
    <div style={{ marginBottom: 100 }}>
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.teal, marginBottom: 14 }}>
        {"// how I can help"}
      </div>
      <h2 style={{ fontSize: "clamp(26px, 3vw, 34px)", margin: "0 0 30px", fontWeight: 700, letterSpacing: "-0.01em" }}>
        Services
      </h2>
      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <Reveal
            key={service.title}
            delay={i * 80}
            className="service-card"
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 26,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 11, color: colors.accent, marginBottom: 10, letterSpacing: "0.04em" }}>
              {service.title.toUpperCase()}
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.35, marginBottom: 10 }}>{service.outcome}</div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: colors.textDimmer, marginBottom: 16 }}>{service.desc}</div>
            <div
              style={{
                marginTop: "auto",
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: 12.5,
                color: colors.textFaint,
                paddingTop: 14,
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              {service.engagement}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

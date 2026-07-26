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
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{service.title}</div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: colors.textDimmer }}>{service.desc}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

import { colors } from "@/lib/colors";
import { SOCIAL } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section data-screen-label="Contact" style={{ padding: "100px 0", animation: "fadeUp 0.25s ease both", minHeight: "50vh" }}>
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 13, color: colors.accent, marginBottom: 14 }}>
        {"// get in touch"}
      </div>
      <h2 style={{ fontSize: "clamp(36px, 5.4vw, 60px)", margin: "0 0 24px", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 700 }}>
        Have a web problem worth solving properly?
      </h2>
      <p style={{ fontSize: 17.5, lineHeight: 1.75, color: colors.textDim, maxWidth: 560, margin: "0 0 40px" }}>
        Open to freelance and consulting work — architecture reviews, performance audits, or building the thing
        outright. Tell me what you&apos;re working on and I&apos;ll reply within a couple of days.
      </p>

      <ContactForm />

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", margin: "48px 0 24px" }}>
        <span style={{ fontSize: 14, color: colors.textFaintest }}>or reach me directly —</span>
        <a
          href={`mailto:${SOCIAL.email}`}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 14,
            padding: "10px 20px",
            background: "transparent",
            border: `1px solid ${colors.borderStrong}`,
            color: colors.text,
            borderRadius: 8,
          }}
        >
          {SOCIAL.email}
        </a>
      </div>
      <div style={{ display: "flex", gap: 28, fontFamily: "'Times New Roman', Times, serif", fontSize: 14.5 }}>
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin →
        </a>
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
          github →
        </a>
      </div>
    </section>
  );
}

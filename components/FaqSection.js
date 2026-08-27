import { colors } from "@/lib/colors";
import { FAQ_ITEMS } from "@/lib/data";

// Native <details>/<summary> — no client JS needed for the expand/collapse,
// so the Q&A text is plain server-rendered HTML in the DOM from first
// paint, not something a crawler or AI assistant has to run JS to see.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqSection() {
  return (
    <div style={{ margin: "0 0 100px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <span
        style={{
          display: "inline-block",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: colors.accentDeep,
        }}
      >
        Questions
      </span>
      <h2 style={{ fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.18, margin: "12px 0 28px", maxWidth: "22ch", letterSpacing: "-0.01em" }}>
        Common questions, answered directly.
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.7, color: colors.textDimmer }}>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

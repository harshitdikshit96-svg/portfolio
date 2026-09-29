import { colors } from "@/lib/colors";
import { FAQ_ITEMS } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";

// Native <details>/<summary> — no client JS needed for the expand/collapse,
// so the Q&A text is plain server-rendered HTML in the DOM from first
// paint, not something a crawler or AI assistant has to run JS to see.
// Built from FAQ_ITEMS — the same array rendered below — so the marked-up
// Q&A can never drift from the visible copy. Google requires the two to
// match; a separately maintained list is how sites earn a manual action.
const faqJsonLd = faqPageSchema(FAQ_ITEMS);

export default function FaqSection() {
  return (
    <div style={{ margin: "0 0 100px" }}>
      <JsonLd schema={faqJsonLd} />
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

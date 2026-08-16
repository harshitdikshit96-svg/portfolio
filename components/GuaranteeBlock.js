import { colors } from "@/lib/colors";

const STEPS = [
  { title: "You call", body: "A free 30-minute call to talk through what you actually need." },
  { title: "You see a free draft", body: "A real, working preview of your site — not a mockup — in about 3 hours." },
  { title: "You decide", body: "Like it? We build it out and go live in 24 hrs. Don't? Walk away — no invoice, nothing owed." },
];

/**
 * A static, bordered reassurance block — deliberately not animated —
 * placed right above pricing so it's the last thing a visitor reads before
 * deciding whether to commit. Visual reference: shroomly.in's "How ordering
 * works" section, which is a plain bordered card, not a moving strip.
 */
export default function GuaranteeBlock() {
  return (
    <div
      style={{
        border: `1.5px solid ${colors.accentBorderSoft}`,
        borderRadius: 12,
        background: colors.bgCard,
        padding: "32px 32px 28px",
        margin: "0 0 48px",
      }}
    >
      <h3 style={{ fontSize: "clamp(20px, 2.4vw, 26px)", fontWeight: 700, margin: "0 0 22px", letterSpacing: "-0.01em" }}>
        You see the real site before you pay.
      </h3>
      <div className="guarantee-steps">
        {STEPS.map((step, i) => (
          <div className="guarantee-step" key={step.title}>
            <div className="guarantee-step-num">{i + 1}</div>
            <div>
              <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: colors.textDimmer }}>{step.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

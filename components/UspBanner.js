import { colors } from "@/lib/colors";
import { USPS } from "@/lib/data";
import Reveal from "@/components/Reveal";

/**
 * The marketing-friendly strip of "why us" claims — 24hr delivery, free
 * consultation, etc. Sits high on the homepage since these are the reasons
 * a first-time visitor decides to stay rather than bounce.
 */
export default function UspBanner() {
  return (
    <Reveal className="usp-banner" style={{ marginBottom: 70 }}>
      {USPS.map((usp) => (
        <div key={usp.label} className="usp-item">
          <div style={{ fontSize: 24, marginBottom: 8 }}>{usp.icon}</div>
          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.01em" }}>
            {usp.label}
          </div>
          <div style={{ fontSize: 12, color: colors.textFaint, lineHeight: 1.5 }}>{usp.detail}</div>
        </div>
      ))}
    </Reveal>
  );
}

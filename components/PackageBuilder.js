"use client";

import { useEffect, useMemo, useState } from "react";
import { colors } from "@/lib/colors";
import { PACKAGE_TIERS, ADDONS, SOCIAL } from "@/lib/data";

const formatRs = (n) => `₹${n.toLocaleString("en-IN")}`;

// Below this width the 2-column add-on grid (see .addon-grid in
// globals.css) drops to a single column, and all 12 add-ons stacked one
// per row runs to nearly 1000px of scrolling before the price summary
// comes into view. Collapsing to a short preview + "show all" toggle only
// below this width keeps the 2-column desktop/tablet layout — already a
// reasonable, bounded height — untouched.
const COLLAPSE_BELOW_PX = 700;
const COLLAPSED_COUNT = 4;

/**
 * The multi-tier package + add-on selector: pick a base package, toggle
 * whichever add-ons apply, see a running "starting at" total, then send
 * that exact selection over email. No payment or scoping happens here —
 * this just turns browsing into a qualified, specific inbound lead instead
 * of a vague "tell me about your services" message.
 */
export default function PackageBuilder() {
  const [tierId, setTierId] = useState(PACKAGE_TIERS[0].id);
  const [addonIds, setAddonIds] = useState([]);
  const [isNarrow, setIsNarrow] = useState(false);
  const [addonsExpanded, setAddonsExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${COLLAPSE_BELOW_PX}px)`);
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const isCollapsed = isNarrow && !addonsExpanded;
  const visibleAddons = isCollapsed ? ADDONS.slice(0, COLLAPSED_COUNT) : ADDONS;

  const tier = PACKAGE_TIERS.find((t) => t.id === tierId);
  const selectedAddons = ADDONS.filter((a) => addonIds.includes(a.id));
  const tierPrice = tier?.basePriceFrom ?? 0;

  const total = useMemo(
    () => tierPrice + selectedAddons.reduce((sum, a) => sum + a.price, 0),
    [tierPrice, selectedAddons]
  );

  const toggleAddon = (id) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleRequest = () => {
    const subject = `Package inquiry: ${tier.name}${selectedAddons.length ? " + add-ons" : ""}`;
    const lines = [
      `Package: ${tier.name} (starting at ${formatRs(tierPrice)})`,
      selectedAddons.length ? "Add-ons:" : null,
      ...selectedAddons.map((a) => `  - ${a.name} (${formatRs(a.price)})`),
      "",
      `Estimated starting total: ${formatRs(total)} — negotiable, final scope/price confirmed after a free consultation.`,
      "",
      "A bit about what I need:",
    ].filter(Boolean);
    const mailto = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
  };

  return (
    <div>
      <div className="package-grid" style={{ marginBottom: 40 }}>
        {PACKAGE_TIERS.map((t) => {
          const selected = t.id === tierId;
          const price = t.basePriceFrom;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTierId(t.id)}
              className={`package-card ${selected ? "selected" : ""}`}
              style={{
                background: selected ? colors.accentTint : colors.bgCard,
                border: `2px solid ${selected ? colors.accent : colors.border}`,
                borderRadius: 10,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                color: colors.text,
              }}
            >
              <div style={{ fontSize: 11, color: colors.textFaint, letterSpacing: "0.04em" }}>
                {t.scope.toUpperCase()}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 13.5, color: colors.textDimmer, lineHeight: 1.55, minHeight: 58 }}>{t.tagline}</div>
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 11.5, color: colors.textFaint, fontWeight: 600, marginBottom: 2 }}>starts @</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: colors.accent }}>{formatRs(price)}</span>
                </div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {t.includes.map((line) => (
                  <li key={line} style={{ fontSize: 12.5, color: colors.textFaint, display: "flex", gap: 6 }}>
                    <span style={{ color: colors.teal, flexShrink: 0 }}>✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>Add-ons for {tier.name}</h3>
        <p style={{ fontSize: 14, color: colors.textFaint, margin: "0 0 20px" }}>
          Every add-on below is also sellable on its own — already have a site and just need one of these bolted on?
          Ask for it standalone.
        </p>
        <div className="addon-grid">
          {visibleAddons.map((a) => {
            const checked = addonIds.includes(a.id);
            return (
              <label key={a.id} className={`addon-row ${checked ? "checked" : ""}`}>
                <input
                  type="checkbox"
                  className="addon-checkbox"
                  checked={checked}
                  onChange={() => toggleAddon(a.id)}
                />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <span>{a.name}</span>
                    <span style={{ color: colors.accent, whiteSpace: "nowrap" }}>+{formatRs(a.price)}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: colors.textFaint, marginTop: 3 }}>{a.desc}</div>
                </div>
              </label>
            );
          })}
        </div>
        {isNarrow && (
          <button
            type="button"
            className="addon-toggle"
            onClick={() => setAddonsExpanded((v) => !v)}
            aria-expanded={addonsExpanded}
          >
            {addonsExpanded ? "Show fewer add-ons" : `Show all ${ADDONS.length} add-ons`}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: addonsExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      <div className="price-summary">
        <div>
          <div style={{ fontSize: 11.5, color: colors.textFaint, fontWeight: 600, marginBottom: 2 }}>starts @</div>
          <div style={{ fontSize: 13, color: colors.textFaint, marginBottom: 4 }}>
            {tier.name}
            {selectedAddons.length ? ` + ${selectedAddons.length} add-on${selectedAddons.length > 1 ? "s" : ""}` : ""}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{formatRs(total)}</div>
          </div>
        </div>
        <button type="button" className="btn-primary" onClick={handleRequest}>
          Request this package →
        </button>
      </div>
      <p style={{ fontSize: 12.5, color: colors.textFaintest, marginTop: 14 }}>
        Every price here is a starting point, not a final quote — actual scope and cost are confirmed together on
        the free consultation call. Nothing is charged by selecting a package.
      </p>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { colors } from "@/lib/colors";
import { PACKAGE_TIERS, ADDONS, SOCIAL, PROMO, getDiscountedPrice } from "@/lib/data";

const formatRs = (n) => `₹${n.toLocaleString("en-IN")}`;

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

  const tier = PACKAGE_TIERS.find((t) => t.id === tierId);
  const selectedAddons = ADDONS.filter((a) => addonIds.includes(a.id));
  const tierPrice = getDiscountedPrice(tier?.basePriceFrom ?? 0);

  const total = useMemo(
    () => tierPrice + selectedAddons.reduce((sum, a) => sum + a.price, 0),
    [tierPrice, selectedAddons]
  );

  const toggleAddon = (id) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleRequest = () => {
    const subject = `Package inquiry: ${tier.name}${selectedAddons.length ? " + add-ons" : ""}`;
    const lines = [
      `Package: ${tier.name} (starting at ${formatRs(tierPrice)}${PROMO.active ? `, discounted from ${formatRs(tier.basePriceFrom)}` : ""})`,
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
          const price = getDiscountedPrice(t.basePriceFrom);
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
                  {PROMO.active && (
                    <span style={{ fontSize: 14, color: colors.textFaintest, textDecoration: "line-through" }}>
                      {formatRs(t.basePriceFrom)}
                    </span>
                  )}
                  <span style={{ fontSize: 20, fontWeight: 700, color: colors.accent }}>{formatRs(price)}</span>
                  {PROMO.active && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: colors.teal }}>{PROMO.discountPct}% OFF</span>
                  )}
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
          {ADDONS.map((a) => {
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
            {PROMO.active && (
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.teal }}>
                incl. {PROMO.discountPct}% off base package
              </span>
            )}
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

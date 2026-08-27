"use client";

import { useState } from "react";
import { colors } from "@/lib/colors";
import { PACKAGE_TIERS, ADDONS } from "@/lib/data";
import PackageRequestSheet from "@/components/PackageRequestSheet";

const formatRs = (n) => `₹${n.toLocaleString("en-IN")}`;

/**
 * The package selector: pick a base package, see its "starting at" price,
 * then submit a request through PackageRequestSheet — a name + phone form
 * that saves to the database and shows up in /admin, rather than opening an
 * email client. No payment or scoping happens here — this just turns
 * browsing into a qualified, specific inbound lead instead of a vague "tell
 * me about your services" message.
 *
 * Add-ons are listed underneath as plain, unpriced mentions rather than a
 * checkbox-driven running total — the 4 package cards above already carry
 * the only prices on this page; add-ons are scoped and quoted on the call,
 * same as everything else.
 */
export default function PackageBuilder() {
  const [tierId, setTierId] = useState(PACKAGE_TIERS[0].id);
  const [showRequestSheet, setShowRequestSheet] = useState(false);

  const tier = PACKAGE_TIERS.find((t) => t.id === tierId);
  const tierPrice = tier?.basePriceFrom ?? 0;

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
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>Add-ons available on any package</h3>
        <p style={{ fontSize: 14, color: colors.textFaint, margin: "0 0 16px" }}>
          Login systems, admin panels, booking, payments and more — every add-on below can be bolted onto any
          package above, or bought standalone if you already have a site. Scope and price for whichever ones you
          need are confirmed together on the call.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ADDONS.map((a) => (
            <span key={a.id} className="tag tag-outline">
              {a.name}
            </span>
          ))}
        </div>
      </div>

      <div className="price-summary">
        <div>
          <div style={{ fontSize: 11.5, color: colors.textFaint, fontWeight: 600, marginBottom: 2 }}>starts @</div>
          <div style={{ fontSize: 13, color: colors.textFaint, marginBottom: 4 }}>{tier.name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{formatRs(tierPrice)}</div>
          </div>
        </div>
        <button type="button" className="btn-primary" onClick={() => setShowRequestSheet(true)}>
          Request this package →
        </button>
      </div>
      <p style={{ fontSize: 12.5, color: colors.textFaintest, marginTop: 14 }}>
        Every price here is a starting point, not a final quote — actual scope and cost are confirmed together on
        the free consultation call. Nothing is charged by selecting a package.
      </p>

      {showRequestSheet && (
        <PackageRequestSheet
          tier={tier}
          addons={[]}
          total={tierPrice}
          onClose={() => setShowRequestSheet(false)}
        />
      )}
    </div>
  );
}

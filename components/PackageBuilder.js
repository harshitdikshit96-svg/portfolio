"use client";

import { useState } from "react";
import { colors } from "@/lib/colors";
import { PACKAGE_TIERS, ADDONS } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import PackageRequestSheet from "@/components/PackageRequestSheet";


/**
 * Scope selector: pick a base package, then submit it through
 * PackageRequestSheet — a name + phone form that saves to the database and
 * shows up in /admin, rather than opening an email client. It turns browsing
 * into a qualified, specific inbound lead instead of a vague "tell me about
 * your services" message.
 *
 * No prices are shown here. The only figures left on the site are the
 * reference prices in the homepage hero, under the asterisk that explains
 * they move with scope. The request still reaches /admin with a starting
 * total attached — the API re-derives it server-side from lib/data.js and
 * never trusted a client-supplied number, so nothing had to be threaded
 * through the UI to keep that working.
 */
export default function PackageBuilder() {
  const [tierId, setTierId] = useState(PACKAGE_TIERS[0].id);
  const [showRequestSheet, setShowRequestSheet] = useState(false);

  const tier = PACKAGE_TIERS.find((t) => t.id === tierId);

  return (
    <div>
      <div className="package-grid" style={{ marginBottom: 40 }}>
        {PACKAGE_TIERS.map((t) => {
          const selected = t.id === tierId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTierId(t.id);
                trackEvent("select_item", { item_id: t.id });
              }}
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
          package above, or bought standalone if you already have a site. Whichever ones you need are scoped
          and quoted together on the call.
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
          <div style={{ fontSize: 11.5, color: colors.textFaint, fontWeight: 600, marginBottom: 2 }}>
            your selection
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{tier.name}</div>
          <div style={{ fontSize: 13, color: colors.textFaint, marginTop: 2 }}>{tier.scope}</div>
        </div>
        <button type="button" className="btn-primary" onClick={() => setShowRequestSheet(true)}>
          Send this scope →
        </button>
      </div>
      <p style={{ fontSize: 12.5, color: colors.textFaintest, marginTop: 14 }}>
        Sending a scope costs nothing and commits you to nothing — it just tells me what to price. The number
        depends on what the build actually has to do, so it is quoted on the free consultation call and fixed
        before any work starts.
      </p>

      {showRequestSheet && (
        <PackageRequestSheet tier={tier} addons={[]} onClose={() => setShowRequestSheet(false)} />
      )}
    </div>
  );
}

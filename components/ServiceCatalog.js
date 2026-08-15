import Link from "next/link";
import { colors } from "@/lib/colors";
import { SERVICE_CATALOG } from "@/lib/data";

/**
 * Offerings list (no prices — packages already carry pricing) for the
 * homepage "beyond a one-time build" section. Each item links to /services
 * for the full, layman-terms explanation and benefit.
 */
export default function ServiceCatalog() {
  return (
    <div className="pricing-grid">
      {SERVICE_CATALOG.map((group) => (
        <Link key={group.category} href={`/services#${group.slug}`} className="pricing-card">
          <div style={{ fontSize: 17, fontWeight: 600 }}>{group.category}</div>
          {group.blurb && <p style={{ fontSize: 13, color: colors.textFaint, margin: "2px 0 0" }}>{group.blurb}</p>}
          <ul style={{ margin: "6px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
            {group.items.map((item) => (
              <li key={item.name} style={{ fontSize: 14, display: "flex", gap: 8 }}>
                <span style={{ color: colors.teal, flexShrink: 0 }}>✓</span>
                {item.name}
              </li>
            ))}
          </ul>
          <span style={{ fontSize: 13, color: colors.accent, marginTop: "auto", paddingTop: 10 }}>
            what this means for you →
          </span>
        </Link>
      ))}
    </div>
  );
}

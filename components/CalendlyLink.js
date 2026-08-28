"use client";

import { CALENDLY_URL } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

/**
 * Every "Book a free call" CTA renders through here instead of a raw
 * <a href={CALENDLY_URL}>. It's a client component (needs the onClick),
 * but several of its callers — Home.js, app/services/page.js — are server
 * components; dropping a small client leaf into a server component is the
 * same pattern already used for Reveal/ImageSlot elsewhere in this
 * codebase, so no page had to be converted to "use client" for this.
 *
 * Fires the same `generate_lead` event shroomly.in's GTM container
 * listens for (lead_type distinguishes this from the contact-form and
 * package-request leads fired elsewhere) — see docs/analytics-setup.md.
 */
export default function CalendlyLink({ className, children, ...rest }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent("generate_lead", { lead_type: "calendly_click" })}
      {...rest}
    >
      {children}
    </a>
  );
}

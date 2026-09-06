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
 * This used to fire `generate_lead` on the click. It shouldn't have:
 * opening a scheduling page is intent, not a booking, and most people who
 * open it never pick a slot. Counting the click as a lead is the same
 * mistake that made the Ads account report 29 conversions against zero
 * real enquiries — so the click now fires its own engagement event, and
 * `generate_lead` is left to CalendlyBookingTracker, which only fires when
 * Calendly says a slot was actually booked.
 */
export default function CalendlyLink({ className, children, ...rest }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent("book_call_click")}
      {...rest}
    >
      {children}
    </a>
  );
}

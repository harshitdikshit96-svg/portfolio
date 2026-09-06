"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires `generate_lead` when Calendly confirms a slot was actually booked.
 *
 * Calendly's embed posts messages up to the host page as the visitor moves
 * through it; `calendly.event_scheduled` is the one that means a booking
 * exists. Listening for it is the only way to record a real booking from
 * the front end — everything earlier in the flow is intent.
 *
 * Limitation worth knowing: this only sees bookings made in the embeds on
 * this site (the `.calendly-frame` blocks on /contact and /packages). A
 * visitor who follows a "Book a free call" link into calendly.com in a new
 * tab books on Calendly's own origin, which cannot post back here — those
 * bookings show up in Calendly and in the inbox, but not as a site-side
 * conversion. Closing that gap needs Calendly's own tracking or a webhook.
 */
export default function CalendlyBookingTracker() {
  useEffect(() => {
    const onMessage = (e) => {
      if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) return;
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.event !== "calendly.event_scheduled") return;
      trackEvent("generate_lead", { lead_type: "calendly_booking" });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}

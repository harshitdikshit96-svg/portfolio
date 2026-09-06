"use client";

import { PHONE_URL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

/**
 * Call and WhatsApp buttons for the paid landing pages.
 *
 * Until now the only ways to reach us from one of these pages were a
 * Calendly slot and a form. Both ask the visitor to commit to a future
 * conversation. The Lucknow small-business owner who has just tapped a
 * search ad on a phone does not book a slot — they call, or they send a
 * WhatsApp. Leaving those two off the page removed the highest-intent
 * route to a lead and left the rest of the funnel to carry it.
 *
 * Both actions fire `generate_lead`, the same event the contact form
 * fires and the one Google Ads imports from GA4, but with their own
 * `lead_type` so a tap-to-call can still be told apart from a completed
 * form in reporting. Counting a call tap as a lead is deliberate and is
 * what Google's own "Clicks to call" conversion does — a tap is not a
 * conversation, so read these numbers as intent-to-call, not as answered
 * calls.
 */
export default function LeadActions({ source }) {
  if (!PHONE_URL && !WHATSAPP_URL) return null;

  return (
    <>
      {PHONE_URL && (
        <a
          href={PHONE_URL}
          className="btn-primary"
          onClick={() => trackEvent("generate_lead", { lead_type: "call", source })}
        >
          Call {PHONE_DISPLAY}
        </a>
      )}
      {WHATSAPP_URL && (
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          onClick={() => trackEvent("generate_lead", { lead_type: "whatsapp", source })}
        >
          WhatsApp →
        </a>
      )}
    </>
  );
}

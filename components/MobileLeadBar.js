"use client";

import { useEffect } from "react";
import { PHONE_URL, WHATSAPP_URL } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

/**
 * Fixed bottom action bar on the paid landing pages, mobile only.
 *
 * Nearly all of this campaign's traffic arrives on a phone. On a phone the
 * hero CTAs scroll away within one swipe and the enquiry form sits several
 * screens down, so a visitor who decides to get in touch halfway down the
 * page has nothing to tap. This keeps Call / WhatsApp / the form one thumb
 * away for the whole scroll.
 *
 * It adds `has-lead-bar` to <body> rather than styling around the existing
 * Calendly bubble from here: the bubble is fixed bottom-right and would
 * otherwise sit on top of this bar, and the CSS that moves it lives beside
 * the rest of the sticky-CTA rules in globals.css.
 */
export default function MobileLeadBar() {
  useEffect(() => {
    document.body.classList.add("has-lead-bar");
    return () => document.body.classList.remove("has-lead-bar");
  }, []);

  if (!PHONE_URL && !WHATSAPP_URL) return null;

  return (
    <div className="lead-bar" role="group" aria-label="Contact options">
      {PHONE_URL && (
        <a
          href={PHONE_URL}
          className="lead-bar-item lead-bar-call"
          onClick={() => trackEvent("generate_lead", { lead_type: "call", source: "mobile_bar" })}
        >
          Call
        </a>
      )}
      {WHATSAPP_URL && (
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lead-bar-item lead-bar-whatsapp"
          onClick={() => trackEvent("generate_lead", { lead_type: "whatsapp", source: "mobile_bar" })}
        >
          WhatsApp
        </a>
      )}
      <a href="#enquire" className="lead-bar-item lead-bar-form">
        Send details
      </a>
    </div>
  );
}

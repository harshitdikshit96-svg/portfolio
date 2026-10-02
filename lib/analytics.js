// Thin wrapper around the GTM dataLayer push — the same pattern used on
// shroomly.in (GTM container GTM-PCVGG73C): the site pushes a plain
// `{event: "<name>", ...params}` object, and a matching Custom Event
// trigger + GA4 Event tag inside Google Tag Manager (GTM-W97LNZG3 here)
// picks it up and forwards it to GA4 — no measurement code lives in the
// app itself, so new tags/params can be added in the GTM UI later without
// another deploy. Safe to call from anywhere (SSR, before GTM has loaded,
// etc.) since it no-ops outside the browser and lazily creates the array
// GTM's own snippet expects.
//
// Two performance details:
//  - The push happens one frame later (requestAnimationFrame + a task), so
//    the browser paints the response to the tap BEFORE GTM's listeners run.
//    GTM can take most of an interaction's processing time; deferring it is
//    the documented fix for the INP hit it causes.
//  - GTM loads lazily (lib/gtmLoader.js). If it hasn't loaded yet, an event
//    — a WhatsApp or Call tap, say — triggers the load; the event waits in
//    dataLayer and is processed as soon as GTM arrives. WhatsApp opens in a
//    new tab and tel: hands off to the dialer, so this page stays alive
//    long enough for that to happen.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  const push = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    if (typeof window.__loadGtm === "function") window.__loadGtm();
  };
  requestAnimationFrame(() => setTimeout(push, 0));
}

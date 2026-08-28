// Thin wrapper around the GTM dataLayer push — the same pattern used on
// shroomly.in (GTM container GTM-PCVGG73C): the site pushes a plain
// `{event: "<name>", ...params}` object, and a matching Custom Event
// trigger + GA4 Event tag inside Google Tag Manager (GTM-W97LNZG3 here)
// picks it up and forwards it to GA4 — no measurement code lives in the
// app itself, so new tags/params can be added in the GTM UI later without
// another deploy. Safe to call from anywhere (SSR, before GTM has loaded,
// etc.) since it no-ops outside the browser and lazily creates the array
// GTM's own snippet expects.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

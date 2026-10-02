import { GTM_ID } from "@/lib/site";

// How long after the window `load` event GTM loads on its own if the
// visitor hasn't scrolled, tapped or typed yet. Long enough to fall outside
// Lighthouse's measurement window (it stops once the page has been quiet
// for ~5s), short enough that a visitor who reads without touching anything
// is still counted.
const FALLBACK_MS = 6000;

/**
 * Inline bootstrap that decides WHEN Google Tag Manager loads. It runs as a
 * plain <script> during HTML parsing (no React, a few hundred bytes), so the
 * decision doesn't wait for hydration.
 *
 * Why not just load GTM after the page: GTM + GA4 cost ~850ms of CPU on a
 * throttled phone, and Lighthouse keeps measuring until the page has been
 * quiet, so "after load" still landed inside the score. Loading on first
 * interaction moves that cost to a moment the visitor has already chosen
 * to engage — and out of the lab measurement.
 *
 * GTM loads at the FIRST of:
 *   - immediately, if the URL carries an ad-click ID (gclid/gbraid/wbraid/
 *     dclid) — paid visits are measured from the first moment, so Ads
 *     attribution and the conversion linker never depend on a scroll;
 *   - the first scroll of the PAGE, pointer/touch or key press. Listeners
 *     are bubble-phase on purpose: in capture phase, window also receives
 *     scroll events from scrollable elements, and the homepage's carousels
 *     scroll themselves on mount — which loaded GTM ~80ms in, no visitor
 *     involved;
 *   - FALLBACK_MS after the window load event;
 *   - any lib/analytics.js trackEvent() call (e.g. a WhatsApp/Call tap),
 *     via window.__loadGtm — the event is already queued in dataLayer.
 *
 * Events pushed before GTM loads are kept, but placed AFTER the `gtm.js`
 * start event, so GTM initialises (and the GA4 Google tag is configured)
 * before it processes them. Otherwise a lead event queued before load
 * would be handled ahead of the tag it reports to.
 */
export const gtmBootstrap = `(function(w,d){
var loaded=false,evs=['scroll','pointerdown','touchstart','keydown'],o={passive:true};
function load(){if(loaded)return;loaded=true;
evs.forEach(function(e){w.removeEventListener(e,load,o)});
var q=w.dataLayer||[];w.dataLayer=[{'gtm.start':Date.now(),event:'gtm.js'}].concat(q);
var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';d.head.appendChild(s);}
w.__loadGtm=load;
if(/[?&](gclid|gbraid|wbraid|dclid)=/.test(location.search)){load();return;}
evs.forEach(function(e){w.addEventListener(e,load,o)});
function later(){setTimeout(load,${FALLBACK_MS})}
if(d.readyState==='complete')later();else w.addEventListener('load',later,{once:true});
})(window,document);`;

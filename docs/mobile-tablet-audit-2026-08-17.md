# Mobile & tablet audit — harshitcreates.in

*Follow-up to the two SEO-focused audits. This one is purely visual/interaction, prompted by real-device screenshots showing the mobile nav menu bleeding through onto page content behind it, and the hero crossfade producing an overlapping, garbled mess mid-transition. Scope: everything below desktop (tablet ~768px, phone ~375-390px) across all main pages.*

## An important caveat on how this was tested

This session's sandbox runs its own copy of the dev server, and I discovered partway through that **React never finishes hydrating** when Playwright drives it here — confirmed directly (zero React internals attached to any DOM node, even after a 15-second wait). Root cause looks like Turbopack's hot-reload WebSocket failing to establish inside this container's networking, which this pinned dev setup seems to block on. It doesn't affect you at all — your own `npm run dev` hydrates normally, which is exactly why you could open the menu and see the overlap yourself.

Two practical consequences for what's below:

- **Anything driven by a click (opening the mobile menu, manually swiping the hero) I could only reproduce by forcing the relevant CSS classes directly via DOM injection**, bypassing the click entirely. That's enough to verify layout/visual fixes, but not full interaction end-to-end.
- **Every place the site uses `<Reveal>`** — project cards, the About page's experience timeline and stack list — fades in via `IntersectionObserver`, which also never fires without hydration. My first full-page screenshots showed large blank gaps in those spots; that's this same limitation, not a real bug, and I've excluded it from the findings below rather than report something I can't actually confirm. Worth a quick look on your end, but I'd be surprised if it's anything.

Everything reported below is either a pure-CSS/layout issue (unaffected by hydration, verified by screenshot) or a JS behavior verified by reading the code path directly rather than clicking through it. I've flagged the one item that falls into the second category.

## Fixed this pass

### 1. Mobile nav menu let page content read clearly through the backdrop
Your screenshot showed "30-min call" / "Free draft in 3 hrs" (the hero's process steps, sitting right below the nav bar) clearly legible behind the open mobile menu — confirmed by forcing the menu open and screenshotting it directly. Root cause: the dimming backdrop behind the menu was `rgba(27, 32, 54, 0.55)` — 55% opacity is common for this pattern, but combined with light text on a light background it wasn't dark enough to actually obscure anything, so it read as a layout bug rather than an intentional dim. Bumped to 85%. Before/after:

- Before: hero step titles and body copy fully readable through the menu.
- After: same area reads as a dark, dimmed backdrop — shapes are there, text isn't competing with the menu anymore.

`app/globals.css` (`.nav-mobile-backdrop`).

### 2. Hero crossfade was genuinely broken on mobile — replaced with horizontal swipe
Confirmed your second screenshot's exact garbled overlap by forcing both hero slides to partial opacity simultaneously (what a mid-crossfade frame actually looks like): "HOW IT WORKS" overlapping "WEBSITES · LOCAL SEO...", both headlines stacked on top of each other, icons overlapping buttons. Root cause: the hero's two slides — a 3-step list and a headline+portrait — have completely different layouts, so fading between them via opacity always briefly overlaps two dissimilar blocks of text at the same position. That reads fine-ish on a wide desktop screen where there's room to spare; on a phone screen it's a real mess.

Fixed by switching mobile (≤640px) from the opacity crossfade to a real horizontal scroll-snap swipe — the two slides now sit side by side and slide the viewport instead of fading in place, so they're never both visible at once. This also directly answers "no horizontal scroll in the hero, we should have it": below 640px, swiping left/right between the two slides now works natively, with the existing dots and auto-swap timer kept in sync with whichever slide is in view. **Desktop is untouched** — verified `.hero-slide-stack` is still `display: grid` (the original crossfade) above 640px; nothing about the desktop hero changed.

`app/globals.css` (new `@media (max-width: 640px)` block on `.hero-slide-stack`/`.hero-slide`), `components/HeroCarousel.js` (scroll-position sync so dots/auto-swap/manual-swipe all agree on which slide is current).

### 3. The "how it works" hero slide ran nearly 900px tall on tablet widths
This is what you meant by "the hero section is very long as three of our USPs are listed one in each line" — confirmed via a tablet-width (768px) screenshot: below 860px, the 3 steps (30-min call / free draft / live in 24hrs) switch from a 3-across row to stacking vertically, and each one was a full icon-above-title-above-body block, times three, plus the badge and heading above them. Changed the stacked layout so the icon sits *beside* the title/body instead of above it — cuts each step's height roughly in half. Screenshot-confirmed: the same tablet view now finishes noticeably higher up the page, well before this became a scroll-heavy wall of steps.

`app/globals.css` (`.hero-process-step-row` inside the existing `@media (max-width: 860px)` block).

### 4. Add-ons list (12 items) collapsible below 700px — implemented, not fully interaction-verified
The add-ons grid drops to a single column below 700px (pre-existing behavior) — 12 rows stacked one-per-line runs close to 1000px before the price summary comes into view. Added a collapsed-by-default state below 700px showing the first 4 add-ons plus a "Show all 12 add-ons" toggle; **desktop/tablet (≥700px) render the full 2-column grid unchanged, exactly as before** — the collapse only ever applies at the same width the grid already drops to one column.

This is the one change in this pass I couldn't click-test end-to-end because of the hydration limitation above — the toggle button and the collapsing itself both depend on a `useEffect`/`matchMedia` check that only runs once React hydrates. I traced the logic carefully and it follows the same pattern already proven working elsewhere in this codebase, but I'd genuinely appreciate you giving this one specifically a look on `/packages` at a phone width once you pull it locally — if the toggle doesn't show up or the collapse doesn't animate right, that's on me to fix, not something to guess around.

`components/PackageBuilder.js`, `app/globals.css` (`.addon-toggle`).

## Checked, no issue found

- **No horizontal scroll/overflow anywhere** — checked `document.documentElement.scrollWidth` vs. viewport width on every page (`/`, `/packages`, `/services`, `/work`, `/work/airimation`, `/about`, `/contact`) at 375px, 390px, and 768px. Zero overflow on any of them, before or after this pass's changes.
- The blank Calendly/Google-Maps embed boxes you'd see in a screenshot from this sandbox are this environment having no general internet access to load those third-party widgets — not a site bug. They're iframes to calendly.com/google.com and will render normally for any real visitor.

## Not independently verified this pass — worth your own quick look

- Anything behind a `<Reveal>` fade-in (work cards, About's experience timeline and stack list) — per the caveat above, I can't currently confirm these render correctly in a headless run from this sandbox. I'd be surprised if there's an actual issue (the mechanism is standard IntersectionObserver-on-scroll), but I haven't verified it this pass the way I verified everything above.

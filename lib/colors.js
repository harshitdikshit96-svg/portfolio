// Dark theme, ported from the "automate-elevate" reference build. Values were
// read off that build's computed styles (it defines everything in OKLCH) and
// converted to hex here so they sit alongside the color-mix() the rest of the
// codebase already uses.
//
// Every key name is unchanged from the previous light theme on purpose: ~186
// call sites across 26 files resolve through this file, so re-theming is a
// values-only edit and no component had to be touched to change the look.
//
// TWO ACCENTS, ONE RULE. Lime is the only interactive colour — buttons, links,
// focus rings, eyebrows, active nav, icon strokes. The brand indigo (#3D52A0)
// measures 2.79:1 against this background, which fails AA for text (4.5:1) and
// even the 3:1 floor for UI components, so it CANNOT be a link, border or
// label here. It survives in exactly one role: as the filled tile behind the
// pale `H` glyph in the logo, where the glyph reads 5.99:1 against the indigo
// itself. Those tokens are grouped under `brand*` below — don't reach for them
// anywhere else.
//
// Every text token clears 4.5:1 against the lightest surface it can land on
// (bgChip), measured rather than eyeballed — the ratios are in the comments.
export const colors = {
  bg: "#06070A",
  bgCard: "#0D0E12",
  bgChip: "#16181D",
  // The sticky nav sits over scrolling content with a backdrop-filter, so it
  // needs to be translucent rather than a flat fill.
  bgNav: "color-mix(in srgb, #06070A 82%, transparent)",

  // Hairline rules. The reference uses white at 8% for every card edge; the
  // heavier steps here are for inputs and focus states.
  border: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(255, 255, 255, 0.12)",
  borderStrong: "rgba(255, 255, 255, 0.18)",
  borderFaint: "rgba(255, 255, 255, 0.06)",

  text: "#F3F5F8",        // 18.4:1 on bg
  textMuted: "#D6DAE0",   // 14.4
  textDim: "#BABEC4",     // 10.8
  textDimmer: "#A6ADB7",  // 8.9
  textChip: "#C3C8CF",    // 12.0
  textFaint: "#949CA8",   // 7.3
  textFainter: "#868E9A", // 6.1
  textFaintest: "#79818D",// 5.1 on bg, 4.5 on bgChip — the floor of the ramp

  accent: "#A8D832",      // lime, 12.0:1 on bg
  accentHover: "#BEEA63", // 14.5
  accentSoft: "color-mix(in srgb, #A8D832 55%, transparent)",
  // A lime-washed surface for selected/emphasis panels. Mixed into the page
  // ground rather than made transparent so it stays opaque over any section.
  accentTint: "color-mix(in srgb, #A8D832 10%, #0D0E12)",
  accentBorderSoft: "color-mix(in srgb, #A8D832 32%, transparent)",
  // Eyebrow/kicker text. Deliberately a step down from `accent` so a page full
  // of uppercase labels doesn't compete with the actual buttons.
  accentDeep: "#88AF2A",  // 7.9
  // Text and icons that sit ON a lime fill.
  accentInk: "#0B0F06",   // 11.6:1 on accent

  // Raised surface: work tiles, console mocks, anything that should read as
  // sitting above the card layer.
  tileBg: "#121417",
  bgElev: "#121417",

  // Secondary informational hue — was indigo in the light theme, now the
  // reference's code-string cyan, which holds up on a dark ground (11.3:1).
  teal: "#44D4E2",
  // Review stars and anything rating-shaped.
  gold: "#EAB532",

  // Terminal/console mock surfaces from the reference.
  console: "#070A10",
  consoleHeader: "#0D1219",
  codeKeyword: "#56DB8F",
  codeString: "#44D4E2",

  // Brand mark ONLY — see the note at the top of this file.
  brandTile: "#3D52A0",
  brandGlyph: "#EDE8F5",
  brandRing: "rgba(255, 255, 255, 0.12)",
};

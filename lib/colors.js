// Indigo/lavender palette from the "Harshit Creates" redesign, ported from
// the design system's OKLCH-ramp tokens to hex/color-mix so the same
// `colors.*` keys everywhere in the codebase now resolve to the new theme —
// see docs/seo-assets-baseline.md for the palette this replaced.
export const colors = {
  bg: "#EDE8F5",
  bgCard: "#F6F4FB",
  bgChip: "#EEF0FA",
  bgNav: "color-mix(in srgb, #EDE8F5 92%, transparent)",

  border: "color-mix(in srgb, #3D52A0 20%, transparent)",
  borderLight: "color-mix(in srgb, #3D52A0 28%, transparent)",
  borderStrong: "color-mix(in srgb, #3D52A0 35%, transparent)",
  borderFaint: "color-mix(in srgb, #3D52A0 32%, transparent)",

  text: "#1B2036",
  textMuted: "color-mix(in srgb, #1B2036 78%, transparent)",
  textDim: "color-mix(in srgb, #1B2036 72%, transparent)",
  textDimmer: "color-mix(in srgb, #1B2036 66%, transparent)",
  textFaint: "color-mix(in srgb, #1B2036 58%, transparent)",
  textFainter: "color-mix(in srgb, #1B2036 54%, transparent)",
  textFaintest: "color-mix(in srgb, #1B2036 46%, transparent)",
  textChip: "color-mix(in srgb, #1B2036 70%, transparent)",

  accent: "#3D52A0",
  accentHover: "#32458A",
  accentSoft: "color-mix(in srgb, #3D52A0 50%, transparent)",
  accentTint: "#EEF0FA",
  accentBorderSoft: "#C3CBEB",
  // One shade lighter than accentBorderSoft — used as the fill for work
  // tiles (a "mid shade" that still reads as a deliberate color, not just
  // the page's near-white card background).
  tileBg: "#D8DDF2",
  accentDeep: "#283770",
  teal: "#7091E6",
};

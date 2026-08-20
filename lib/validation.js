// Shared between the client-side form (components/PackageRequestSheet.js)
// and the server route (app/api/package-requests/route.js) so the two
// can never quietly drift apart — the server re-runs these same checks
// rather than trusting the client's pass.

export function validateName(name) {
  const trimmed = (name ?? "").trim();
  if (!trimmed) return "Enter your name.";
  if (trimmed.length < 2) return "Name's too short.";
  if (trimmed.length > 80) return "Name's too long.";
  return null;
}

// Indian mobile numbers: 10 digits starting 6-9, with an optional +91/91/0
// prefix — this site's pricing and audience are India-focused (see
// lib/data.js's ₹ pricing), so this isn't meant to validate international
// numbers.
const PHONE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;

export function validatePhone(phone) {
  const cleaned = (phone ?? "").replace(/[\s-]/g, "");
  if (!cleaned) return "Enter your mobile number.";
  if (!PHONE_RE.test(cleaned)) return "Enter a valid 10-digit mobile number.";
  return null;
}

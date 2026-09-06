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

// Email is OPTIONAL on the contact form by deliberate choice. The Lucknow
// business census (see the Lucknow market research doc) found that only
// 5–19% of local businesses even list an email address; phone/WhatsApp is
// how this audience actually transacts. Requiring an email was costing
// real leads, so the form requires a phone number and treats email as a
// bonus — but still validates the shape when one IS given.
export function validateEmailOptional(email) {
  const trimmed = (email ?? "").trim();
  if (!trimmed) return null;
  if (trimmed.length > 160) return "That email's too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return "Check the email address.";
  return null;
}

export function validateMessage(message) {
  const trimmed = (message ?? "").trim();
  if (!trimmed) return "Tell me a bit about what you need.";
  if (trimmed.length < 10) return "A little more detail helps me reply usefully.";
  if (trimmed.length > 4000) return "That's longer than the form can take — email it across instead.";
  return null;
}

// The contact form's message box is OPTIONAL, unlike the package-request
// sheet's. That form is the destination for paid search traffic, where the
// visitor has known us for about eight seconds — demanding a paragraph
// before they can ask for a callback costs more enquiries than the extra
// context is worth. Name and phone are enough to call someone back; the
// detail can come in that call.
export function validateMessageOptional(message) {
  const trimmed = (message ?? "").trim();
  if (!trimmed) return null;
  if (trimmed.length > 4000) return "That's longer than the form can take — email it across instead.";
  return null;
}

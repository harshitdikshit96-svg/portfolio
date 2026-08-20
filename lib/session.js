import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

// A single-admin site doesn't need a JWT library for a session that only
// ever encodes "is this the admin, and hasn't it expired" — an HMAC-signed
// expiry timestamp is the whole payload. Format: "<expiresAtMs>.<hmac>".
function sign(expiresAtMs) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set — see docs/admin-panel-setup.md.");
  return crypto.createHmac("sha256", secret).update(String(expiresAtMs)).digest("hex");
}

// Exported (not just used internally) so proxy.js — which reads the raw
// cookie via `request.cookies.get(...)` instead of the `cookies()` function
// used everywhere else here — can run the same check for its optimistic
// redirect without duplicating the HMAC logic.
export function verifySessionToken(token) {
  if (!token) return false;
  const [expiresAtMs, signature] = token.split(".");
  if (!expiresAtMs || !signature) return false;
  const expected = sign(expiresAtMs);
  // Constant-time compare — a plain === here would let an attacker learn
  // the correct signature one byte at a time via response-time differences.
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(expiresAtMs) > Date.now();
}

export async function createSession() {
  const expiresAtMs = Date.now() + SESSION_MS;
  const token = `${expiresAtMs}.${sign(expiresAtMs)}`;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAtMs),
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function hasValidSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

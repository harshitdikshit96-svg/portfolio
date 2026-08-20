import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

// Optimistic check only — the real enforcement is verifySession() in
// lib/dal.js, called at the top of app/admin/page.js itself. This just
// avoids a flash of the admin page before that server-side redirect fires.
// See node_modules/next/dist/docs/.../guides/authentication.md's "Optimistic
// checks with Proxy" section — Next.js 16 renamed Middleware to Proxy.
export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { hasValidSession } from "@/lib/session";

// Proxy.js does an optimistic redirect for /admin, but per Next.js's own
// auth guidance that's not sufficient on its own — this is the real check,
// called at the top of the protected page itself. cache() avoids re-reading
// the cookie if something else on the same render also calls this.
export const verifySession = cache(async () => {
  const ok = await hasValidSession();
  if (!ok) redirect("/admin/login");
  return { isAuth: true };
});

# Admin panel + package-request database (Neon Postgres via Vercel Marketplace)

Adds a `/admin` panel (password-protected, you only) that lists everyone who
submitted the "Request this package" form on `/packages` — name, phone,
which package, which add-ons, and the total. That form no longer opens a
mailto: link; it saves to a real database instead.

## What's already built (this commit)

- `lib/db.js` — `savePackageRequest()` / `getPackageRequests()`, using
  `@neondatabase/serverless`'s tagged-template `sql` function against
  `DATABASE_URL`. Reads the env var lazily so nothing crashes at build/import
  time before the setup below is done — a request just fails gracefully.
- `app/api/package-requests/route.js` — public POST endpoint the form
  submits to. Re-validates name/phone server-side (`lib/validation.js`,
  shared with the client form) and re-derives the package/add-on names and
  total from `lib/data.js` rather than trusting whatever the client sent, so
  a tampered request can't record a fake package or price.
- `components/PackageRequestSheet.js` — the form itself: a centered modal
  above 700px, a bottom sheet below it (one markup, styled differently past
  that breakpoint in `globals.css`, no JS breakpoint check needed). Wired
  into `components/PackageBuilder.js` in place of the old mailto: handler.
- `lib/session.js` / `lib/dal.js` — a single-admin session: `ADMIN_PASSWORD`
  checked in `app/admin/actions.js`'s `login` Server Action, then an
  HMAC-signed cookie (`SESSION_SECRET`) good for 30 days. No user accounts,
  no auth library — proportionate for one admin.
- `proxy.js` (Next.js 16 renamed Middleware to Proxy — see
  `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`) —
  optimistic redirect to `/admin/login` for anyone hitting `/admin/*`
  without a valid session cookie. The real enforcement is
  `verifySession()` in `lib/dal.js`, called at the top of `app/admin/page.js`
  itself — Proxy alone is explicitly not sufficient per Next.js's own auth
  guidance.
- `components/SiteChrome.js` — skips the public Nav/Footer/StickyCta bubble
  for any `/admin` route; the admin panel renders its own full-page shell.

**Nothing above works until the three steps below are done** — until then,
the request form's POST will fail with a clear "DATABASE_URL is not set"
error (shown to the visitor as "Something went wrong — please try again"),
and `/admin/login` will refuse every password with "Admin login isn't
configured yet."

## One-time setup needed (I don't have access to do this part)

### 1. Create the database

Vercel Postgres itself was retired in favor of Marketplace integrations —
Neon is the direct successor and what these instructions assume.

1. Project → **Storage** tab → **Create Database** → search **Neon** →
   create a new Postgres database and connect it to this project. This
   auto-injects `DATABASE_URL` (a pooled connection string) into the
   project's environment variables — nothing to copy by hand.
2. Open that database's **SQL Editor** in the Neon/Vercel dashboard and run:

   ```sql
   CREATE TABLE IF NOT EXISTS package_requests (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     phone TEXT NOT NULL,
     tier_name TEXT NOT NULL,
     addon_names JSONB NOT NULL DEFAULT '[]',
     total INTEGER NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now()
   );
   ```

### 2. Set the two auth env vars

Project → **Settings** → **Environment Variables**:

- `ADMIN_PASSWORD` — whatever password you want to log into `/admin` with.
- `SESSION_SECRET` — any long random string, e.g. `openssl rand -hex 32`.
  Signs the session cookie; changing it later logs everyone out.

Add both to all environments you use (Production, and Preview/Development if
you want `/admin` to work on preview deploys and `npm run dev` too — for
local dev, `vercel env pull .env.local` after step 1 pulls `DATABASE_URL`
down as well).

### 3. Deploy

Pushing this branch and deploying is what makes `/admin` live. After that:
visit `/admin`, get redirected to `/admin/login`, log in with
`ADMIN_PASSWORD`, and the table will show requests as they come in — newest
first, capped at the most recent 500.

## Notes / things to watch

- The request form validates an Indian mobile number specifically
  (`lib/validation.js` — 10 digits, optional +91/91/0 prefix), matching this
  site's ₹-priced, India-focused audience. If you ever need international
  numbers, that regex is the one place to loosen.
- The admin session cookie lasts 30 days from login; there's no "remember
  me" toggle or shorter option — log out via the button in `/admin` if you're
  on a shared machine.
- Nobody but you can reach `/admin` (proxy + per-page session check), but
  the request-submission endpoint (`/api/package-requests`) is intentionally
  public and unauthenticated — that's the visitor-facing form. There's no
  rate limiting on it; fine for this site's traffic level today, but worth
  revisiting if it ever gets abused.

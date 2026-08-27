# Live Google reviews on the site (Places API)

Pulls your Google Business Profile's real rating + review text directly onto
the site — `components/GbpSection.js` (shown on the homepage, `/contact`, and
the new Reviews section on `/work`) — instead of only linking out to it.
Nothing is fabricated: this fetches whatever Google actually returns for
your listing.

## What's already built

- `lib/gbpReviews.js` — `getGbpReviews()`, calling the Places API (New)
  Place Details endpoint server-side with `GOOGLE_PLACES_API_KEY` and
  `SOCIAL.gbpPlaceId` (`lib/data.js`). Reads the env var lazily and returns
  `null` on any failure — a missing key, missing Place ID, or a failed
  request all just fall back to `GbpSection`'s existing plain link-out card,
  nothing crashes.
- `components/GbpSection.js` — now an async Server Component. Renders the
  live star rating, review count, and each review's author/rating/text/date
  when `getGbpReviews()` returns data; otherwise unchanged from before.

**Nothing above is live until the two steps below are done** — until then
`GOOGLE_PLACES_API_KEY` and `gbpPlaceId` are both unset, so every page keeps
showing the plain "Find us on Google" card exactly as it did already.

## One-time setup needed (I don't have access to do this part)

### 1. Get a Places API key

1. [Google Cloud Console](https://console.cloud.google.com) → create or
   pick a project.
2. **APIs & Services → Library** → enable **Places API (New)**.
3. **Billing** must be enabled on the project for the Places API to work at
   all — Google gives a recurring free monthly credit, but the card-on-file
   step itself isn't optional. This is something you do yourself; I don't
   handle billing/payment setup.
4. **APIs & Services → Credentials → Create credentials → API key.** Then
   click into the key and restrict it:
   - **API restrictions** → restrict to **Places API (New)** only.
   - Leave it unrestricted on *application* (HTTP referrer / IP) — this key
     is only ever called server-side from this app, never sent to the
     browser, so referrer restrictions don't apply and would just break it.

### 2. Set the env var, and find your Place ID

Add to the project's env vars (same place as `DATABASE_URL` /
`ADMIN_PASSWORD` — see `docs/admin-panel-setup.md`; for local dev, your
`.env`):

- `GOOGLE_PLACES_API_KEY` — the key from step 1.

Once that's set, tell me and I'll look up your Place ID via the same API
(a Text Search for "Harshit Creates" + Lucknow) and drop it into
`SOCIAL.gbpPlaceId` in `lib/data.js` myself — it isn't secret, so it lives
in code, not an env var. If you'd rather find it yourself first: Google's
[Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id)
does the same lookup in a browser using your own key.

### 3. Deploy

Same as any other env var change — add it in all environments you want
this live in (Production, and Preview/Development if you want it in
`npm run dev` too), then redeploy.

## Notes / things to watch

- Google's API returns **at most 5 reviews**, and picks which ones
  ("most relevant") — there's no way to choose or reorder them from this
  side.
- This is a snapshot, not a live query on every visit — the response is
  cached for 1 hour (`next: { revalidate: 60*60 }` in `lib/gbpReviews.js`)
  rather than refetched on every page load. A brand-new review can take up
  to an hour to show up on the site. Google's terms cap caching at 30 days
  if you'd rather trade freshness for fewer API calls.
- If the key or Place ID is ever wrong, revoked, or the API call fails for
  any reason, `getGbpReviews()` just returns `null` and the page falls back
  to the plain link-out card silently — no broken UI, no error shown to
  visitors.

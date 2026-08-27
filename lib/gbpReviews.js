import { SOCIAL } from "@/lib/data";

const FIELD_MASK = "rating,userRatingCount,reviews.text,reviews.rating,reviews.authorAttribution,reviews.relativePublishTimeDescription";

/**
 * Fetches this business's live rating + reviews from the Places API (New)
 * Place Details endpoint. Returns null whenever the fetch can't happen or
 * doesn't return anything useful — GOOGLE_PLACES_API_KEY isn't set yet,
 * SOCIAL.gbpPlaceId hasn't been filled in, the request fails, or Google
 * simply has no reviews to return — so GbpSection can fall back to its
 * plain link-out card without a special-case check for each of those.
 *
 * Google's API caps this at 5 reviews and picks which ones ("most
 * relevant"), not something a site owner can curate — see
 * docs/gbp-reviews-setup.md for the full setup this depends on and that
 * constraint's source.
 */
export async function getGbpReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = SOCIAL.gbpPlaceId;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      // This is a snapshot, not a live query on every page load — Next
      // reuses this response for up to an hour before refetching. Google's
      // Places API ToS caps caching at 30 days; an hour keeps new reviews
      // showing up promptly without refetching on every request.
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    // Google's `reviews` array only includes reviews that have written
    // text — a bare star rating with no text (confirmed: this listing's
    // one review) contributes to `rating`/`userRatingCount` but never
    // appears here. Still returning data when there's no review text lets
    // GbpSection show the real aggregate score now; the per-review list
    // just renders empty until a text review exists.
    const reviews = Array.isArray(data.reviews) ? data.reviews : [];
    if (data.rating == null && data.userRatingCount == null) return null;

    return {
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      reviews: reviews.map((r) => ({
        text: r.text?.text ?? "",
        rating: r.rating ?? null,
        authorName: r.authorAttribution?.displayName ?? "A Google user",
        authorPhoto: r.authorAttribution?.photoUri ?? null,
        relativeTime: r.relativePublishTimeDescription ?? "",
      })),
    };
  } catch {
    return null;
  }
}

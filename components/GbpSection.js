import { colors } from "@/lib/colors";
import { SOCIAL } from "@/lib/data";
import { getGbpReviews } from "@/lib/gbpReviews";
import ReviewAvatar from "@/components/ReviewAvatar";

// Cycled by index for each card/avatar — same palette used elsewhere
// (accent/teal/accentDeep), just enough variety that a long belt of cards
// doesn't read as one flat block of color.
const AVATAR_COLORS = [colors.accent, colors.teal, colors.accentDeep];

function Stars({ rating }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: colors.teal }} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1z" />
        </svg>
      ))}
    </span>
  );
}

// Small multi-color "G" mark — attributes review content to Google, which
// Google's API terms expect, without pulling in a logo asset/library for
// one icon.
function GoogleMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h11.8c-.5 2.7-2 5-4.3 6.6v5.5h7C42.5 37.2 45.1 31.4 45.1 24.5z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7-5.5c-2 1.3-4.5 2.1-7.5 2.1-5.8 0-10.7-3.9-12.4-9.1H4.3v5.7C7.9 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.6 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.3C2.8 17 2 20.4 2 24s.8 7 2.3 9.9z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.2-6.2C34.9 4.3 29.9 2 24 2 15.4 2 7.9 6.9 4.3 14.1l7.3 5.7c1.7-5.2 6.6-9.1 12.4-9.1z" />
    </svg>
  );
}

function ReviewCard({ review, colorIndex }) {
  return (
    <div className="review-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Stars rating={review.rating} />
        <GoogleMark />
      </div>
      <p className="review-card-text">{review.text}</p>
      <div className="review-card-footer">
        <ReviewAvatar
          photoUrl={review.authorPhoto}
          name={review.authorName}
          color={AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {review.authorName}
          </div>
          {review.relativeTime && <div style={{ fontSize: 12, color: colors.textFaintest }}>{review.relativeTime}</div>}
        </div>
      </div>
    </div>
  );
}

/**
 * Real Google reviews, presented as a self-scrolling belt of cards — no
 * NAP block, no map embed. Both were dropped deliberately: the whole point
 * of this section is the review content itself, and anyone who wants the
 * business/location detail can already get it from the "See all reviews"
 * link straight through to the actual profile.
 *
 * Renders nothing but a single plain link when there's no review text to
 * show — `getGbpReviews()` resolves to null/empty whenever
 * GOOGLE_PLACES_API_KEY or SOCIAL.gbpPlaceId isn't set, the request fails,
 * or Google has no *written* reviews for this listing yet (a bare star
 * rating with no text never appears in its `reviews` array at all — see
 * lib/gbpReviews.js). No fabricated placeholder content fills that gap.
 */
export default async function GbpSection() {
  const reviewData = await getGbpReviews();
  const reviews = reviewData?.reviews ?? [];

  if (!reviews.length) {
    return SOCIAL.gbpUrl ? (
      <a href={SOCIAL.gbpUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: "inline-block" }}>
        Find us on Google / leave a review →
      </a>
    ) : (
      <p style={{ fontSize: 13, color: colors.textFaintest, margin: 0, fontStyle: "italic" }}>
        Google Business Profile — set up in progress, link goes live here once it&apos;s verified.
      </p>
    );
  }

  // One card per real review — no padding/repeats to hit some minimum
  // count. The only duplication is the standard marquee trick (render the
  // set twice, animate translateX 0 → -50%) so the loop has no visible
  // seam, and that only kicks in once there's more than one review to
  // loop through; a single review just sits still.
  const track = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

  return (
    <div>
      {reviewData.rating != null && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Stars rating={reviewData.rating} />
          <span style={{ fontSize: 14, fontWeight: 700 }}>{reviewData.rating.toFixed(1)}</span>
          <span style={{ fontSize: 13, color: colors.textFaint }}>
            on Google ({reviewData.userRatingCount} review{reviewData.userRatingCount === 1 ? "" : "s"})
          </span>
        </div>
      )}

      <div className={reviews.length > 1 ? "review-marquee" : undefined}>
        <div className={reviews.length > 1 ? "review-marquee-track" : "review-marquee-static"}>
          {track.map((r, i) => (
            <ReviewCard key={i} review={r} colorIndex={i} />
          ))}
        </div>
      </div>

      {SOCIAL.gbpUrl && (
        <a href={SOCIAL.gbpUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: "inline-block", marginTop: 24 }}>
          See all reviews on Google →
        </a>
      )}
    </div>
  );
}

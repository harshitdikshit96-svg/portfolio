import { PACKAGE_TIERS } from "@/lib/packages";
import CalendlyLink from "@/components/CalendlyLink";
import HeroSlider from "@/components/HeroSlider";

// Icons — inline strokes/fills, no icon library, matching the pattern
// already used across UspBanner/HeroCarousel's process-step icons.
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalendarCheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18m-9 5 2 2 3-3" />
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m5 12 5 5L20 7" />
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#44D4E2" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

/**
 * The homepage hero. A SERVER component: both slides are rendered here, on
 * the server, and handed to HeroSlider (the small client component that
 * only switches between them). That keeps all of this markup — copy,
 * icons, the mock browser and search cards — out of the client JavaScript
 * bundle. Before the split, the whole carousel was one "use client" file
 * and every byte of it shipped as JS that had to download before the
 * page's first paint counted as complete on a throttled phone.
 *
 * Slide 0 is what renders first, with or without JavaScript; its eyebrow
 * line is the page's one semantic <h1>. Slide 1 has no <h1> at all.
 */
export default function HeroCarousel() {
  const slides = [
    <>
      <div className="hero-anim">
        {/* The <h1> is the small eyebrow line, not the big headline.
            The headline is a hook with no search term in it; the
            eyebrow names what the page is actually about, which is
            what the one <h1> should tell a search engine. Styling is
            class-based, so swapping the tags changes nothing visually. */}
        <h1 className="hero-eyebrow">Freelance website developer in Lucknow</h1>
        <p className="hero-heading">Your customers are searching. Your website isn&apos;t showing up.</p>
        <p className="hero-lede">
          I build fast, bookable websites for dentists, clinics, salons and local service businesses — with
          the local SEO that gets you found on Google. We&apos;ll agree on a direction on a 30-minute call,
          then you&apos;ll see a working draft before you pay anything.
        </p>
        <div className="hero-cta-row">
          <CalendlyLink className="btn-primary hero-btn">
            Book a free 30-min call
            <span className="hero-btn-arrow"><ArrowRightIcon /></span>
          </CalendlyLink>
        </div>
        <div className="hero-chips">
          <span className="tag tag-outline">Free first draft in ~3 hrs</span>
          <span className="tag tag-outline">Local SEO included</span>
          <span className="tag tag-outline">Online booking built in</span>
          <span className="tag tag-outline">Remote-friendly</span>
        </div>
        <p className="hero-reassure">
          <ShieldCheckIcon />
          You pay nothing until you&apos;ve seen the real draft of your site.
        </p>
      </div>

      <div className="hero-graphic">
        <div className="hero-blob" style={{ left: -32, top: 40, width: 224, height: 224 }} />
        <div className="hero-blob" style={{ right: -24, bottom: 32, width: 192, height: 192, opacity: 0.7 }} />

        <div className="hero-card hero-search-card">
          <p className="hero-kicker">Google · near me</p>
          <p className="hero-search-name">Bright Smile Dental</p>
          <div className="hero-search-rating">
            <span className="hero-search-score">4.9</span>
            <span className="hero-stars">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </span>
            <span className="hero-search-count">(182)</span>
          </div>
          <p className="hero-search-open">
            <MapPinIcon />
            Open now · 0.8 km away
          </p>
        </div>

        <div className="hero-card hero-site-card">
          <div className="hero-site-bar">
            <span className="hero-site-dot" /><span className="hero-site-dot" /><span className="hero-site-dot" />
            <span className="hero-site-url">brightsmiledental.in</span>
          </div>
          <div className="hero-site-body">
            <div className="hero-site-row">
              <span className="hero-site-brand">Bright Smile</span>
              <span className="hero-site-navlines">
                <span className="hero-line" style={{ width: 32, height: 6 }} />
                <span className="hero-line" style={{ width: 32, height: 6 }} />
              </span>
            </div>
            <div className="hero-site-headline">
              <div className="hero-headline-block" style={{ width: "80%" }} />
              <div className="hero-headline-block" style={{ width: "60%", opacity: 0.45 }} />
            </div>
            <div className="hero-site-lines">
              <div className="hero-line" />
              <div className="hero-line" style={{ width: "83%" }} />
            </div>
            <div className="hero-mini-btn">
              <CalendarCheckIcon />
              Book appointment
            </div>
            <div className="hero-tiles">
              <div className="hero-tile">Implants</div>
              <div className="hero-tile">Whitening</div>
              <div className="hero-tile">Braces</div>
            </div>
          </div>
        </div>

        <div className="hero-card hero-pill hero-float">
          <p className="hero-pill-label">Draft ready</p>
          <p className="hero-pill-value">2h 47m</p>
        </div>
      </div>
    </>,
    <>
      <div className="hero-anim">
        <p className="hero-eyebrow">
          24-hour delivery · Static sites from ₹{PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")}*
        </p>
        {/* Styled identically to the real <h1> on slide 0, but kept as
            a <p> — a page should carry exactly one <h1>. */}
        <p className="hero-heading">Everyone else quotes a week. Yours is live in 24 hours.</p>
        <p className="hero-lede">
          Lucknow agencies start at ₹15,000 for a basic business site and take one to three weeks. Here a
          1–5 page static site is ₹{PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")} and a full
          CMS-driven business site you can edit yourself is ₹
          {PACKAGE_TIERS[1].basePriceFrom.toLocaleString("en-IN")} — one 30-minute call, a free working
          draft in ~3 hours, live within 24 hours of your content arriving. Same process and pricing
          wherever you&apos;re based.
        </p>
        <div className="hero-cta-row">
          <a className="btn-primary hero-btn" href="#packages">
            See packages
            <span className="hero-btn-arrow"><ArrowRightIcon /></span>
          </a>
        </div>
        <div className="hero-chips">
          <span className="tag tag-outline">
            Static site from ₹{PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")}
          </span>
          <span className="tag tag-outline">
            Business site from ₹{PACKAGE_TIERS[1].basePriceFrom.toLocaleString("en-IN")}
          </span>
          <span className="tag tag-outline">Live in 24 hrs</span>
          <span className="tag tag-outline">No advance payment</span>
        </div>
        <p className="hero-reassure">
          <ShieldCheckIcon />
          Fixed price agreed upfront — no hourly billing, no surprise add-ons.
        </p>
        <p className="hero-price-note">
          * Reference prices. The final number depends on the scope of your project and is agreed
          together on a free call before anything starts.
        </p>
      </div>

      <div className="hero-graphic">
        <div className="hero-blob" style={{ right: -32, top: 24, width: 224, height: 224 }} />
        <div className="hero-blob" style={{ left: -24, bottom: 16, width: 176, height: 176, opacity: 0.7 }} />

        <div className="hero-card hero-compare-card">
          <p className="hero-pill-label">Time to a live website</p>
          <div className="hero-compare-row">
            <div className="hero-row-top"><span>Typical agency / freelancer</span><strong>1–3 weeks</strong></div>
            <div className="hero-meter"><span style={{ width: "100%", background: "color-mix(in srgb, var(--c-line) 30%, transparent)" }} /></div>
          </div>
          <div className="hero-compare-row">
            <div className="hero-row-top"><strong>Harshit Creates</strong><strong className="hero-row-highlight">24 hours</strong></div>
            <div className="hero-meter"><span style={{ width: "14%" }} /></div>
          </div>
          <hr className="hero-hr" />
          <div className="hero-checks">
            <span className="hero-check"><CheckIcon />Free first draft in ~3 hrs</span>
            <span className="hero-check"><CheckIcon />No payment before you see it</span>
            <span className="hero-check"><CheckIcon />Local SEO set up</span>
            <span className="hero-check"><CheckIcon />Booking built in</span>
          </div>
        </div>

        <div className="hero-card hero-price-card">
          <p className="hero-pill-label">Complete site from</p>
          <p className="hero-price-value">
            ₹{PACKAGE_TIERS[0].basePriceFrom.toLocaleString("en-IN")}
            <span className="hero-price-star" aria-hidden="true">*</span>
          </p>
        </div>

        <div className="hero-card hero-pill hero-pill-top hero-float">
          <p className="hero-pill-top-label">
            <ClockIcon />
            Live in 24 hrs
          </p>
        </div>
      </div>
    </>,
  ];
  return <HeroSlider slides={slides} />;
}

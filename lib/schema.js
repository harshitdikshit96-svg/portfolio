import {
  SITE_URL,
  SOCIAL,
  SKILL_GROUPS,
  SERVICES,
  ROLE_TAGLINE,
  CALL_NUMBER,
} from "@/lib/data";

/**
 * Every JSON-LD builder on the site lives here so the graph has one shape
 * and one set of node identities. Render whatever these return through
 * <JsonLd> (components/JsonLd.js) — never with a hand-rolled <script> tag,
 * because that path skips the </script> escaping JsonLd does.
 *
 * ── Two rules this file exists to enforce ────────────────────────────────
 *
 * 1. NO PRICES, ANYWHERE IN THE GRAPH.
 *    The site deliberately shows no prices outside the homepage hero, so
 *    asserting one in markup would be a figure only a crawler can see —
 *    which is exactly what Google's structured-data policy prohibits
 *    ("don't mark up content that is not visible to users"). That applies
 *    to `offers`/`priceSpecification` AND to a numeric `priceRange` like
 *    "₹4,000–₹20,000": a hidden number is a hidden number regardless of
 *    which property carries it.
 *
 *    `priceRange` is still set, but in its QUALITATIVE form ("₹₹"). That is
 *    the form Google documents for LocalBusiness, it asserts no figure the
 *    page contradicts, and it still gives the band signal that makes a
 *    local result look complete. See PRICE_RANGE below.
 *
 * 2. ONE NODE PER ENTITY, REFERENCED BY @id.
 *    Before this file, the Person and the ProfessionalService were emitted
 *    as unlinked islands in layout.js, and each local landing page minted a
 *    SECOND, thinner ProfessionalService inline as its `provider`. To a
 *    crawler that reads as two different businesses with the same name.
 *    Everything now points at PERSON_ID / BUSINESS_ID instead of restating
 *    the entity.
 */

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#harshit`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Qualitative band, not a figure. See rule 1 above before changing this to
// anything containing a digit.
const PRICE_RANGE = "₹₹";

// Lucknow city centroid. Used for the SERVICE AREA, not for a street
// address — the Google Business Profile behind SOCIAL.gbpUrl is registered
// as a service-area business with no public address (lib/data.js documents
// why at length). Google's guidance for that case is to describe the area
// served and omit `address` rather than publish an approximate one, so this
// file never emits a PostalAddress. Don't add one unless a real, verifiable
// office address exists on the GBP listing first.
const LUCKNOW_GEO = { latitude: 26.8467, longitude: 80.9462 };
const SERVICE_RADIUS_M = 40000;

const sameAs = [SOCIAL.linkedin, SOCIAL.github, SOCIAL.gbpUrl].filter(Boolean);

const AREA_SERVED = [
  { "@type": "City", name: "Lucknow", containedInPlace: { "@type": "State", name: "Uttar Pradesh" } },
  { "@type": "State", name: "Uttar Pradesh" },
  { "@type": "Country", name: "India" },
];

/**
 * ProfessionalService — the business node. Emitted once, in the root
 * layout, so every page inherits it; local and national pages reference it
 * by @id rather than repeating it.
 */
export function professionalServiceSchema({ description, image, logo } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "Harshit Creates — Harshit Dixit",
    alternateName: "Harshit Creates",
    description,
    url: SITE_URL,
    image,
    logo,
    email: `mailto:${SOCIAL.email}`,
    ...(CALL_NUMBER ? { telephone: CALL_NUMBER } : {}),
    priceRange: PRICE_RANGE,
    currenciesAccepted: "INR",
    sameAs,
    founder: { "@id": PERSON_ID },
    // Both are set on purpose and they are not redundant: `areaServed` is
    // the human-readable list a rich result can show, `serviceArea` is the
    // machine-readable catchment a service-area business is supposed to
    // publish in place of a street address.
    areaServed: AREA_SERVED,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", ...LUCKNOW_GEO },
      geoRadius: SERVICE_RADIUS_M,
    },
    knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
    // Services are listed as plain Service nodes, NOT wrapped in Offer.
    // An Offer is a commercial proposition and invites a price; leaving the
    // wrapper off removes the temptation and the spam surface entirely,
    // while still telling a crawler what this business does.
    makesOffer: undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Service",
        name: service.title,
        description: service.desc,
        provider: { "@id": BUSINESS_ID },
        areaServed: AREA_SERVED,
      })),
    },
  };
}

/**
 * Person — the founder. Carries the credentials that qualify the business:
 * the engineering history and the stack.
 *
 * Acko and BigBasket are expressed through `alumniOf`, whose range includes
 * Organization as well as EducationalOrganization. That is the only
 * in-spec way to say "previously worked at" — schema.org has no past-employer
 * property, and `worksFor` would assert a CURRENT employment relationship
 * with companies he no longer works for, which would be a false claim about
 * those companies as much as about him.
 */
export function personSchema({ description, image } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Harshit Dixit",
    url: SITE_URL,
    // Deliberately fuller than ROLE_TAGLINE, which the <title> and OG image
    // use — those have display-length limits this field does not.
    // docs/seo-keywords.md tracks "web solutions architect" and "technical
    // consultant" as placed here specifically.
    jobTitle: "Freelance Web Developer, Technical Consultant & Web Solutions Architect",
    description,
    image,
    email: `mailto:${SOCIAL.email}`,
    sameAs: [SOCIAL.linkedin, SOCIAL.github],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "IIIT Lucknow" },
      { "@type": "Organization", name: "Acko" },
      { "@type": "Organization", name: "BigBasket" },
    ],
    knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
    hasOccupation: {
      "@type": "Occupation",
      name: ROLE_TAGLINE,
      occupationLocation: { "@type": "City", name: "Lucknow" },
      skills: SKILL_GROUPS.flatMap((group) => group.items).join(", "),
    },
    worksFor: { "@id": BUSINESS_ID },
  };
}

/**
 * Service — for a landing page that sells one thing. `provider` is an @id
 * reference, so it resolves to the single business node rather than
 * creating a second one.
 */
export function serviceSchema({ name, serviceType, description, path, areaServed = AREA_SERVED }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed,
  };
}

/**
 * FAQPage — built from the SAME array the component renders, which is the
 * only thing that keeps schema and visible copy in step. Google requires
 * the marked-up Q&A to appear on the page; passing a separate, hand-written
 * list is how sites earn a manual action.
 *
 * Answers are stripped of any markup and collapsed, because the spec wants
 * answer text and a stray tag in a string would land in the graph verbatim.
 */
export function faqPageSchema(items) {
  const mainEntity = (items || [])
    .filter((item) => item && item.question && item.answer)
    .map((item) => ({
      "@type": "Question",
      name: String(item.question).trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: String(item.answer).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
      },
    }));

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

/**
 * WebSite — enables the sitelinks search box if a search route is ever
 * added, and gives the graph a node for the site itself.
 */
export function webSiteSchema({ description } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Harshit Creates",
    description,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-IN",
  };
}

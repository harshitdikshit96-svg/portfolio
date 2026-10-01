import { LandingRoute, landingMetadata } from "@/components/ServiceLanding";

// All copy, offers and FAQs for this page live in its entry in
// lib/landings.js; components/ServiceLanding.js renders every landing page.
const SLUG = "software-development-lucknow";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <LandingRoute slug={SLUG} />;
}

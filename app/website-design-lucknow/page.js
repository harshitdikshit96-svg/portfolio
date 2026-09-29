import LocalServiceLanding from "@/components/LocalServiceLanding";
import { LOCAL_LANDINGS } from "@/lib/data";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

// Thin route wrapper — all copy, pricing and FAQ content for this page
// lives in the matching LOCAL_LANDINGS entry in lib/data.js, so the four
// local landing pages can't drift apart in structure.
const landing = LOCAL_LANDINGS.find((l) => l.slug === "website-design-lucknow");

export const metadata = pageMetadata({
  title: landing.metaTitle,
  description: landing.metaDescription,
  path: `/${landing.slug}`,
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: landing.navLabel, path: `/${landing.slug}` },
]);

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <LocalServiceLanding landing={landing} />
    </>
  );
}

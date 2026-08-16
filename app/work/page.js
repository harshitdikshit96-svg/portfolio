import Work from "@/components/sections/Work";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website Projects & Case Studies",
  description:
    "Real, live websites built for real businesses, plus concept builds that show what we can do for yours — see the work, not just a portfolio pitch.",
  path: "/work",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Work />
    </>
  );
}

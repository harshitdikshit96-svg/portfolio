import About from "@/components/sections/About";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Harshit Dixit — frontend-leaning software engineer from IIIT Lucknow with five-plus years building consumer web products at Acko and Bigbasket, now working as a freelance website developer.",
  path: "/about",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <About />
    </>
  );
}

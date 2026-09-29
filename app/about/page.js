import About from "@/components/sections/About";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

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
      <JsonLd schema={breadcrumbs} />
      <About />
    </>
  );
}

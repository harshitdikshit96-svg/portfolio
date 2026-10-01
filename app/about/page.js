import About from "@/components/sections/About";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "About Harshit Dixit",
  description:
    "Harshit Dixit — full-stack engineer from IIIT Lucknow, five years at Bigbasket and Acko, now a freelance web and software developer based in Lucknow.",
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

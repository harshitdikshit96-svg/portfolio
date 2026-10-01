import Contact from "@/components/sections/Contact";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Contact a Website Developer",
  description:
    "Book a free 30-minute call or send a message — a mobile number is enough. A free working draft in about 3 hours, and a fixed quote before any work starts.",
  path: "/contact",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <Contact />
    </>
  );
}

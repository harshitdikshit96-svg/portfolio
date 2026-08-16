import Contact from "@/components/sections/Contact";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact a Website Developer",
  description:
    "Book a free 30-minute call or send a message — websites start at ₹4,000, live in as fast as 24 hours once content is ready.",
  path: "/contact",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Contact />
    </>
  );
}

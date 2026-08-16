import { SITE_URL } from "@/lib/data";

const siteUrl = SITE_URL;

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

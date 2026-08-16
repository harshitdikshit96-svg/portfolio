import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Deliberately WebP-only (Next.js default), not AVIF: AVIF encoding of
  // photographic content is noticeably slower than WebP, and the hero photo
  // is this site's LCP element — not worth risking a slow first paint for a
  // marginal size win over WebP, which already has universal modern support.
  images: {
    remotePatterns: [
      // Auto-refreshed work-tile screenshots (see
      // app/api/refresh-screenshots + docs/live-screenshot-refresh.md) are
      // served straight from the project's Vercel Blob store instead of
      // /public, so next/image needs this host allow-listed.
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

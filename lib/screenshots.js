// Reads the auto-refreshed work-tile screenshot manifest that
// app/api/refresh-screenshots/route.js writes to Vercel Blob once a day
// (see vercel.json's cron entry + docs/live-screenshot-refresh.md for the
// full setup). Every consumer (Home, Work, the case-study page) calls
// `getScreenshotManifest()` once and merges it over the static `image`/
// `imageLg` fields in lib/data.js via `withScreenshot()` — so a project
// shows its live homepage screenshot once the pipeline has run for it at
// least once, and silently falls back to the static /public image the rest
// of the time (before the first run, if BLOB_MANIFEST_URL isn't set yet, or
// if that one fetch fails) rather than breaking the page.

const MANIFEST_URL = process.env.BLOB_MANIFEST_URL;

export async function getScreenshotManifest() {
  if (!MANIFEST_URL) return {};
  try {
    // Manifest is a small public JSON blob — cached at the CDN edge and
    // revalidated hourly, so this never blocks a page render on a slow
    // Blob read, and stays well under Blob's free-tier operation limits.
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

// Overlays a fresh screenshot URL onto a project object when the manifest
// has one, keeping every other field (including the static fallback image)
// untouched. Safe to call even when `manifest` is `{}`.
export function withScreenshot(project, manifest) {
  const entry = manifest?.[project.slug];
  if (!entry?.url) return project;
  return { ...project, image: entry.url, imageLg: entry.url };
}

export function withScreenshots(projects, manifest) {
  return projects.map((p) => withScreenshot(p, manifest));
}

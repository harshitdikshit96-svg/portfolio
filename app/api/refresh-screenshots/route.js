import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { LIVE_PROJECTS, TEMPLATE_PROJECTS } from "@/lib/data";

// Runs once a day (see vercel.json's cron entry) to re-screenshot every work
// project's live homepage and refresh the work-tile image without a manual
// re-screenshot after every client redesign. See
// docs/live-screenshot-refresh.md for the one-time setup this needs in the
// Vercel dashboard (Blob store + env vars) before it does anything.
//
// Deliberately NOT a live iframe embed of each site — see the punch-list
// writeup this replaces: several client sites can set X-Frame-Options/CSP
// that blocks framing outright, an iframe-per-tile is heavy on page load,
// and a live embed can show whatever transient state (cookie banner,
// mid-edit content) the site happens to be in when a visitor loads /work.
// A scheduled screenshot keeps the existing fast, static-image approach and
// just automates the refresh.

export const maxDuration = 120; // seconds — headroom for several sequential screenshots, well under Hobby's 300s cap
export const dynamic = "force-dynamic";

const VIEWPORT = { width: 1200, height: 720 };
const TILE_SIZE = { width: 600, height: 360 }; // matches the existing public/images/proj-*.webp tiles

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  // Fail closed: if the secret isn't configured yet, refuse rather than run
  // an unauthenticated screenshot job for anyone who finds the URL.
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = [...LIVE_PROJECTS, ...TEMPLATE_PROJECTS].filter((p) => p.url);
  if (projects.length === 0) {
    return NextResponse.json({ ok: true, results: [], note: "No projects with a live url to screenshot." });
  }

  const results = [];
  const manifest = {};
  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: VIEWPORT,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    for (const project of projects) {
      try {
        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);
        await page.goto(project.url, { waitUntil: "networkidle2", timeout: 25000 });
        const rawShot = await page.screenshot({ type: "png" });
        await page.close();

        const resized = await sharp(rawShot)
          .resize(TILE_SIZE.width, TILE_SIZE.height, { fit: "cover", position: "top" })
          .webp({ quality: 82 })
          .toBuffer();

        const blob = await put(`work-screenshots/${project.slug}.webp`, resized, {
          access: "public",
          addRandomSuffix: false,
          contentType: "image/webp",
          // A little under the daily refresh cadence, so a cache HIT never
          // serves a genuinely stale image for longer than one cycle.
          cacheControlMaxAge: 60 * 60 * 20,
        });

        manifest[project.slug] = { url: blob.url, updatedAt: new Date().toISOString() };
        results.push({ slug: project.slug, ok: true, url: blob.url });
      } catch (err) {
        results.push({ slug: project.slug, ok: false, error: String(err?.message || err) });
      }
    }

    await put("work-screenshots/manifest.json", JSON.stringify(manifest, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
      cacheControlMaxAge: 60 * 60,
    });

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err?.message || err), results }, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}

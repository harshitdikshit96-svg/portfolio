import { NextResponse } from "next/server";
import { savePackageRequest } from "@/lib/db";
import { validateName, validatePhone } from "@/lib/validation";
import { PACKAGE_TIERS, ADDONS } from "@/lib/data";

export const dynamic = "force-dynamic";

// Public, unauthenticated by design — this is the "Request this package"
// form every site visitor submits. Server-side validation re-runs the same
// checks the form already did client-side (never trust client input), and
// re-derives the package/add-on names and total from lib/data.js rather
// than trusting whatever the client sent for those, so a tampered request
// can't record a fake package or price.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const nameError = validateName(body.name);
  const phoneError = validatePhone(body.phone);
  if (nameError || phoneError) {
    return NextResponse.json({ error: nameError || phoneError }, { status: 400 });
  }

  const tier = PACKAGE_TIERS.find((t) => t.id === body.tierId);
  if (!tier) {
    return NextResponse.json({ error: "Unknown package." }, { status: 400 });
  }
  const addonIds = Array.isArray(body.addonIds) ? body.addonIds : [];
  const selectedAddons = ADDONS.filter((a) => addonIds.includes(a.id));
  const total = tier.basePriceFrom + selectedAddons.reduce((sum, a) => sum + a.price, 0);

  try {
    await savePackageRequest({
      name: body.name.trim(),
      phone: body.phone.trim(),
      tierName: tier.name,
      addonNames: selectedAddons.map((a) => a.name),
      total,
    });
  } catch (err) {
    console.error("Failed to save package request:", err);
    return NextResponse.json({ error: "Something went wrong — please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { saveContactRequest } from "@/lib/db";
import { validateName, validatePhone, validateEmailOptional, validateMessage } from "@/lib/validation";
import { SERVICES } from "@/lib/data";

export const dynamic = "force-dynamic";

// Public, unauthenticated by design — this backs the contact form every
// visitor sees.
//
// Why this route exists at all: the form used to build a `mailto:` link and
// redirect the browser to it. That meant a "lead" only actually reached us
// if the visitor had a mail client configured on that device AND then chose
// to press send in it — on a phone, from a Google Ads click, that is close
// to nobody. It also meant the `generate_lead` analytics event fired on the
// redirect rather than on a real submission, so the event was counting
// intent-to-open-mail-app, not enquiries. The Ads account showed the
// result: zero recorded leads against real spend. Submissions now land
// server-side here, and the client only fires `generate_lead` once this
// route has confirmed the row was written.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const error =
    validateName(body.name) ||
    validatePhone(body.phone) ||
    validateEmailOptional(body.email) ||
    validateMessage(body.message);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  // Re-derive the service label from lib/data.js rather than trusting the
  // client, same rule the package-requests route follows.
  const known = SERVICES.some((s) => s.title === body.service);
  const service = known ? body.service : "Something else";

  try {
    await saveContactRequest({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: (body.email ?? "").trim() || null,
      service,
      message: body.message.trim(),
      // Where on the site the form was submitted from, so enquiries from a
      // paid landing page can be told apart from organic ones later.
      source: typeof body.source === "string" ? body.source.slice(0, 120) : null,
    });
  } catch (err) {
    console.error("Failed to save contact request:", err);
    return NextResponse.json({ error: "Something went wrong — please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

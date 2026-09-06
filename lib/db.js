import { neon } from "@neondatabase/serverless";

// DATABASE_URL is injected automatically once a Postgres (Neon) database is
// linked to this project in the Vercel dashboard — see
// docs/admin-panel-setup.md for the one-time setup this needs before any of
// this actually works. Reading it lazily (inside the function below, not at
// module scope) means a route that never touches the DB still loads fine
// even before that setup is done.
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set — see docs/admin-panel-setup.md to link a Postgres database to this project."
    );
  }
  return neon(url);
}

export async function savePackageRequest({ name, phone, tierName, addonNames, total }) {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO package_requests (name, phone, tier_name, addon_names, total)
    VALUES (${name}, ${phone}, ${tierName}, ${JSON.stringify(addonNames)}::jsonb, ${total})
    RETURNING id, created_at
  `;
  return rows[0];
}

export async function getPackageRequests() {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, phone, tier_name, addon_names, total, created_at
    FROM package_requests
    ORDER BY created_at DESC
    LIMIT 500
  `;
  return rows;
}

// Contact-form submissions. Kept in its own table rather than folded into
// package_requests because the two capture genuinely different things: a
// package request is a priced configuration, a contact request is an
// open-ended enquiry with a service interest attached.
export async function saveContactRequest({ name, phone, email, service, message, source }) {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO contact_requests (name, phone, email, service, message, source)
    VALUES (${name}, ${phone}, ${email}, ${service}, ${message}, ${source})
    RETURNING id, created_at
  `;
  return rows[0];
}

export async function getContactRequests() {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, phone, email, service, message, source, created_at
    FROM contact_requests
    ORDER BY created_at DESC
    LIMIT 500
  `;
  return rows;
}

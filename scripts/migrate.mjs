/**
 * One-off schema migration runner.
 *
 * Run from the project root:   node scripts/migrate.mjs
 *
 * Reads DATABASE_URL out of .env directly (no dotenv dependency, and it
 * copes with the value being wrapped in single or double quotes), then
 * applies the statements below. Every statement is IF NOT EXISTS, so this
 * is safe to run repeatedly — it will not touch existing rows.
 */
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const match = env.match(/^\s*DATABASE_URL\s*=\s*(.+)$/m);
if (!match) {
  console.error("DATABASE_URL not found in .env");
  process.exit(1);
}
const url = match[1].trim().replace(/^['"]|['"]$/g, "");

const sql = neon(url);

// contact_requests backs the contact form (/contact). See
// docs/admin-panel-setup.md for why email is nullable and phone is not.
await sql`
  CREATE TABLE IF NOT EXISTS contact_requests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

const columns = await sql`
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_name = 'contact_requests'
  ORDER BY ordinal_position
`;

console.log("✓ contact_requests ready\n");
for (const c of columns) {
  console.log(`  ${c.column_name.padEnd(12)} ${c.data_type.padEnd(28)} nullable=${c.is_nullable}`);
}

const tables = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' ORDER BY table_name
`;
console.log(`\n  tables in public: ${tables.map((t) => t.table_name).join(", ")}`);

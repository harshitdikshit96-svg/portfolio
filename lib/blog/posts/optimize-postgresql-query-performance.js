import Link from "next/link";

export const meta = {
  slug: "optimize-postgresql-query-performance",
  title: "How to Optimize PostgreSQL Query Performance",
  metaTitle: "Optimize PostgreSQL Query Performance",
  description:
    "Find slow PostgreSQL queries with pg_stat_statements, read EXPLAIN ANALYZE output, choose the right index, and fix N+1 queries, OFFSET pagination and bloat.",
  keyword: "how to optimize postgresql query performance",
  keywords: ["postgresql query performance", "explain analyze postgres", "postgres index", "slow query postgresql"],
  datePublished: "2026-09-30",
  readingMinutes: 12,
  relatedLanding: "mvp-development-startups-india",
};

export default function Post() {
  return (
    <>
      <p>
        PostgreSQL is fast by default and forgiving for a long time — which is why performance problems tend to
        arrive all at once, when a table that was fine at 50,000 rows reaches 5 million. The good news is that the
        diagnosis is methodical: find the queries that actually cost the most, read their plans, and fix the
        specific thing the plan shows. Adding indexes at random is how databases end up slow <em>and</em> bloated.
      </p>

      <h2>Step 1: find the queries worth fixing</h2>
      <p>
        The slowest single query is often not the problem. A 5 ms query that runs 40,000 times a minute costs far
        more than a 2-second report that runs once an hour. The <code>pg_stat_statements</code> extension tracks
        every normalised query with its call count and total time — enable it first.
      </p>
      <pre>
        <code>{`-- postgresql.conf (most managed providers enable this for you)
shared_preload_libraries = 'pg_stat_statements'

-- then, once, in the database:
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- the queries costing the most in total
SELECT
  round(total_exec_time::numeric, 0)  AS total_ms,
  calls,
  round(mean_exec_time::numeric, 2)   AS mean_ms,
  rows,
  left(query, 120)                    AS query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;`}</code>
      </pre>
      <p>
        Work down that list from the top. It&apos;s also worth setting <code>log_min_duration_statement</code> (for
        example to <code>500</code> ms) so individual slow executions are logged with their parameters, which you
        need to reproduce them.
      </p>

      <h2>Step 2: read the plan with EXPLAIN ANALYZE</h2>
      <p>
        <code>EXPLAIN</code> shows the plan PostgreSQL <em>intends</em> to use. <code>EXPLAIN ANALYZE</code>{" "}
        actually runs the query and reports what happened — so be careful with it on <code>UPDATE</code> or{" "}
        <code>DELETE</code> (wrap those in a transaction and roll back). Add <code>BUFFERS</code> to see how much
        data was read.
      </p>
      <pre>
        <code>{`EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total, created_at
FROM orders
WHERE customer_id = 4821
ORDER BY created_at DESC
LIMIT 20;`}</code>
      </pre>
      <pre>
        <code>{`Limit  (cost=18234.51..18234.56 rows=20 width=24) (actual time=212.4..212.4 rows=20 loops=1)
  ->  Sort  (cost=18234.51..18240.12 rows=2244 width=24) (actual time=212.4..212.4 rows=20 loops=1)
        Sort Key: created_at DESC
        Sort Method: top-N heapsort  Memory: 26kB
        ->  Seq Scan on orders  (cost=0.00..18174.80 rows=2244 width=24) (actual time=0.03..211.8 rows=2310 loops=1)
              Filter: (customer_id = 4821)
              Rows Removed by Filter: 998690
              Buffers: shared hit=5412 read=2150
Planning Time: 0.1 ms
Execution Time: 212.5 ms`}</code>
      </pre>
      <p>Read a plan from the most indented line outwards, and look for four things:</p>
      <ul>
        <li>
          <strong>Seq Scan on a large table with a selective filter.</strong> Here, a million rows read to return
          2,310 — “Rows Removed by Filter: 998690” is the giveaway. That&apos;s a missing index.
        </li>
        <li>
          <strong>Estimated rows far from actual rows.</strong> If the planner expected 10 rows and got 100,000, it
          chose its plan on bad information. Run <code>ANALYZE</code> on the table, and for skewed columns consider
          raising the statistics target.
        </li>
        <li>
          <strong>The node where the time jumps.</strong> <code>actual time</code> is cumulative; find the node whose
          time is much larger than its children&apos;s — that&apos;s where the work happens.
        </li>
        <li>
          <strong>Sorts and hashes spilling to disk.</strong> “Sort Method: external merge Disk” means{" "}
          <code>work_mem</code> was too small for that operation, or the query sorts far more rows than it needs.
        </li>
      </ul>

      <h2>Step 3: choose the right index</h2>
      <p>For the query above, one composite index removes both the scan and the sort:</p>
      <pre>
        <code>{`CREATE INDEX CONCURRENTLY orders_customer_created_idx
  ON orders (customer_id, created_at DESC);`}</code>
      </pre>
      <p>
        PostgreSQL can now jump straight to that customer&apos;s rows, already in order, and stop after 20. The plan
        becomes an <code>Index Scan</code> under the <code>Limit</code> and the time drops from hundreds of
        milliseconds to well under one. Always use <code>CONCURRENTLY</code> on a live table; a plain{" "}
        <code>CREATE INDEX</code> blocks writes to the table until it finishes.
      </p>

      <h3>Column order in composite indexes</h3>
      <p>
        A B-tree index on <code>(a, b)</code> helps queries filtering on <code>a</code>, or on <code>a</code> and{" "}
        <code>b</code> — but not efficiently on <code>b</code> alone. Put columns compared with equality first, then
        the column used for ranges or sorting. <code>(customer_id, created_at)</code> serves “this customer&apos;s
        recent orders”; <code>(created_at, customer_id)</code> mostly doesn&apos;t.
      </p>

      <h3>Other index types worth knowing</h3>
      <ul>
        <li>
          <strong>Partial indexes</strong> index only the rows you query: <code>WHERE status = &apos;pending&apos;</code>{" "}
          on a table where almost everything is completed gives a tiny, fast index.
        </li>
        <li>
          <strong>Covering indexes</strong> with <code>INCLUDE (total)</code> let a query be answered from the index
          alone — an Index Only Scan — without visiting the table.
        </li>
        <li>
          <strong>Expression indexes</strong> for queries that filter on a function:{" "}
          <code>ON users (lower(email))</code> for case-insensitive lookups.
        </li>
        <li>
          <strong>GIN indexes</strong> for JSONB containment, arrays and full-text search.
        </li>
      </ul>

      <h3>Don&apos;t over-index</h3>
      <p>
        Every index slows down every insert and update to that table and takes space. Check for indexes that are
        never used and drop them:
      </p>
      <pre>
        <code>{`SELECT relname AS table, indexrelname AS index, idx_scan,
       pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;`}</code>
      </pre>
      <p>
        (Statistics reset when the server restarts or stats are reset, and unique indexes enforce constraints even
        when never scanned — check before dropping.)
      </p>

      <h2>Step 4: fix the query patterns that indexes can&apos;t</h2>

      <h3>N+1 queries from the ORM</h3>
      <p>
        An ORM loop that loads 50 orders and then lazily fetches each order&apos;s customer runs 51 queries. Each is
        fast; together they&apos;re slow, and they barely show up as “slow queries” — they show up as a huge{" "}
        <code>calls</code> count in <code>pg_stat_statements</code>. Fix it with a join or the ORM&apos;s eager
        loading (<code>include</code> in Prisma, <code>with</code> in Drizzle&apos;s relational queries).
      </p>

      <h3>OFFSET pagination on deep pages</h3>
      <p>
        <code>LIMIT 20 OFFSET 100000</code> still reads and discards 100,000 rows. Use keyset (cursor) pagination
        instead — remember the last row you showed and continue from it:
      </p>
      <pre>
        <code>{`-- page after the row (created_at = '2026-09-01 10:22', id = 88123)
SELECT id, total, created_at
FROM orders
WHERE (created_at, id) < ('2026-09-01 10:22', 88123)
ORDER BY created_at DESC, id DESC
LIMIT 20;`}</code>
      </pre>
      <p>
        With an index on <code>(created_at DESC, id DESC)</code>, every page is as fast as the first.
      </p>

      <h3>Selecting more than you need</h3>
      <p>
        <code>SELECT *</code> on a table with large text or JSONB columns drags all of that across the network and
        prevents index-only scans. Select the columns the code uses.
      </p>

      <h3>Exact counts on big tables</h3>
      <p>
        <code>SELECT count(*)</code> on a large table has to scan it. If a UI only needs “about 1.2 million
        results”, the planner&apos;s estimate from <code>pg_class.reltuples</code> is instant; if it needs to know
        whether there are more pages, fetch <code>LIMIT n + 1</code> rows and check.
      </p>

      <h2>Step 5: keep the database healthy</h2>
      <ul>
        <li>
          <strong>Autovacuum.</strong> PostgreSQL&apos;s MVCC leaves dead row versions behind after updates and
          deletes; autovacuum cleans them up and keeps planner statistics fresh. On heavily updated tables, the
          defaults are often too lazy — tune per table rather than turning it off. Check{" "}
          <code>pg_stat_user_tables</code> for <code>n_dead_tup</code> and last-vacuum times.
        </li>
        <li>
          <strong>Connection pooling.</strong> Each PostgreSQL connection is a process with real memory overhead.
          Serverless functions that open a connection per invocation can exhaust <code>max_connections</code> under
          load. Put a pooler such as PgBouncer (or your provider&apos;s built-in pooling) in front.
        </li>
        <li>
          <strong>Memory settings.</strong> <code>shared_buffers</code> around a quarter of RAM is the usual starting
          point on a dedicated server, and <code>work_mem</code> is per sort or hash operation, per query — raise it
          carefully.
        </li>
      </ul>

      <h2>A checklist</h2>
      <ol>
        <li>Enable <code>pg_stat_statements</code>; rank queries by total time, not mean time.</li>
        <li>
          Run <code>EXPLAIN (ANALYZE, BUFFERS)</code> with realistic parameters on production-sized data.
        </li>
        <li>Look for big sequential scans, bad row estimates, disk sorts, and the node where time jumps.</li>
        <li>Add targeted composite, partial or covering indexes — <code>CONCURRENTLY</code>.</li>
        <li>Fix N+1 queries, deep OFFSET pagination, <code>SELECT *</code> and exact counts.</li>
        <li>Drop unused indexes; check autovacuum and connection pooling.</li>
        <li>Re-run the plan and <code>pg_stat_statements</code> to confirm the improvement.</li>
      </ol>
      <p>
        Most early-stage products never need more than this — a sound schema and a handful of well-chosen indexes
        go a very long way. If your database is becoming the bottleneck as you grow, it&apos;s one of the first
        things covered in an <Link href="/mvp-development-startups-india">architecture audit</Link>.
      </p>
    </>
  );
}

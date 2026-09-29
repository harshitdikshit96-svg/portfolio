/**
 * Renders one or more JSON-LD graphs into <script type="application/ld+json">.
 *
 * Server component by design — structured data has to be in the HTML the
 * crawler receives, not injected after hydration.
 *
 * Why this exists rather than inlining the script tag at each call site
 * (which is what the codebase did in six places before):
 *
 *   1. ESCAPING. `JSON.stringify` does not escape "<", so any string that
 *      ever contains "</script>" — an FAQ answer, a project tagline, a
 *      value that came from the database — would terminate the script
 *      element early and inject raw markup into the page. Escaping "<" as
 *      < is still valid JSON and closes that hole once, here, instead
 *      of relying on every future call site to remember.
 *   2. A null graph renders nothing, so builders are free to return null
 *      when they have no data (faqPageSchema does) without every caller
 *      needing a guard.
 *
 * Usage:
 *   <JsonLd schema={personSchema({ description })} />
 *   <JsonLd schema={[serviceSchema(...), faqPageSchema(items)]} />
 */
export default function JsonLd({ schema, id }) {
  const graphs = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);
  if (!graphs.length) return null;

  return graphs.map((graph, i) => (
    <script
      key={graph["@id"] || `${id || "jsonld"}-${i}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  ));
}

import Link from "next/link";

export const meta = {
  slug: "react-state-management-best-practices",
  title: "React State Management Best Practices (2026)",
  metaTitle: "React State Management Best Practices",
  description:
    "Most React state problems come from putting state in the wrong place. Sort it into server, URL, form, local and global state, and the library choice gets easy.",
  keyword: "react state management best practices",
  keywords: ["react state management", "zustand vs redux", "react context performance", "tanstack query server state"],
  datePublished: "2026-09-30",
  readingMinutes: 10,
  relatedLanding: "hire-full-stack-developer-india",
};

export default function Post() {
  return (
    <>
      <p>
        “Which state management library should we use?” is usually the wrong first question. Most React codebases
        that feel tangled don&apos;t have the wrong library — they have state in the wrong <em>place</em>: server data
        copied into a global store, URL state held in <code>useState</code>, values synced between components with{" "}
        <code>useEffect</code>. Once each piece of state lives where it belongs, the library question mostly answers
        itself, and there is usually much less global state than anyone expected.
      </p>

      <h2>Step 1: sort your state into five kinds</h2>
      <table>
        <thead>
          <tr>
            <th>Kind</th>
            <th>Examples</th>
            <th>Where it belongs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Server state</td>
            <td>Products, orders, the current user&apos;s profile</td>
            <td>Server Components, or a server-cache library such as TanStack Query</td>
          </tr>
          <tr>
            <td>URL state</td>
            <td>Filters, search query, sort order, page number, selected tab</td>
            <td>The URL — search params or the route</td>
          </tr>
          <tr>
            <td>Form state</td>
            <td>Field values, validation errors, submitting status</td>
            <td>The form — native inputs, a form library, or React 19 actions</td>
          </tr>
          <tr>
            <td>Local UI state</td>
            <td>Is this dropdown open, which accordion panel is expanded</td>
            <td>
              <code>useState</code> in the component that uses it
            </td>
          </tr>
          <tr>
            <td>Global client state</td>
            <td>Theme, a multi-step wizard, a cart before checkout, an editor&apos;s document</td>
            <td>Context, Zustand, Redux Toolkit or similar</td>
          </tr>
        </tbody>
      </table>
      <p>
        The rest of this guide is about each row, because the best practices are different for each.
      </p>

      <h2>Server state is a cache, not state</h2>
      <p>
        Data that lives in your database is owned by the server. What the client holds is a <em>copy</em>, and a
        copy has cache problems — when is it stale, when to refetch, what happens when two components ask for it at
        once, how to update it optimistically and roll back on failure. Putting it in Redux or Zustand means
        writing all of that by hand, and it&apos;s where a lot of global-store complexity comes from.
      </p>
      <p>Two better options:</p>
      <ul>
        <li>
          <strong>Server Components</strong> (Next.js App Router and other RSC frameworks) — fetch on the server
          and render. There&apos;s no client-side copy to manage at all. After a mutation, revalidate the path or tag
          and the server re-renders.
        </li>
        <li>
          <strong>TanStack Query</strong> (or SWR) for data that has to be fetched and refreshed on the client —
          dashboards, infinite lists, anything polling. It handles caching, deduplication, background refetching
          and optimistic updates.
        </li>
      </ul>
      <p>
        Once server data is out of the global store, it often turns out the store had very little else in it.
      </p>

      <h2>Put shareable state in the URL</h2>
      <p>
        If a user would reasonably expect to bookmark it, share it, or get it back with the back button, it belongs
        in the URL. Filters, search, sort, pagination and selected tabs all qualify. Keeping them in{" "}
        <code>useState</code> means the back button doesn&apos;t work, a shared link loses the view, and a refresh
        resets everything.
      </p>
      <pre>
        <code>{`"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SortSelect() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(e) {
    const next = new URLSearchParams(params);
    next.set("sort", e.target.value);
    router.replace(\`\${pathname}?\${next}\`, { scroll: false });
  }

  return (
    <select value={params.get("sort") ?? "newest"} onChange={onChange}>
      <option value="newest">Newest</option>
      <option value="price">Price</option>
    </select>
  );
}`}</code>
      </pre>
      <p>
        In an App Router page, the server can read the same <code>searchParams</code> and render the filtered list
        directly, so the first load is already correct and indexable.
      </p>

      <h2>Let forms own form state</h2>
      <p>
        A form whose every keystroke goes through a global store re-renders far more than it needs to. Keep it
        local. For simple forms, uncontrolled inputs read with <code>FormData</code> on submit are often enough.
        React 19&apos;s <code>useActionState</code> handles the submit–pending–result cycle, and{" "}
        <code>useOptimistic</code> covers showing a result before the server confirms it. For large forms with
        complex validation, a dedicated library such as React Hook Form keeps re-renders to the fields that change.
      </p>

      <h2>Keep local state local</h2>
      <p>
        The default for any new piece of state should be <code>useState</code> in the lowest component that needs
        it. Lift it up only when a sibling genuinely needs it, and only as far as their closest common parent. State
        that&apos;s higher than necessary re-renders more of the tree than necessary.
      </p>

      <h3>Derive, don&apos;t sync</h3>
      <p>
        The most common React state bug is keeping two pieces of state in sync with an effect:
      </p>
      <pre>
        <code>{`// avoid: two sources of truth, one render behind
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((sum, i) => sum + i.price * i.qty, 0));
}, [items]);

// prefer: compute it during render
const [items, setItems] = useState([]);
const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);`}</code>
      </pre>
      <p>
        If a value can be calculated from props or other state, calculate it. If the calculation is genuinely
        expensive, <code>useMemo</code> it — and with the React Compiler, much of that memoisation happens
        automatically.
      </p>

      <h2>Global client state: less than you think, chosen deliberately</h2>
      <p>
        After server, URL, form and local state have gone where they belong, what&apos;s left is usually small:
        theme, auth session details already on the client, a cart, a wizard, a complex editor. For that, pick by
        size and update frequency.
      </p>

      <h3>Context: for values that rarely change</h3>
      <p>
        Context is dependency injection, not a state manager. Every component that reads a context re-renders when
        its value changes, so it&apos;s ideal for theme, locale or the current user, and a poor fit for anything that
        updates on every keystroke. If you do use it for changing state, split it: separate contexts for values
        that change independently, and separate the <em>state</em> from the <em>setter</em> so components that only
        dispatch don&apos;t re-render.
      </p>
      <pre>
        <code>{`const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <CartDispatchContext value={dispatch}>
      <CartStateContext value={cart}>{children}</CartStateContext>
    </CartDispatchContext>
  );
}`}</code>
      </pre>

      <h3>Zustand: small stores with selective subscriptions</h3>
      <p>
        Zustand is a good default for modest global state. Components subscribe with a selector and re-render only
        when the selected slice changes — which fixes Context&apos;s main weakness with very little code.
      </p>
      <p>
        It&apos;s what we used for client state on a savings-account rewards program I led at Acko — a React and
        Next.js frontend in front of Node.js microservices, which went on to add more than 80,000 newly engaged
        users. The principle that kept it manageable is the one in this guide: data that belongs to the server
        stays with the server, and the client store holds only what is genuinely shared on the client.
      </p>
      <pre>
        <code>{`import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] }),
}));

// re-renders only when the count changes, not on every cart update
const count = useCart((s) => s.items.length);`}</code>
      </pre>

      <h3>Redux Toolkit: when you need the structure</h3>
      <p>
        Redux earns its extra ceremony in large applications with many developers, complex cross-cutting updates,
        or a need for strict traceability — every change is an action you can log, replay and inspect in DevTools.
        Use Redux Toolkit rather than hand-written reducers, and RTK Query if you&apos;re already on Redux and need a
        server-cache layer. For a small team building a small-to-medium app, it&apos;s usually more than you need.
      </p>

      <h2>Performance habits that matter</h2>
      <ul>
        <li>Subscribe to the smallest slice of state a component needs — a selector, not the whole store.</li>
        <li>Keep frequently changing state (a text input, a drag position) as low in the tree as possible.</li>
        <li>
          Don&apos;t create new objects in a context value or selector on every render unless they&apos;re memoised;
          a new object is a “change” to every subscriber.
        </li>
        <li>
          Use <code>startTransition</code> for updates that trigger expensive re-renders, so urgent updates like
          typing stay responsive.
        </li>
        <li>Measure with the React DevTools Profiler before optimising — guesses about re-renders are often wrong.</li>
      </ul>

      <h2>The short version</h2>
      <ol>
        <li>Server data goes in Server Components or a server-cache library, not a global store.</li>
        <li>Anything shareable or bookmarkable goes in the URL.</li>
        <li>Forms own their own state.</li>
        <li>Everything else starts as local <code>useState</code> and is lifted only as far as needed.</li>
        <li>Derive values during render instead of syncing them with effects.</li>
        <li>
          For what&apos;s genuinely global: Context for slow-changing values, Zustand for most apps, Redux Toolkit
          when the scale and team justify it.
        </li>
      </ol>
      <p>
        If your React codebase has outgrown its state management and you want a senior engineer to untangle it,
        that&apos;s what a <Link href="/hire-full-stack-developer-india">freelance React developer</Link> engagement
        is for.
      </p>
    </>
  );
}

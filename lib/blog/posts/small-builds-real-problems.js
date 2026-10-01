import Link from "next/link";

export const meta = {
  slug: "small-builds-real-problems",
  title: "A Poker Night, a Car Dealer, a Restaurant and a Clinic: Four Small Builds That Started With a Problem",
  metaTitle: "Four Small Builds That Solved Real Problems",
  description:
    "A poker night with no chips, a used-car dealer, restaurant tables and a busy clinic: four small custom software builds, and what they teach small businesses.",
  keyword: "custom software for small business",
  keywords: [
    "custom software for small business",
    "restaurant qr ordering system",
    "clinic appointment booking website",
    "used car dealer website",
    "build a web app fast",
  ],
  datePublished: "2026-10-02",
  readingMinutes: 9,
  relatedLanding: "software-development-lucknow",
  // Case studies this post tells the story of — each links back here.
  projects: ["chaal-tracker", "careasy", "oms", "clinic-template"],
};

export default function Post() {
  return (
    <>
      <p>
        Most of the software I build doesn&apos;t start with a specification. It starts with a problem that is
        annoying someone right now — and usually, the useful version of the fix is much smaller than anyone
        expects.
      </p>
      <p>
        These are four of those builds. One took about two hours. None of them is a big system. Each began with a
        specific, slightly awkward moment, and each taught me something about what small businesses actually need
        from software — which is rarely what gets sold to them.
      </p>

      <h2>1. The poker night with no chips</h2>
      <p>
        I was on a trip, staying in a dorm with a group of people I&apos;d mostly just met, and someone suggested a
        game of poker. Cards, we had. Chips, we didn&apos;t — and the usual workarounds, like paper slips or a
        running tally in someone&apos;s notes app, tend to fall apart at the first disagreement about who bet what.
      </p>
      <p>
        So I spent about two hours building{" "}
        <Link href="/work/chaal-tracker">Chaal Tracker</Link>: a small web app where one person hosts a session,
        the pot is tracked live as bets go in — in powers of two, the way we were playing — and at the end of the
        night it works out who owes whom. No app to install; it opened in a browser. Then we played on it.
      </p>
      <p>
        It&apos;s the smallest thing I&apos;ve shipped, and it&apos;s the one I think about most when a business
        describes a problem. The pattern underneath it — several people looking at one shared, live state that
        changes as things happen — is exactly the pattern behind an order queue, a token system at a clinic or a
        kitchen screen in a restaurant. The poker night just happened to be the version with the shortest deadline.
      </p>
      <p>
        <strong>The lesson:</strong> the first useful version of most software is tiny. Two hours of building the
        right small thing beats two months of building the wrong big one.
      </p>

      <h2>2. The used-car dealer who lived on WhatsApp</h2>
      <p>
        For a client who deals in used cars, I built a working demo of what his website could be — not a slide
        deck or a mockup, but a site he could click through:{" "}
        <Link href="/work/careasy">CarEasy</Link>.
      </p>
      <p>
        A used-car buyer wants three things quickly: to browse what&apos;s available, to compare two or three cars
        side by side, and to talk to someone. The first two are ordinary listing and comparison pages. The third is
        where most dealer websites go wrong — they put a contact form at the bottom, and the form goes to an inbox
        nobody checks.
      </p>
      <p>
        In India, that&apos;s the wrong channel entirely. When we looked at local businesses for our own market
        research, only somewhere between 5 and 19 percent of them even published an email address. WhatsApp, on
        the other hand, is universal — it&apos;s where the dealer already talks to buyers. So every car in CarEasy
        has a WhatsApp button that opens a chat about that specific car. The enquiry lands where the business
        already works, already knowing which car the buyer is asking about.
      </p>
      <p>
        <strong>The lesson:</strong> meet customers on the channel they already use. A website that routes
        enquiries into a tool the owner never opens is worse than no website at all.
      </p>

      <h2>3. The restaurant that doesn&apos;t need an app</h2>
      <p>
        Restaurants and cafés tend to be offered two kinds of ordering technology: a delivery platform that takes
        a commission on every order, or an expensive app that customers are expected to download. For a customer
        sitting at a table, both are overkill. They want to see the menu and order without waving down a waiter.
      </p>
      <p>
        So I built a <Link href="/work/oms">restaurant QR ordering system</Link> as a ready-to-deploy template.
        Each table gets its own QR code and order token. A customer scans it, the menu opens in their phone&apos;s
        browser — no download — and the order goes straight to a live kitchen dashboard, already tagged with the
        table. An admin panel tracks every order from placed to served.
      </p>
      <p>
        What it fixes is unglamorous and real: fewer order mistakes from misheard requests, faster table turnover,
        and no commission paid to a third party on orders taken inside the restaurant. It&apos;s the build behind
        the QR ordering service on <Link href="/services">the services page</Link>, and it&apos;s the poker-night
        pattern again — a shared, live view of orders that changes as they come in.
      </p>
      <p>
        <strong>The lesson:</strong> a web page beats an app for anything a customer does once, in the moment.
        Nobody installs an app to order a coffee.
      </p>

      <h2>4. The clinic where the phone never stopped</h2>
      <p>
        The fourth started as a real client build for a clinic. The problem was the one every busy clinic has: patients phone to book appointments, so the front desk spends the day interrupted, and anyone who
        wants to book outside clinic hours simply can&apos;t.
      </p>
      <p>
        The fix was a clinic website with an appointment-request flow — the patient sends a request from the
        site, and it goes into a database the clinic works through — alongside the pages a patient actually
        looks for: services, doctors, hours and location. Nothing exotic, and nothing that needs a
        payment gateway.
      </p>
      <p>
        Afterwards I turned it into a <Link href="/work/clinic-template">clinic booking template</Link>. Every
        business detail — name, contact information, address, hours, services — lives in a single data file, so
        pointing it at a different clinic, salon or consultant re-skins the whole site with no other code changes.
        Because each business gets its own name, address and services in the page and its structured data, the
        template is built for local search from the start.
      </p>
      <p>
        <strong>The lesson:</strong> a lot of small-business software is the same few problems in different
        clothes. Solve one well, then make it reusable.
      </p>

      <h2>What the four have in common</h2>
      <ul>
        <li>
          <strong>Each started from a problem, not a feature list.</strong> “We have no chips” and “the front desk
          can&apos;t stop answering the phone” are better briefs than most specifications.
        </li>
        <li>
          <strong>Each is a web app, not a native app.</strong> A link that opens in any phone&apos;s browser
          removes the biggest barrier there is: getting people to install something.
        </li>
        <li>
          <strong>Each was built small first.</strong> The useful version came early; anything more could follow
          once real people were using it.
        </li>
        <li>
          <strong>Each runs on mainstream technology</strong> — React and Next.js, with PostgreSQL where data needs
          to be kept — so any competent developer could maintain it later. Nobody is locked in.
        </li>
      </ul>
      <p>
        The same approach scales up to larger client work. Recent builds went from first conversation to launch in
        5, 13 and 22 days — including{" "}
        <Link href="/work/mushroom-dmr">rebuilding a research society&apos;s website</Link> that had disappeared
        entirely when its domain expired, and{" "}
        <Link href="/work/airimation">a drone-show simulator</Link> that a startup now uses to pitch investors.
      </p>

      <h2>If your business has a problem like these</h2>
      <p>
        Most businesses don&apos;t need a large software project. They need one annoying, repeated job to stop
        being annoying. If that sounds like yours, there&apos;s more on how this works on the{" "}
        <Link href="/software-development-lucknow">custom software development</Link> page, and for founders
        testing a new idea, on <Link href="/mvp-development-startups-india">MVP development for startups</Link>.
        The first call is free, and if an off-the-shelf tool would do the job better, that&apos;s what you&apos;ll
        hear.
      </p>
    </>
  );
}

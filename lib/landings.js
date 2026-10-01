// ---------------------------------------------------------------------------
// Keyword-targeted landing pages, rendered by components/ServiceLanding.js.
//
// Why these exist: every Google Ads ad group used to point at the homepage.
// A homepage has to speak to everyone, so cold paid traffic landed on copy
// that answered none of the question they'd just typed. Each entry below is
// a page written for one search intent, with the matching offer and the
// enquiry form on it — and, since organic search ranks pages rather than
// sites, it is also the page that has to win that search on its own.
//
// Two groups, same shape:
//   LOCAL_LANDINGS     Lucknow-qualified searches ("… in lucknow", "near me").
//   NATIONAL_LANDINGS  India-wide / remote searches ("hire … india").
//
// One page per intent, never two pages per keyword. `keyword` is the head
// term the page is built around; `keywords` are the close variants it is
// also written to answer. If a new keyword fits an existing page's intent,
// add it there instead of minting a page — two pages chasing one query
// split the signal and usually both rank worse (docs/seo-keywords.md has
// the full map).
//
// `volume` is the real Keyword Planner figure for Lucknow (Aug 2025 –
// Jul 2026) where one was pulled; left off where it wasn't, rather than
// guessed.
//
// NO PRICES in any of this copy — meta descriptions and FAQ answers
// included. The site shows one reference figure, in the homepage hero, and
// everything else is quoted on a call. FAQ answers are also emitted as
// FAQPage JSON-LD, so a number here would be a number in the markup too.
//
// Content fields:
//   lede       one paragraph under the H1
//   problem    short "sound familiar?" lines
//   sections   [{ heading, paragraphs[], bullets? }] — the page's real body;
//              this is where the depth that lets a page rank lives
//   offers     inline engagements, for pages whose offer isn't one of the
//              RETAINERS / PACKAGE_TIERS in lib/data.js
//   related    slugs of sibling landing pages to cross-link at the bottom
//   posts      slugs of blog posts (lib/blog) to list as further reading
// ---------------------------------------------------------------------------

export const LOCAL_LANDINGS = [
  {
    slug: "website-design-lucknow",
    keyword: "website design lucknow",
    keywords: ["website developer in lucknow", "best website developer in lucknow", "website developer near me"],
    volume: 480,
    region: "lucknow",
    navLabel: "Website Design",
    serviceType: "Website design and development",
    h1: "Website Design & Development in Lucknow",
    metaTitle: "Website Design & Development in Lucknow",
    metaDescription:
      "Website design and development in Lucknow by an ex-Acko, ex-Bigbasket engineer. A free working draft in about 3 hours, live within 24 hours of your content.",
    lede:
      "A real, working first draft in about three hours — before you pay anything. Standard-scope sites go live within 24 hours of the content arriving, and the person you talk to on the first call is the same person who builds the site.",
    problem: [
      "Customers search for you, find nothing, and call someone else.",
      "You have an Instagram page doing the job a website should be doing.",
      "The last developer disappeared and nobody can edit the site.",
    ],
    sections: [
      {
        heading: "What a Lucknow business website actually needs",
        paragraphs: [
          "Most people who find a local business online do it on a phone, often on a patchy 4G connection, and decide within a few seconds whether to stay. So the first job of the site is to load fast and make the next step obvious — call, WhatsApp, book, or get directions.",
          "Everything else is secondary to that. A site that looks impressive on a desktop monitor but takes six seconds to open on a phone loses the customer before they see any of it.",
        ],
        bullets: [
          "Mobile-first layout that is quick on a normal phone and a normal connection",
          "Call and WhatsApp buttons within thumb reach on every page",
          "Your Google Business Profile, hours and service area kept consistent with the site",
          "On-page SEO basics from day one — titles, descriptions, headings, structured data",
          "A contact form that actually reaches you, not an inbox nobody checks",
        ],
      },
      {
        heading: "How the build works",
        paragraphs: [
          "A 30-minute call to agree what the site needs to do and who it is for. Then a working first draft at a live link, usually within about three hours — not a mockup image, a real page you can open on your own phone.",
          "You send changes, the draft is revised, and once your final content (text, photos, logo) is in, a standard-scope site goes live within 24 hours. After launch you can keep the same person on a care plan for updates and fixes, or take the site and run it yourself.",
        ],
      },
      {
        heading: "How to choose the best website developer in Lucknow",
        paragraphs: [
          "“Best” is whoever builds the right site for your business and is still reachable a year later. Whoever you hire — here or elsewhere — these are the questions worth asking before you pay anyone:",
        ],
        bullets: [
          "Can I open sites you've built, live, right now? Screenshots prove nothing.",
          "Whose name are the domain and hosting registered in? It should be yours.",
          "Can I edit text and photos myself, or do I pay for every change?",
          "How fast does the site load on a phone? Ask them to run PageSpeed Insights in front of you.",
          "What happens when something breaks six months after launch — who do I call?",
        ],
      },
      {
        heading: "Who actually builds your site",
        paragraphs: [
          "Harshit Dixit — an IIIT Lucknow engineer who spent five years building platforms used by more than ten million people. At Bigbasket that meant making a checkout used for over five million transactions a month load faster (Largest Contentful Paint down from 4.2 to 3.4 seconds); at Acko, building insurance systems that issue tens of thousands of policies a month. A small business site gets the same habits: fast pages, clean code, and nothing that breaks the week after launch.",
        ],
      },
      {
        heading: "Looking for a website developer near you?",
        paragraphs: [
          "This work is based in Lucknow and serves businesses across the city — Gomti Nagar, Hazratganj, Aliganj, Indira Nagar and beyond — and elsewhere in Uttar Pradesh. Almost all of it happens on calls and WhatsApp, which turns out to be faster for everyone than meeting in person: you see the draft on your phone the same day instead of waiting for the next meeting.",
        ],
      },
    ],
    retainerIds: ["care", "local-seo"],
    packageIds: ["starter", "business", "ecommerce", "custom"],
    proofSlugs: ["airimation", "shroomly", "careasy"],
    related: ["ecommerce-website-development-lucknow", "website-redesign-lucknow", "seo-services-lucknow"],
    faqs: [
      {
        question: "How much does a website cost in Lucknow?",
        answer:
          "It depends on how many pages the site has and what it has to do — a brochure site, a site you edit yourself, an online store and a booking system are different amounts of work. You get one fixed quote for a defined scope on a free call, before anything starts, and the packages page shows exactly what each tier includes so you can compare it against any other quote.",
      },
      {
        question: "Can I see the site before I pay?",
        answer:
          "Yes — the free first draft is a real working preview at a live link, not a mockup image. If it isn't right, you have paid nothing.",
      },
      {
        question: "Will I be able to edit the website myself?",
        answer:
          "On the Business tier and above, yes — content is managed through a CMS, so text, photos and blog posts can be changed without a developer. A Starter site is simpler and changes go through a care plan or a quick request.",
      },
      {
        question: "Will my new website show up on Google?",
        answer:
          "Every site ships with the on-page basics search engines need — titles, descriptions, headings, a sitemap and structured data. Ranking for competitive searches takes more than that: an active Google Business Profile, reviews and useful content over time. That ongoing part is what the local SEO service covers.",
      },
      {
        question: "Do you also redesign existing websites?",
        answer:
          "Yes. A redesign is handled so the pages that already bring you traffic keep their Google rankings — old addresses are redirected properly rather than simply replaced.",
      },
    ],
  },
  {
    slug: "seo-services-lucknow",
    keyword: "seo services lucknow",
    keywords: ["seo expert in lucknow", "best seo company in lucknow", "local seo services in lucknow"],
    volume: 880,
    region: "lucknow",
    navLabel: "SEO Services",
    serviceType: "Search engine optimisation",
    h1: "SEO Expert in Lucknow for Local Businesses",
    metaTitle: "SEO Expert in Lucknow — Local SEO Services",
    metaDescription:
      "Local SEO services in Lucknow from an engineer, not a call centre — Google Business Profile, technical fixes and plain monthly reports. Free audit first.",
    lede:
      "Two thirds of the businesses in Lucknow don't have a website at all, and most of the ones that do have never had the technical basics checked. That is the opportunity — local search here is far less contested than the agencies pitching you will admit.",
    problem: [
      "You rank below competitors with worse products and older websites.",
      "Your Google Business Profile is out of date or barely filled in.",
      "Someone set up Analytics once and nobody has looked at it since.",
    ],
    sections: [
      {
        heading: "What local SEO in Lucknow actually involves",
        paragraphs: [
          "When someone nearby searches for what you do, Google shows a map with three businesses on it before any ordinary result. Getting into that map pack is mostly about your Google Business Profile and how consistently your business appears across the web — the website supports it, but doesn't win it alone.",
        ],
        bullets: [
          "Google Business Profile: the right primary category, services, service area, photos, regular posts and replies to every review",
          "Citations: your name, address and phone number identical on Justdial, Sulekha, IndiaMART and the other directories Google cross-checks",
          "On-page: a page for each service you want to be found for, written for the way people in Lucknow actually search",
          "Technical: speed, mobile usability, indexing errors and structured data — the part most local agencies skip",
          "Tracking: calls, WhatsApp clicks and form enquiries measured, so the report shows customers, not just rankings",
        ],
      },
      {
        heading: "An SEO expert or an SEO company?",
        paragraphs: [
          "Most SEO companies in Lucknow put an account manager between you and the people doing the work, and the people doing the work usually can't change your website — they send a list of recommendations to whoever built it, and it waits.",
          "Here it is one engineer who does the SEO and can make the website changes directly. That means fewer clients at a time, and it means a technical fix identified on Monday is live on Monday.",
        ],
      },
      {
        heading: "How to spot the best SEO company in Lucknow — and the worst",
        paragraphs: ["A few questions separate real SEO work from a monthly invoice:"],
        bullets: [
          "Anyone who guarantees a #1 ranking is guessing. Google doesn't sell guarantees, so nobody else can either.",
          "Ask who will actually do the work, and whether you can talk to them.",
          "Ask for a sample monthly report. If it is forty pages of keyword positions with no mention of enquiries, that's what you'll get.",
          "Your Google Business Profile should stay in your name. An agency should be added as a manager, never made the owner.",
          "Ask what they will fix in the first month. “Build backlinks” is not an answer.",
        ],
      },
      {
        heading: "What the first month looks like",
        paragraphs: [
          "A full audit of your site and your Google Business Profile, then the fixes that matter most, in order: profile gaps and categories, citation inconsistencies, technical errors, and missing service pages. Call and enquiry tracking gets set up in the same month, so every later report is measured against a real starting point rather than a guess.",
        ],
      },
    ],
    retainerIds: ["local-seo", "growth"],
    packageIds: [],
    proofSlugs: ["shroomly", "mushroom-dmr"],
    related: ["digital-marketing-lucknow", "website-redesign-lucknow", "technical-seo-consultant-india"],
    faqs: [
      {
        question: "How much do SEO services cost in Lucknow?",
        answer:
          "It depends on how competitive your category is and how much groundwork your site and profile need. The free audit shows exactly what needs doing; the monthly scope and one fixed figure are agreed on a call from there, with no long lock-in.",
      },
      {
        question: "How long before SEO works?",
        answer:
          "Google Business Profile and local map results can move within weeks. Organic rankings for competitive terms realistically take three to six months. Anyone promising page one in thirty days is either guessing or selling you something else.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No, and nobody honestly can — Google controls the rankings. What is guaranteed is the work: what gets fixed each month, and a report that shows whether it produced more calls and enquiries.",
      },
      {
        question: "Do I get a report I can actually read?",
        answer:
          "Monthly, in plain language — what moved, what didn't, and how many enquiries came from search. Not a forty-page automated PDF of keyword positions nobody opens.",
      },
      {
        question: "Do you work with businesses outside Lucknow?",
        answer:
          "Yes. Local SEO for a business elsewhere works the same way — it's built around wherever your customers are searching from, not where the work is done.",
      },
    ],
  },
  {
    slug: "software-development-lucknow",
    posts: ["small-builds-real-problems", "optimize-postgresql-query-performance"],
    keyword: "custom software development lucknow",
    keywords: [
      "custom software developer in lucknow",
      "software development company in lucknow near me",
      "software company lucknow",
    ],
    volume: 1600,
    region: "lucknow",
    navLabel: "Custom Software",
    serviceType: "Custom software development",
    h1: "Custom Software Development in Lucknow",
    metaTitle: "Custom Software Development in Lucknow",
    metaDescription:
      "Custom software in Lucknow — booking and ordering systems, dashboards, internal tools and automation — built by an ex-Acko, ex-Bigbasket engineer.",
    lede:
      "Booking systems, ordering systems, admin dashboards, internal tools and the automation that connects them — built by an engineer who spent five years shipping production software at Bigbasket and Acko, not outsourced to a template.",
    problem: [
      "Your team runs the business out of WhatsApp threads and spreadsheets.",
      "You want a dashboard that shows your real numbers, not a monthly PDF.",
      "Off-the-shelf software almost fits, and the gap costs staff hours every week.",
    ],
    sections: [
      {
        heading: "What custom software means for a small business",
        paragraphs: [
          "Not an enterprise system. Usually it's one tool that replaces one painful, repeated job — and it pays for itself in staff hours within months.",
        ],
        bullets: [
          "Appointment and booking systems for clinics, salons, coaching centres and consultants",
          "QR table ordering for restaurants and cafés, with orders going straight to a kitchen screen",
          "Inventory and order dashboards that replace a shared spreadsheet",
          "Customer and dealer portals — logins, order history, documents",
          "Automation that connects your website form, WhatsApp, calendar and sheets into one flow",
        ],
      },
      {
        heading: "Automation that gives staff their time back",
        paragraphs: [
          "Most of the value in custom software for a small business is in removing manual work. At Acko, extending the company's CMS with custom controllers cut an operations team's data turnaround from two days to under ten minutes, and Redis-backed background workflows triggered customer follow-ups within five seconds of an event. The same approach, at the scale of a Lucknow business, turns “someone updates the spreadsheet every evening” into something that happens on its own.",
        ],
      },
      {
        heading: "Custom build or off-the-shelf?",
        paragraphs: [
          "If a ready-made product does 90% of what you need, buy it — it's cheaper, and the free call will tell you so. Custom software earns its cost when your workflow is the thing that makes your business different, when you're paying per-user fees that grow faster than you do, or when you're stitching three tools together by hand every day.",
        ],
      },
      {
        heading: "How a project runs",
        paragraphs: [
          "It starts with a call to understand the workflow as it actually happens today — who does what, where things get lost. That becomes a written scope and a fixed quote. You then see working builds as it goes, not a big reveal at the end, so a wrong assumption is caught in days rather than at handover.",
          "Everything is built on mainstream, well-supported technology — React and Next.js, Node.js, PostgreSQL — so any competent developer can maintain it later. You are never locked in to the person who built it.",
        ],
      },
      {
        heading: "A developer, not a software company",
        paragraphs: [
          "If you're searching for a software development company in Lucknow near you, it's worth knowing the difference. A company gives you a sales call, a project manager and a team you rarely meet. Here you get one senior engineer who scopes it, builds it and answers the phone after launch. For the size of project most local businesses need, that is usually faster and cheaper; for a large team-sized build, it's worth saying so on the first call.",
        ],
      },
    ],
    retainerIds: ["care"],
    packageIds: ["custom", "ecommerce"],
    proofSlugs: ["oms", "clinic-template", "chaal-tracker"],
    related: ["ecommerce-website-development-lucknow", "mvp-development-startups-india", "website-design-lucknow"],
    faqs: [
      {
        question: "What kind of software do you build?",
        answer:
          "Booking and appointment systems, restaurant QR ordering, inventory and admin dashboards, customer portals, and integrations between tools a business already uses. Anything web-based where an off-the-shelf product doesn't quite fit the workflow.",
      },
      {
        question: "How is a custom build priced?",
        answer:
          "It's scoped on a call, because the honest answer depends entirely on what it has to do. You get a fixed quote for a defined scope before any work begins — no hourly billing on a moving target.",
      },
      {
        question: "Can you automate our WhatsApp enquiries?",
        answer:
          "Yes. Enquiry and booking automation — web form, WhatsApp and calendar wired into one flow with automatic follow-up — is one of the most common requests, and usually the fastest to pay for itself in reclaimed staff time.",
      },
      {
        question: "Will it work on phones?",
        answer:
          "Yes — everything is built as a web app that works in the browser on any phone, tablet or computer, so nobody has to install anything and there's no app-store approval to wait for.",
      },
    ],
  },
  {
    slug: "ecommerce-website-development-lucknow",
    keyword: "ecommerce website development lucknow",
    keywords: ["ecommerce website developer lucknow", "online store website lucknow"],
    region: "lucknow",
    navLabel: "E-commerce Websites",
    serviceType: "E-commerce website development",
    h1: "E-commerce Website Development in Lucknow",
    metaTitle: "E-commerce Website Development in Lucknow",
    metaDescription:
      "Online stores for Lucknow businesses — product catalogue, cart, UPI and card payments, and an admin panel to manage orders and stock yourself.",
    lede:
      "An online store that belongs to you — your products, your customers, your margins — with a checkout that takes UPI and cards, and an admin panel you can run without calling a developer.",
    problem: [
      "Marketplace commissions and fees eat into every order you ship.",
      "Orders arrive over WhatsApp and get tracked in a notebook.",
      "Customers ask for a website link and all you have is an Instagram page.",
    ],
    sections: [
      {
        heading: "What's in the store",
        bullets: [
          "Product catalogue with categories, variants (size, weight, colour) and search",
          "Cart and checkout with UPI, cards and net banking through a payment gateway like Razorpay",
          "Order notifications to you and to the customer",
          "An admin panel for products, stock, orders and customer enquiries",
          "Mobile-first pages that load fast — most shoppers will be on a phone",
          "Product structured data, so Google can show price and availability in search",
        ],
      },
      {
        heading: "Your own store, Shopify, or a marketplace?",
        paragraphs: [
          "They're not either-or. Marketplaces like Amazon, Flipkart and Meesho bring buyers but take a cut of every order and own the customer relationship. Shopify is quick to start but has a monthly fee plus app costs that add up. A store of your own has no per-order commission and keeps every customer's details with you — the trade-off is that you have to bring the traffic, which is where SEO and a Google Business Profile come in.",
          "Many businesses do both: sell on a marketplace for reach, and send repeat customers to their own store where the margin is better. The free call is the place to work out which mix makes sense for what you sell.",
        ],
      },
      {
        heading: "Built from a real store, not a demo",
        paragraphs: [
          "Shroomly — a mushroom-foods business — runs on this kind of build: a shop, a blog, and an admin panel for products, orders, blog posts and leads, on Next.js with a PostgreSQL database, first-party analytics, GA4 and Search Console. It went from first discussion to delivery in 22 days. You can open it and try the store yourself.",
          "The checkout experience comes from three years at Bigbasket, working on a checkout that handles more than five million transactions a month — including the real-time charges engine that calculates fees and waivers at checkout for over two million daily users.",
        ],
      },
    ],
    retainerIds: ["care"],
    packageIds: ["ecommerce", "business"],
    proofSlugs: ["shroomly", "careasy"],
    related: ["website-design-lucknow", "seo-services-lucknow", "software-development-lucknow"],
    faqs: [
      {
        question: "Can customers pay by UPI?",
        answer:
          "Yes. Checkout runs through a payment gateway such as Razorpay, which takes UPI, cards, net banking and wallets, and settles to your bank account.",
      },
      {
        question: "Can I add and edit products myself?",
        answer:
          "Yes — products, prices, stock and photos are all managed from an admin panel. No developer needed for day-to-day changes.",
      },
      {
        question: "Should I use Shopify instead?",
        answer:
          "Sometimes, yes — if you want to start this week and don't mind the monthly and app fees, Shopify is a reasonable choice, and it's better to hear that on the first call than after paying for a build. A custom store makes more sense when you want no platform fees, a particular checkout or ordering flow, or full ownership of the code and data.",
      },
      {
        question: "Will my products show up on Google?",
        answer:
          "Each product page ships with its own title, description and product structured data so Google can index it properly. Ranking against large marketplaces takes ongoing SEO work on top of that, which can be added as a monthly service.",
      },
    ],
  },
  {
    slug: "website-redesign-lucknow",
    posts: ["nextjs-app-router-seo"],
    keyword: "website redesign services lucknow",
    keywords: ["website redesign lucknow", "website revamp lucknow"],
    region: "lucknow",
    navLabel: "Website Redesign",
    serviceType: "Website redesign",
    h1: "Website Redesign Services in Lucknow",
    metaTitle: "Website Redesign Services in Lucknow",
    metaDescription:
      "Redesign an old, slow or hard-to-edit website without losing your Google rankings — proper redirects, faster pages, and a site you can update yourself.",
    lede:
      "An old website is rarely worth patching and rarely worth throwing away blindly either. A redesign done properly keeps what Google already trusts about your site and replaces everything that's costing you customers.",
    problem: [
      "The site looks dated next to your competitors and customers notice.",
      "It's slow on phones and nobody knows why.",
      "Changing a phone number means finding the developer who built it.",
    ],
    sections: [
      {
        heading: "Signs your website needs a redesign",
        bullets: [
          "It takes more than three seconds to open on a phone",
          "The mobile layout is a squashed version of the desktop one",
          "You can't change text or photos without paying someone",
          "It doesn't say clearly, in the first screen, what you do and how to contact you",
          "It was built on a theme or plugin that no longer gets updates",
        ],
      },
      {
        heading: "Redesigning without losing your Google rankings",
        paragraphs: [
          "This is where most redesigns go wrong. The new site launches, the old page addresses stop working, and months of search traffic disappear overnight — Google treats every broken address as a page that no longer exists.",
          "A careful redesign starts by listing every page that currently gets traffic or links, then maps each old address to its new one with a permanent (301) redirect. Titles, descriptions and structured data are carried over or improved rather than lost, and Search Console is checked after launch so any errors are caught in days, not months.",
        ],
      },
      {
        heading: "What gets kept, and what gets rebuilt",
        paragraphs: [
          "Your domain, your email, your content that works and the addresses Google already knows are kept. The design, the code underneath and anything slow get rebuilt — usually on Next.js, which serves fast, pre-built pages and makes a lot of the technical SEO work automatic.",
          "The Mushroom Society of India's rebuild is the extreme case: its domain had expired and the site was gone entirely. Its content was recovered page by page from public web archives and rebuilt as a fast, mobile-friendly Next.js site — journal archive, membership forms and all — in five days.",
        ],
      },
    ],
    retainerIds: ["care", "local-seo"],
    packageIds: ["business", "ecommerce"],
    proofSlugs: ["mushroom-dmr", "shroomly"],
    related: ["website-design-lucknow", "seo-services-lucknow", "technical-seo-consultant-india"],
    faqs: [
      {
        question: "Will I lose my Google rankings after a redesign?",
        answer:
          "Not if it's done properly. Every old page address that has traffic or links gets a permanent redirect to its new equivalent, titles and descriptions are carried over, and Search Console is monitored after launch. Rankings usually hold, and a faster site often improves them.",
      },
      {
        question: "Can you redesign a WordPress site?",
        answer:
          "Yes. Depending on how you use it, the site is either rebuilt on a faster modern stack with an editor you can still use, or kept on WordPress and cleaned up. That decision is made on the free call, based on what you actually need to edit.",
      },
      {
        question: "Do I keep my domain and email?",
        answer:
          "Yes. The domain stays yours and email is left exactly where it is — only the website itself changes.",
      },
      {
        question: "Can I see the new design before it replaces the old site?",
        answer:
          "Yes — the redesign is built and reviewed at a separate preview link first. The live site is only switched over once you've approved it.",
      },
    ],
  },
  {
    slug: "digital-marketing-lucknow",
    keyword: "digital marketing agency lucknow",
    keywords: ["digital marketing company lucknow", "google ads management lucknow"],
    volume: 4400,
    region: "lucknow",
    navLabel: "Digital Marketing",
    serviceType: "Digital marketing services",
    h1: "Digital Marketing Agency in Lucknow",
    metaTitle: "Digital Marketing Agency in Lucknow",
    metaDescription:
      "Lucknow digital marketing run by one engineer, not a call centre — SEO, Google Ads and the website itself, reported in enquiries. Free 20-minute check.",
    lede:
      "Most Lucknow agencies will sell you a monthly retainer and report impressions. I build the site, run the search and the ads on it, and report the only number that matters — how many real enquiries came in.",
    problem: [
      "You are paying for marketing and can't tell what it produced.",
      "Your competitors show up on Google Maps and you don't.",
      "Enquiries come in on WhatsApp and nobody follows them up.",
    ],
    sections: [
      {
        heading: "Search first, because that's where buyers are",
        paragraphs: [
          "Someone who searches “dentist near me” or “caterer in Gomti Nagar” wants to buy today. Someone scrolling Instagram mostly doesn't. So the work starts where intent is highest: your Google Business Profile, your website's search visibility, and Google Ads on the exact searches that lead to customers — with negative keywords so you stop paying for the ones that don't.",
        ],
      },
      {
        heading: "Measured in enquiries, not impressions",
        paragraphs: [
          "Calls, WhatsApp clicks and form submissions are tracked as conversions from the first week, so every rupee of ad spend and every month of SEO can be traced to whether it brought in a customer. If a channel isn't producing, the report says so and the money moves.",
        ],
      },
    ],
    retainerIds: ["growth", "ads", "local-seo"],
    packageIds: [],
    proofSlugs: ["shroomly", "airimation", "mushroom-dmr"],
    related: ["seo-services-lucknow", "website-design-lucknow", "website-redesign-lucknow"],
    faqs: [
      {
        question: "How much does a digital marketing agency in Lucknow cost?",
        answer:
          "It depends on which channels you need and, for Google Ads, how much you want to spend on ads themselves. The free 20-minute check shows what's worth doing for your business; the monthly scope is then quoted as one fixed figure, and single services can be taken on their own.",
      },
      {
        question: "What makes this different from a bigger agency?",
        answer:
          "You get one engineer who builds and runs everything, instead of an account manager relaying instructions to a team you never meet. That means fewer clients at a time, and it means the person changing the website is the same person reading the analytics.",
      },
      {
        question: "Do I need a new website first?",
        answer:
          "Not always. If the current site loads fast and converts, the work is SEO and ads on top of it. The free 20-minute check tells you which of the two you actually need before you spend anything.",
      },
    ],
  },
];

// India-wide and remote searches. Same shape as above; `region: "india"`
// switches the page's kicker and the Service node's areaServed.
export const NATIONAL_LANDINGS = [
  {
    slug: "hire-full-stack-developer-india",
    posts: ["nodejs-memory-leak-debugging", "react-state-management-best-practices", "optimize-postgresql-query-performance"],
    keyword: "hire freelance full stack developer india",
    keywords: [
      "hire remote full stack engineer india",
      "react node js developer india",
      "react js developer for hire india",
      "full stack nextjs developer freelance",
    ],
    region: "india",
    navLabel: "Hire a Full-Stack Developer",
    serviceType: "Freelance full-stack development",
    h1: "Hire a Freelance Full-Stack Developer in India",
    metaTitle: "Hire a Full-Stack Developer in India",
    metaDescription:
      "Hire a senior freelance full-stack developer — React, Next.js, Node.js and PostgreSQL — ex-Acko and ex-Bigbasket, working remotely with teams across India.",
    lede:
      "A senior React, Next.js and Node.js engineer you can bring in for a project, a few months or a few hours a week — five years of production experience at Bigbasket and Acko, without the agency layer or a full-time hire.",
    problem: [
      "Your roadmap is slipping and hiring a full-time engineer will take months.",
      "An agency quoted you a team when you need one experienced person.",
      "Your codebase has grown past what your current developer can safely change.",
    ],
    offers: [
      {
        name: "Fixed-scope project",
        scope: "Defined deliverable · fixed quote",
        summary: "A feature, an MVP, a rebuild or an integration, scoped in writing and delivered end to end.",
        includes: ["Written scope and fixed quote before work starts", "Working builds to review as it goes", "Clean handover: docs, deployment, repository access"],
      },
      {
        name: "Ongoing engagement",
        scope: "Committed hours each week · monthly",
        summary: "A senior engineer embedded in your team — your repository, your standups, your tickets.",
        includes: ["Pull requests reviewed and merged the way your team works", "Architecture input as well as code", "Month-to-month, no long lock-in"],
      },
      {
        name: "Code review & rescue",
        scope: "Audit first · then fix",
        summary: "For a codebase a previous developer or agency left fragile, slow or half-finished.",
        includes: ["Written assessment of what's risky and why", "Prioritised fix plan", "The fixes themselves, if you want them"],
      },
    ],
    sections: [
      {
        heading: "What you're actually hiring",
        paragraphs: [
          "Five years of production engineering on consumer platforms serving more than ten million users. At Acko: Safebuy, a distributed insurance engine issuing 50,000+ policies a month with sub-200ms API responses, and a rewards program built end to end on Next.js, Zustand and Node.js microservices that added 80,000+ engaged users. At Bigbasket: a checkout handling 5M+ transactions a month, a real-time charges engine for 2M+ daily users, and p95 latency cut from 380ms to 300ms at 10,000 requests a minute. That's the experience that shows up in the small decisions — what to cache, what to make a background job, what will hurt at ten times the load.",
        ],
        bullets: [
          "Frontend: React, Next.js (App Router), TypeScript, Redux / Zustand, Tailwind CSS, Core Web Vitals",
          "Backend: Node.js, Express, REST APIs, PostgreSQL, Redis, Strapi CMS",
          "Infra: AWS, Vercel, Docker, Kubernetes, Akamai CDN, OpenTelemetry, Jenkins, CI/CD",
        ],
      },
      {
        heading: "How remote work runs",
        paragraphs: [
          "Work happens in your tools — GitHub or GitLab, Slack, Jira or Linear — on India time, with overlap hours agreed up front for teams elsewhere. Progress is visible as pull requests and deployed previews rather than status reports, and anything that changes the scope is raised in writing before it's built.",
        ],
      },
      {
        heading: "Freelancer, agency or full-time hire?",
        paragraphs: [
          "A full-time hire is right when you have steady, long-term work and time to recruit. An agency is right when you need a whole team at once. A senior freelancer fits the space in between: when you need experience now, for a defined piece of work or a few months, and would rather not pay for a project manager to relay messages to a developer.",
        ],
      },
    ],
    retainerIds: [],
    packageIds: [],
    proofSlugs: ["shroomly", "mushroom-dmr", "airimation"],
    related: ["nextjs-development-company-india", "mvp-development-startups-india", "fractional-cto-india"],
    faqs: [
      {
        question: "Can you work inside our existing codebase?",
        answer:
          "Yes — most engagements do. The first few days go into reading the code and shipping something small, so there's a real sense of how the codebase works before anything larger is changed.",
      },
      {
        question: "Do you do React-only or Node-only work?",
        answer:
          "Yes. Frontend-only React and Next.js work is the strongest fit, given the background; backend-only Node.js and PostgreSQL work is equally fine.",
      },
      {
        question: "What time zone do you work in?",
        answer:
          "India Standard Time. For teams elsewhere, a fixed daily overlap window is agreed at the start, and everything else happens asynchronously through pull requests and written updates.",
      },
      {
        question: "How is freelance work billed?",
        answer:
          "Fixed-scope projects get a fixed quote before work starts. Ongoing engagements are a monthly amount for an agreed number of hours each week. Either way the figure is set on the first call, not after the work is done.",
      },
    ],
  },
  {
    slug: "nextjs-development-company-india",
    posts: ["nextjs-app-router-seo", "fix-core-web-vitals-nextjs", "react-state-management-best-practices"],
    keyword: "next js development company india",
    keywords: ["hire nextjs developer india", "nextjs seo expert india", "full stack nextjs developer freelance"],
    region: "india",
    navLabel: "Next.js Development",
    serviceType: "Next.js development",
    h1: "Next.js Development in India, Without the Agency Layer",
    metaTitle: "Hire a Next.js Developer in India",
    metaDescription:
      "Next.js development in India from a senior engineer — App Router builds, migrations, performance and SEO. Ex-Acko and ex-Bigbasket; remote across India.",
    lede:
      "Marketing sites, stores, dashboards and SaaS products on Next.js — built by one senior engineer who has run React in production at scale, and who knows where the App Router's sharp edges are.",
    problem: [
      "Your site is on Next.js and still slow, and nobody can say why.",
      "You need to migrate from the Pages Router, Create React App or WordPress.",
      "An agency built it, and now every change takes two weeks.",
    ],
    offers: [
      {
        name: "New Next.js build",
        scope: "Site, store, dashboard or SaaS",
        summary: "From scope to production — App Router, TypeScript, a real database, and deployment you own.",
        includes: ["Server components and static rendering where they fit", "SEO metadata, sitemap and structured data built in", "Hosting on Vercel, AWS or your own infrastructure"],
      },
      {
        name: "Migration",
        scope: "Pages Router · CRA · WordPress → App Router",
        summary: "Move an existing product onto the App Router without a freeze or a big-bang rewrite.",
        includes: ["Route-by-route plan so both versions run side by side", "URLs, redirects and metadata preserved", "Performance measured before and after"],
      },
      {
        name: "Performance & SEO fix",
        scope: "Audit · then implementation",
        summary: "For a Next.js site that's slow, badly indexed, or both.",
        includes: ["Core Web Vitals diagnosis (LCP, INP, CLS)", "Rendering and caching strategy reviewed", "Indexing, canonical and structured-data fixes"],
      },
    ],
    sections: [
      {
        heading: "Why Next.js, and when not to use it",
        paragraphs: [
          "Next.js is a good default when search traffic matters and pages should be fast on a first visit: it can pre-render pages at build time, stream server-rendered ones, and ship less JavaScript through React Server Components. It's less useful for a purely internal tool behind a login, where a plain React app is often simpler — and that's worth hearing before the build, not after.",
        ],
      },
      {
        heading: "A Next.js SEO specialist, not just a Next.js developer",
        paragraphs: [
          "Plenty of Next.js sites rank badly because the framework was used like a single-page app: content rendered only in the browser, metadata set on the client, every URL returning the same title. Getting this right is mostly about which rendering mode each route uses, the Metadata API, a generated sitemap, canonical URLs and structured data built from the same data the page renders. This site is built that way — on Next.js 16, with one linked structured-data graph — and it's the same approach every build gets.",
        ],
      },
      {
        heading: "Next.js in production, at scale",
        paragraphs: [
          "Next.js experience here isn't just marketing sites. At Acko, Safebuy — a distributed insurance engine on React, Next.js, Node.js and Redis, running in Docker on AWS — issues more than 50,000 policies a month with policy-issuance API responses under 200 milliseconds. Challan tooling built on Next.js and Tailwind CSS integrated more than twelve state RTO APIs, each with a median response under 300 milliseconds.",
        ],
      },
      {
        heading: "Why one senior developer instead of a development company",
        paragraphs: [
          "Most Next.js development companies in India staff a project with a lead who scopes it and juniors who build it. That works for large, team-sized products. For most sites and early products, one experienced engineer is faster, cheaper and more consistent — the person who understood your requirements is the person writing the code.",
        ],
      },
    ],
    retainerIds: [],
    packageIds: [],
    proofSlugs: ["shroomly", "mushroom-dmr", "airimation"],
    related: ["hire-full-stack-developer-india", "technical-seo-consultant-india", "mvp-development-startups-india"],
    faqs: [
      {
        question: "Which version of Next.js do you build on?",
        answer:
          "The current stable release, on the App Router, unless an existing project has a reason to stay on the Pages Router. Upgrades are planned against the official migration guides rather than done blind.",
      },
      {
        question: "Can you migrate our site from WordPress to Next.js?",
        answer:
          "Yes. Content is moved into either a headless CMS or a database, every existing URL is kept or permanently redirected, and SEO metadata is carried over, so search traffic isn't lost in the move.",
      },
      {
        question: "Do we have to host on Vercel?",
        answer:
          "No. Vercel is the simplest option and usually the right one for a small team, but Next.js runs well on AWS, in Docker, or on your own servers.",
      },
      {
        question: "Can you fix an existing Next.js site's SEO?",
        answer:
          "Yes — that's a common engagement. It starts with an audit of how each route renders, what metadata and structured data it outputs, and what Google has actually indexed, followed by the fixes.",
      },
    ],
  },
  {
    slug: "mvp-development-startups-india",
    posts: ["optimize-postgresql-query-performance", "nodejs-memory-leak-debugging"],
    keyword: "mvp development for startups india",
    keywords: ["custom software development services india", "scalable web application development india"],
    region: "india",
    navLabel: "MVP Development",
    serviceType: "MVP and custom software development",
    h1: "MVP Development for Startups in India",
    metaTitle: "MVP Development for Startups in India",
    metaDescription:
      "Launch an MVP that won't need a rewrite at the first traction — scoped hard, built on Next.js, Node.js and PostgreSQL by an ex-Bigbasket, ex-Acko engineer.",
    lede:
      "The job of an MVP is to find out whether anyone wants the product, as quickly and cheaply as possible — without building something so fragile that the first bit of traction forces a rewrite.",
    problem: [
      "You have a validated problem and no technical co-founder.",
      "Agencies quoted six months for what should take six weeks.",
      "Your prototype works for ten users and you're scared of a thousand.",
    ],
    offers: [
      {
        name: "MVP build",
        scope: "Typically 4–10 weeks",
        summary: "One core workflow, done properly, in front of real users as early as possible.",
        includes: ["Scope workshop: what's in, what's cut, what's faked", "Auth, database, payments and admin where needed", "Analytics wired in from day one"],
      },
      {
        name: "Scale-up rebuild",
        scope: "After traction · phased",
        summary: "For a product that found users and is now straining under them.",
        includes: ["Bottlenecks measured, not guessed", "Phased rebuild — no feature freeze", "Queues, caching and database work where they pay off"],
      },
      {
        name: "Architecture audit",
        scope: "1–2 weeks · written report",
        summary: "An outside view of an existing build before you raise, hire or scale.",
        includes: ["Where it will break first, and at what load", "Security and data-handling gaps", "Prioritised fix plan"],
      },
    ],
    sections: [
      {
        heading: "What an MVP should — and shouldn't — include",
        paragraphs: [
          "The hardest part of an MVP isn't the code, it's deciding what to leave out. A good scope has one core workflow that proves the idea, done well enough that users trust it, and everything else deferred, bought, or done manually behind the scenes until demand proves it's worth building.",
        ],
        bullets: [
          "In: the core workflow, sign-up, the one integration the product depends on, analytics",
          "Usually bought, not built: authentication, payments, email, file storage",
          "Usually manual at first: onboarding, reporting, most admin tasks",
          "Out until proven: native apps, multi-language, complex permission systems",
        ],
      },
      {
        heading: "Scalable from the start, without over-engineering",
        paragraphs: [
          "Scalability at MVP stage isn't Kubernetes and microservices. It's a sound database schema, PostgreSQL rather than something exotic, background jobs for anything slow, sensible caching, and a codebase another engineer can read. Those choices cost almost nothing on day one and are expensive to retrofit — the lesson from building systems like Acko's Safebuy engine (50,000+ policies a month) and Bigbasket's checkout (5M+ transactions a month).",
          "Speed of delivery matters as much: recent builds went from first discussion to launch in 5, 13 and 22 days.",
        ],
      },
      {
        heading: "After launch",
        paragraphs: [
          "You get the repository, the deployment and documentation written for whoever comes next. If you're hiring your first engineers, help with the job description, interview loop and onboarding is part of the handover — or the build can continue on a monthly basis while you find the right people.",
        ],
      },
    ],
    retainerIds: [],
    packageIds: [],
    proofSlugs: ["shroomly", "oms", "chaal-tracker"],
    related: ["fractional-cto-india", "hire-full-stack-developer-india", "nextjs-development-company-india"],
    faqs: [
      {
        question: "How long does it take to build an MVP?",
        answer:
          "Typically four to ten weeks, depending on how much the core workflow has to do. The scoping call is where that number gets set — usually by cutting scope rather than extending the timeline.",
      },
      {
        question: "Which tech stack do you use for MVPs?",
        answer:
          "Next.js and React on the frontend, Node.js and PostgreSQL behind it, deployed on Vercel or AWS. It's a mainstream stack, so hiring engineers to take it over later is straightforward.",
      },
      {
        question: "Do you build mobile apps?",
        answer:
          "MVPs are built as responsive web apps that work in any phone browser, which is faster and cheaper to validate with than a native app. A native app makes sense once the product is proven.",
      },
      {
        question: "Can you help us after the MVP launches?",
        answer:
          "Yes — either continuing development month to month, or as fractional CTO support while you hire your own team.",
      },
    ],
  },
  {
    slug: "technical-seo-consultant-india",
    posts: ["fix-core-web-vitals-nextjs", "nextjs-app-router-seo"],
    keyword: "technical seo consultant india",
    keywords: [
      "website speed optimization services india",
      "web application performance audit india",
      "nextjs seo expert india",
    ],
    region: "india",
    navLabel: "Technical SEO & Speed",
    serviceType: "Technical SEO and website performance optimisation",
    h1: "Technical SEO & Website Speed Optimisation",
    metaTitle: "Technical SEO & Speed Consultant, India",
    metaDescription:
      "Technical SEO audits and website speed optimisation from an engineer who also writes the fix — Core Web Vitals, indexing, rendering and structured data.",
    lede:
      "Most SEO consultants can tell you a page is slow. Fewer can open the code, find the script or image causing it, and fix it. This is technical SEO and performance work done by a frontend engineer who spent years making high-traffic pages fast.",
    problem: [
      "Search Console shows pages as “Crawled — currently not indexed” and nobody knows why.",
      "PageSpeed Insights is red on mobile and every fix attempted made no difference.",
      "Your developers and your SEO agency keep blaming each other.",
    ],
    offers: [
      {
        name: "Technical SEO audit",
        scope: "1–2 weeks · written report",
        summary: "Everything Google checks under the hood, with a prioritised fix list.",
        includes: ["Crawling, indexing, canonicals, redirects and sitemaps", "Rendering: what Google actually sees on JavaScript-heavy pages", "Structured data validated against what's on the page"],
      },
      {
        name: "Performance audit",
        scope: "Core Web Vitals · field and lab data",
        summary: "Why the site is slow for real users, measured — not guessed.",
        includes: ["LCP, INP and CLS diagnosed to the element and script", "Images, fonts, third-party scripts and bundle size", "Server response and caching reviewed"],
      },
      {
        name: "Implementation",
        scope: "The fixes, in your codebase",
        summary: "The audit's recommendations actually shipped, not left in a PDF.",
        includes: ["Pull requests against your repository", "Before-and-after measurements", "Search Console monitored after release"],
      },
    ],
    sections: [
      {
        heading: "What a technical SEO audit covers",
        bullets: [
          "Crawlability: robots.txt, internal linking, orphaned and blocked pages",
          "Indexing: canonical tags, duplicate content, noindex mistakes, redirect chains",
          "Rendering: whether content and links exist in the HTML or only after JavaScript runs",
          "Sitemaps that list only real, indexable URLs",
          "Structured data: valid, linked, and matching what visitors see",
          "Mobile usability, HTTPS and security headers",
        ],
      },
      {
        heading: "Core Web Vitals, explained without the jargon",
        paragraphs: [
          "Google measures three things from real Chrome users. Largest Contentful Paint — how long the main content takes to appear; good is under 2.5 seconds. Interaction to Next Paint — how quickly the page responds when someone taps or types; good is under 200 milliseconds. Cumulative Layout Shift — how much the page jumps around while loading; good is under 0.1.",
          "These are measured at the 75th percentile of real visits, so a fast laptop on office Wi-Fi tells you little. The audit uses field data where it exists and reproduces slow conditions where it doesn't.",
        ],
      },
      {
        heading: "Track record",
        bullets: [
          "Bigbasket checkout, 5M+ transactions a month: Largest Contentful Paint cut from 4.2s to 3.4s and time-to-interactive from 6s to 3.6s, through memoisation, code-splitting and deferring non-critical assets",
          "Bigbasket sitemaps: automated builds across 500,000+ product URLs, cutting regeneration from 3 hours to 8 minutes and improving crawl efficiency by 15%",
          "bb Elevate rewards interface: page loads held under 1.5 seconds at peak for 1M+ subscribers",
          "Service routing reworked with AWS ALB and Nginx: p95 latency from 380ms to 300ms at 10,000 requests a minute, without adding servers",
        ],
      },
      {
        heading: "Next.js and JavaScript-framework SEO",
        paragraphs: [
          "JavaScript frameworks are where technical SEO most often goes wrong, and where an engineer's view helps most: which routes are statically rendered, which are rendered per request, what ends up in the initial HTML, and how metadata is generated. For Next.js sites in particular, most indexing and speed problems trace back to a handful of rendering and caching decisions.",
        ],
      },
    ],
    retainerIds: [],
    packageIds: [],
    proofSlugs: ["shroomly", "mushroom-dmr"],
    related: ["nextjs-development-company-india", "seo-services-lucknow", "website-redesign-lucknow"],
    faqs: [
      {
        question: "Will a faster website rank higher?",
        answer:
          "Speed is a ranking signal, but a modest one — it rarely lifts a weak page above a more relevant one. Its bigger effect is on people: slow pages lose visitors before they load, so faster pages usually convert noticeably better even when rankings don't move.",
      },
      {
        question: "Do you implement the fixes or just report them?",
        answer:
          "Either. The audit is useful on its own for an in-house team, and the fixes can also be implemented directly in your codebase with before-and-after measurements.",
      },
      {
        question: "Can you audit a WordPress or Shopify site?",
        answer:
          "Yes — the audit covers any site. Fixes on hosted platforms are limited to what the platform allows, and the report says clearly which recommendations fall into that category.",
      },
      {
        question: "How long does a technical SEO audit take?",
        answer:
          "Typically one to two weeks, delivered as a written report with a prioritised fix list — most important and least effort first.",
      },
    ],
  },
  {
    slug: "fractional-cto-india",
    posts: ["optimize-postgresql-query-performance", "nodejs-memory-leak-debugging"],
    keyword: "fractional cto for early stage startups india",
    keywords: ["fractional cto india", "part time cto india", "technical advisor for startups india"],
    region: "india",
    navLabel: "Fractional CTO",
    serviceType: "Fractional CTO and technical advisory",
    h1: "Fractional CTO for Early-Stage Startups in India",
    metaTitle: "Fractional CTO for Startups in India",
    metaDescription:
      "Senior engineering judgment for early-stage startups, a few hours a week — stack and architecture decisions, vendor oversight and your first engineering hires.",
    lede:
      "Senior engineering judgment for founders who need it before they can justify a full-time CTO — the stack, the architecture, the agency you're paying, and the first engineers you hire.",
    problem: [
      "You're a non-technical founder and can't tell whether your agency is doing good work.",
      "You're about to make a stack or architecture decision you'll live with for years.",
      "You need to hire engineers and don't know how to assess them.",
    ],
    offers: [
      {
        name: "Advisory retainer",
        scope: "A few hours a week · monthly",
        summary: "A standing engineering lead for decisions, reviews and hiring.",
        includes: ["A weekly call plus async access for decisions", "Architecture and pull-request reviews", "Vendor and agency oversight"],
      },
      {
        name: "Hiring support",
        scope: "Per role",
        summary: "Your first engineers, assessed by someone who has worked with good ones.",
        includes: ["Role definition and job description", "Technical interview design and interviews", "Onboarding plan for the first month"],
      },
      {
        name: "Technical due diligence",
        scope: "Before a raise or acquisition",
        summary: "An independent assessment of a codebase and the team behind it.",
        includes: ["Architecture, security and scalability review", "Engineering process and delivery risks", "Written report for founders or investors"],
      },
    ],
    sections: [
      {
        heading: "When a fractional CTO makes sense",
        paragraphs: [
          "Early-stage startups usually need a CTO's judgment long before they need a CTO's hours. A fractional CTO fits when the technical decisions are high-stakes but not yet full-time: choosing a stack, deciding between an agency and in-house engineers, reviewing what a vendor delivered, or preparing the technical story for investors.",
        ],
      },
      {
        heading: "What the role covers",
        bullets: [
          "Stack and architecture decisions, written down with the reasoning",
          "Overseeing agencies and freelancers — reviewing estimates, code and delivery",
          "Engineering hiring: defining roles, running technical interviews, onboarding",
          "Roadmap input: what to build, what to buy, what to postpone",
          "Security and data-handling basics before they become an incident",
        ],
      },
      {
        heading: "Background",
        paragraphs: [
          "Five years of production engineering at Bigbasket and Acko on platforms serving more than ten million users — architecting Acko's Safebuy insurance engine (50,000+ policies a month), leading a rewards program end to end across frontend and microservices, and owning checkout performance and a real-time charges engine at Bigbasket. Also a guest speaker on generative AI system design and enterprise adoption at Bennett University. It's hands-on experience of what breaks when a product grows, which is most of what an early-stage CTO is for.",
        ],
      },
    ],
    retainerIds: [],
    packageIds: [],
    proofSlugs: ["airimation", "shroomly"],
    related: ["mvp-development-startups-india", "hire-full-stack-developer-india", "technical-seo-consultant-india"],
    faqs: [
      {
        question: "What's the difference between a fractional CTO and a technical co-founder?",
        answer:
          "A technical co-founder is a long-term commitment with equity and full-time ownership of the product. A fractional CTO gives you senior judgment for a few hours a week, paid monthly, while you decide whether and when to bring in a full-time technical leader.",
      },
      {
        question: "Do you also write code?",
        answer:
          "When it helps — a proof of concept, a critical fix, or setting up the architecture the team will build on. For larger builds, hands-on development can be scoped separately.",
      },
      {
        question: "Can you help us hire engineers?",
        answer:
          "Yes. Defining the role, designing and running technical interviews, and planning onboarding for the first hires are all part of the work.",
      },
      {
        question: "How many hours a week does it take?",
        answer:
          "Usually a few hours a week — a regular call plus asynchronous reviews and questions. It flexes up around big decisions or hiring rounds.",
      },
    ],
  },
];

export const ALL_LANDINGS = [...LOCAL_LANDINGS, ...NATIONAL_LANDINGS];

export function findLanding(slug) {
  return ALL_LANDINGS.find((landing) => landing.slug === slug);
}

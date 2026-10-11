export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  deliverables: string[];
  process: { title: string; desc: string }[];
  outcomes: { value: string; label: string }[];
};

export const services: Service[] = [
  {
    slug: "web",
    title: "Websites",
    tagline: "Websites that work",
    description:
      "Websites that help people understand your business and take the next step.",
    longDescription:
      "A website isn't a brochure — it's the front door of your business. We design and build sites that explain what you do, earn trust quickly, and make it easy for the right people to get in touch.",
    deliverables: [
      "Strategy & sitemap",
      "Wireframes and design",
      "Responsive development",
      "CMS setup",
      "Analytics & tracking",
      "Launch support",
    ],
    process: [
      {
        title: "Discovery",
        desc: "We map your business, audience and goals before touching a design.",
      },
      {
        title: "Design",
        desc: "Wireframes first, then a polished visual system that matches your brand.",
      },
      {
        title: "Build",
        desc: "Clean, fast, accessible front-end. Content management you'll actually use.",
      },
      {
        title: "Launch",
        desc: "QA, testing, analytics, and a handover doc so you're not stuck.",
      },
    ],
    outcomes: [
      { value: "+42%", label: "Enquiries" },
      { value: "1.8s", label: "Load time" },
      { value: "+28%", label: "Conversion" },
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    tagline: "Look as serious as you are",
    description:
      "A visual identity that makes your business look as serious as it is.",
    longDescription:
      "Your brand is what people remember about you. We build visual systems that make small teams look established and give growing businesses a consistent identity across every touchpoint.",
    deliverables: [
      "Brand audit",
      "Logo & mark",
      "Typography system",
      "Colour palette",
      "Brand guidelines",
      "Asset kit",
    ],
    process: [
      { title: "Research", desc: "Positioning, competitors, and where you fit." },
      { title: "Direction", desc: "Two or three distinct visual territories." },
      { title: "Refinement", desc: "Logo, type, colour, layout — tested in context." },
      { title: "Handover", desc: "Guidelines and files your team can actually use." },
    ],
    outcomes: [
      { value: "2 wks", label: "Core identity" },
      { value: "1 doc", label: "Brand guidelines" },
      { value: "All", label: "Formats included" },
    ],
  },
  {
    slug: "marketing",
    title: "Marketing",
    tagline: "Get seen by the right people",
    description: "Ways to put your business in front of the right people.",
    longDescription:
      "Marketing isn't about being everywhere — it's about being in the right place at the right moment. We build channels that fit your business and produce results you can measure.",
    deliverables: [
      "Channel strategy",
      "Content plan",
      "Paid campaigns",
      "Email flows",
      "Reporting dashboards",
      "Ongoing optimisation",
    ],
    process: [
      { title: "Audit", desc: "What's working, what's not, and where the opportunity is." },
      { title: "Plan", desc: "Channels, budget and expectations set clearly." },
      { title: "Launch", desc: "Campaigns, content and flows built and shipped." },
      { title: "Optimise", desc: "Weekly learnings, monthly reporting." },
    ],
    outcomes: [
      { value: "4x", label: "Return on ad spend" },
      { value: "-38%", label: "Cost per lead" },
      { value: "+62%", label: "Repeat visits" },
    ],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    tagline: "From attention to enquiry",
    description: "A better path from attention to enquiry.",
    longDescription:
      "Getting traffic is easy. Turning it into enquiries is the hard part. We design the path from first visit to booked call, then remove everything that gets in the way.",
    deliverables: [
      "Conversion audit",
      "Landing pages",
      "Lead magnets",
      "Form & CRM setup",
      "Nurture sequences",
      "Reporting",
    ],
    process: [
      { title: "Map", desc: "Follow the journey from first touch to sale." },
      { title: "Design", desc: "Landing pages and forms that respect the visitor." },
      { title: "Wire", desc: "CRM, notifications, follow-up — automated." },
      { title: "Measure", desc: "Know exactly where enquiries come from." },
    ],
    outcomes: [
      { value: "+42%", label: "Enquiries" },
      { value: "2.1%", label: "Enquiry rate" },
      { value: "-54%", label: "Response time" },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    tagline: "From discovery to checkout",
    description:
      "A complete experience from product discovery to checkout.",
    longDescription:
      "Selling online is more than a storefront. We build the full loop — product pages, checkout, post-purchase — so customers come back and average order value goes up.",
    deliverables: [
      "Store setup",
      "Product & category pages",
      "Checkout optimisation",
      "Payment & shipping",
      "Email flows",
      "Analytics",
    ],
    process: [
      { title: "Setup", desc: "Platform choice and configuration." },
      { title: "Design", desc: "Product and category pages that sell." },
      { title: "Optimise", desc: "Checkout flow, upsells, cart recovery." },
      { title: "Scale", desc: "Campaigns, retention flows, reporting." },
    ],
    outcomes: [
      { value: "+31%", label: "Orders" },
      { value: "+18%", label: "AOV" },
      { value: "-22%", label: "Cart abandonment" },
    ],
  },
  {
    slug: "video",
    title: "Video",
    tagline: "Motion that moves people",
    description: "Video content built for real business goals.",
    longDescription:
      "Video gets attention. We make sure it also does a job — whether that's explaining a service, showing a product, or building trust before the first call.",
    deliverables: [
      "Concept & script",
      "Storyboard",
      "Filming or motion",
      "Editing & sound",
      "Formats for every channel",
      "Distribution plan",
    ],
    process: [
      { title: "Brief", desc: "What's the video for, and who's watching?" },
      { title: "Script", desc: "Story, structure, and the shots that matter." },
      { title: "Produce", desc: "Film or motion — depending on what fits." },
      { title: "Deliver", desc: "Cut for every channel you actually use." },
    ],
    outcomes: [
      { value: "3.5x", label: "Watch-through" },
      { value: "+47%", label: "Time on site" },
      { value: "All", label: "Channel cuts" },
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    tagline: "Answers that earn attention",
    description:
      "Useful content that answers the questions your customers actually have.",
    longDescription:
      "Content is how you show you understand your customers before you ever speak to them. We build a content engine that answers real questions and earns search traffic over time.",
    deliverables: [
      "Keyword & topic research",
      "Editorial calendar",
      "Written content",
      "SEO structure",
      "Distribution",
      "Performance tracking",
    ],
    process: [
      { title: "Research", desc: "What your customers actually search for." },
      { title: "Plan", desc: "A calendar you can keep up with." },
      { title: "Write", desc: "Content that sounds like you and ranks." },
      { title: "Distribute", desc: "Search, email, social — everywhere it fits." },
    ],
    outcomes: [
      { value: "5x", label: "Organic traffic" },
      { value: "Top 3", label: "Keyword rankings" },
      { value: "+38%", label: "Return visits" },
    ],
  },
  {
    slug: "custom-systems",
    title: "Custom Systems",
    tagline: "Tools built around you",
    description:
      "Digital tools built around the way your business works.",
    longDescription:
      "Off-the-shelf software makes you change how you work. Custom systems let you keep your process and remove the parts that waste time — dashboards, portals, internal tools, integrations.",
    deliverables: [
      "Process mapping",
      "System design",
      "Development",
      "Integrations",
      "Training",
      "Support",
    ],
    process: [
      { title: "Map", desc: "Understand the process before building anything." },
      { title: "Design", desc: "Simplify before you automate." },
      { title: "Build", desc: "Ship in stages so you see progress." },
      { title: "Iterate", desc: "Refine based on real use." },
    ],
    outcomes: [
      { value: "-60%", label: "Manual work" },
      { value: "Real-time", label: "Reporting" },
      { value: "1", label: "Source of truth" },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
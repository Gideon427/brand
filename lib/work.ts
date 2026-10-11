export type Project = {
  slug: string;
  client: string;
  title: string;
  category: string;
  summary: string;
  year: string;
  services: string[];
  coverGradient: string;
  outcomes: { value: string; label: string }[];
  challenge: string;
  approach: string;
  result: string;
  quote?: { text: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "north-and-co",
    client: "North & Co.",
    title: "Advice you can act on",
    category: "Professional Services",
    summary:
      "A clearer online presence for a growing professional business.",
    year: "2025",
    services: ["Website", "Lead Generation"],
    coverGradient: "from-primary/20 to-primary/5",
    outcomes: [
      { value: "+42%", label: "Enquiries" },
      { value: "+28%", label: "Conversion" },
      { value: "1.8s", label: "Load time" },
    ],
    challenge:
      "North & Co. had strong service delivery but a website that created friction before every enquiry. Visitors couldn't quickly understand the offer, and the form asked for too much too soon.",
    approach:
      "We rebuilt the site around a single clear promise, restructured the service pages, and reworked the enquiry flow into a two-step process with a fast first step.",
    result:
      "Within three months, qualified enquiries rose 42% and conversion improved 28%. The site now loads in under two seconds and works cleanly on mobile.",
    quote: {
      text: "Brandoria didn't just give us a new website. They helped us understand what our business actually needed.",
      author: "Elena Marlowe",
      role: "Director, North & Co.",
    },
  },
  {
    slug: "aurelia",
    client: "Aurelia",
    title: "A brand that earns trust",
    category: "Branding",
    summary:
      "A complete visual identity for a growing consultancy.",
    year: "2025",
    services: ["Branding", "Website"],
    coverGradient: "from-orange-200/40 to-primary/10",
    outcomes: [
      { value: "2 wks", label: "Core identity" },
      { value: "+38%", label: "Return visits" },
      { value: "1 doc", label: "Guidelines" },
    ],
    challenge:
      "Aurelia was competing for high-value consulting work but looking like a startup. The brand didn't match the quality of the work.",
    approach:
      "We built a restrained visual system — typography-led, with a warm accent and consistent layouts — then applied it across the site and pitch decks.",
    result:
      "Aurelia now presents with the same confidence as firms twice their size. Return visits are up 38% and inbound qualified leads have roughly doubled.",
  },
  {
    slug: "mira",
    client: "Mira",
    title: "From discovery to checkout",
    category: "E-commerce",
    summary:
      "A full storefront rebuild focused on conversion.",
    year: "2025",
    services: ["Ecommerce", "Marketing"],
    coverGradient: "from-amber-200/40 to-primary/10",
    outcomes: [
      { value: "+31%", label: "Orders" },
      { value: "+18%", label: "AOV" },
      { value: "-22%", label: "Cart abandonment" },
    ],
    challenge:
      "Mira had traffic but a checkout that leaked customers at every step. Mobile in particular was losing almost half of the carts.",
    approach:
      "We rebuilt the product and checkout experience from scratch, reduced the number of steps, and added cart recovery emails.",
    result:
      "Orders rose 31%, average order value climbed 18%, and cart abandonment fell by 22% in the first quarter after launch.",
  },
  {
    slug: "atlas",
    client: "Atlas",
    title: "Getting found by the right people",
    category: "Content Marketing",
    summary:
      "A content engine that earns search traffic.",
    year: "2025",
    services: ["Content Marketing", "Lead Generation"],
    coverGradient: "from-primary/20 to-amber-200/20",
    outcomes: [
      { value: "5x", label: "Organic traffic" },
      { value: "Top 3", label: "Keyword ranks" },
      { value: "+62%", label: "Repeat visits" },
    ],
    challenge:
      "Atlas had strong expertise but no content, so every new customer had to come from paid ads.",
    approach:
      "We built a topic map based on real customer questions, then shipped a regular content cadence with clean SEO structure.",
    result:
      "Organic traffic grew five-fold in twelve months. Atlas now ranks in the top three for its core keywords and repeat visits are up 62%.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
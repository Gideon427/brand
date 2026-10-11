export type Resource = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  body: string[];
};

export const resources: Resource[] = [
  {
    slug: "what-should-your-website-actually-do",
    category: "Websites",
    title: "What should your website actually do?",
    excerpt:
      "A website that just looks good isn't doing its job. Here's what to measure instead.",
    readTime: "5 min read",
    date: "Oct 2025",
    author: "Sofia",
    authorRole: "Web Designer",
    body: [
      "Most website conversations start with design. They should start with purpose.",
      "A website has one job: help the right person take the next step. Everything else — the colours, the type, the animations — exists to support that.",
      "Start by asking what the next step is. Is it an enquiry? A purchase? A booking? Once you know, you can measure whether the site is working.",
      "The three numbers that matter most: how many people arrive, how many take action, and how much each action is worth. Track those before you redesign anything.",
      "If a website isn't improving one of those numbers, it's decoration.",
    ],
  },
  {
    slug: "the-numbers-behind-growing-a-business",
    category: "Growth",
    title: "The numbers behind growing a business",
    excerpt:
      "Growth comes down to four simple things. Here's how they fit together.",
    readTime: "4 min read",
    date: "Oct 2025",
    author: "Alex",
    authorRole: "Developer",
    body: [
      "Business growth is rarely complicated. It's just not always easy.",
      "Four numbers drive almost every growing business: how many people see you, how many buy, how much each buyer is worth, and how often they come back.",
      "Improve any one of those and revenue goes up. Improve two and it compounds.",
      "The trap is trying to improve all four at once. Pick the one with the biggest gap and move it first.",
      "Measure monthly. Review quarterly. Ignore vanity metrics.",
    ],
  },
  {
    slug: "how-to-know-what-your-business-should-fix-first",
    category: "Strategy",
    title: "How to know what your business should fix first",
    excerpt:
      "When everything feels urgent, nothing gets done. Here's a simple way to prioritise.",
    readTime: "5 min read",
    date: "Oct 2025",
    author: "Leo",
    authorRole: "Video & Motion",
    body: [
      "Every business has a list of things it should fix. Most lists are too long to act on.",
      "Start by listing what's actually broken. Not what could be better — what's costing you money today.",
      "Then rank each one by two things: how much it costs you right now, and how easy it is to fix.",
      "The ones that score high on both go first. The ones that score low on both go last.",
      "You'll be surprised how often the biggest, hardest problem isn't the one to fix first.",
    ],
  },
  {
    slug: "content-that-earns-attention",
    category: "Content",
    title: "Content that earns attention",
    excerpt:
      "The best content answers a question someone is already asking.",
    readTime: "3 min read",
    date: "Oct 2025",
    author: "Maya",
    authorRole: "Content",
    body: [
      "Content doesn't create demand. It captures it.",
      "The best content answers a question your customer is already typing into a search box. Not one you wish they were asking.",
      "Write down ten questions customers ask you on every sales call. Those are your first ten articles.",
      "Then answer them properly. No fluff, no padding, no 'in today's fast-paced world'.",
      "Publish, measure, repeat.",
    ],
  },
  {
    slug: "lead-generation-without-the-spam",
    category: "Lead Generation",
    title: "Lead generation without the spam",
    excerpt:
      "You don't need more leads. You need better ones.",
    readTime: "4 min read",
    date: "Oct 2025",
    author: "Daniel",
    authorRole: "Developer",
    body: [
      "More leads isn't the answer. Better leads is.",
      "A form that asks for ten fields gets fewer fills than one that asks for two. But it also gets fewer bad fits.",
      "The goal is to qualify, not to maximise. A form that filters out the wrong people is doing its job.",
      "Follow-up matters more than the form. Most leads go cold because nobody replied quickly enough.",
      "Automate the acknowledgement, personalise the follow-up.",
    ],
  },
  {
    slug: "why-custom-systems-beat-off-the-shelf",
    category: "Systems",
    title: "Why custom systems beat off-the-shelf",
    excerpt:
      "Software should fit your business. Not the other way around.",
    readTime: "4 min read",
    date: "Oct 2025",
    author: "Sofia",
    authorRole: "Web Designer",
    body: [
      "Off-the-shelf software makes you change how you work. Custom systems let you keep your process.",
      "That doesn't mean building everything from scratch. It means buying the pieces that fit and building the ones that don't.",
      "Start by mapping the process. Where does information come in, where does it go, and where does it get stuck?",
      "The stuck points are usually where a small custom tool pays for itself.",
      "Build the smallest thing that removes the worst bottleneck. Then measure.",
    ],
  },
];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
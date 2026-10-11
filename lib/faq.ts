export type FaqCategory = {
  title: string;
  items: { q: string; a: string }[];
};

export const faqCategories: FaqCategory[] = [
  {
    title: "Working with Brandoria",
    items: [
      {
        q: "What does Brandoria do?",
        a: "We build the websites, brands, content and digital systems businesses need to grow. Our work spans strategy, design, development and ongoing marketing.",
      },
      {
        q: "Who do you work with?",
        a: "Growing businesses with a clear product or service and a real need to improve how they show up online. Most of our clients are small to mid-sized companies in professional services, ecommerce and B2B.",
      },
      {
        q: "Can I buy just one service?",
        a: "Yes. Many clients start with a single service — often a website or a growth audit — and expand from there. You don't need to commit to everything at once.",
      },
    ],
  },
  {
    title: "Business Growth Audit",
    items: [
      {
        q: "What is the audit?",
        a: "A structured review of your business across eight areas: business, customers, products, revenue, acquisition, digital presence, operations and goals. You get a written report and a prioritised list of what to focus on next.",
      },
      {
        q: "What information do I provide?",
        a: "Basic information about your business, customers, current marketing and what you're trying to achieve. It takes about 15 minutes to complete the initial form.",
      },
      {
        q: "What do I receive?",
        a: "A written report covering your current position, opportunities and a prioritised set of recommendations. No obligation to work with us afterwards.",
      },
      {
        q: "Do I have to hire Brandoria afterward?",
        a: "No. The audit is standalone. If you want help implementing the recommendations, we're happy to help — but you're free to take the report and run with it yourself.",
      },
    ],
  },
  {
    title: "Starting a project",
    items: [
      {
        q: "How do I start?",
        a: "Submit a project brief through the Start a Project form. We'll review it and get back to you within two business days with next steps.",
      },
      {
        q: "Do I need a phone call?",
        a: "Not necessarily. Many projects start entirely through written briefs. If a call would help, we'll suggest one — but it's never a requirement.",
      },
      {
        q: "What happens after I submit a request?",
        a: "We review the brief, ask any clarifying questions, and send back a proposal with scope, timeline and cost. You decide whether to move forward.",
      },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        q: "How do revisions work?",
        a: "Each milestone includes a defined number of revision rounds. We agree the number upfront so there are no surprises on either side.",
      },
      {
        q: "How do approvals work?",
        a: "You review work through your client dashboard. You can approve, request changes, or leave comments — all in one place. Nothing moves forward without your sign-off.",
      },
      {
        q: "How do I communicate with the team?",
        a: "Through the messages section of your client dashboard. No lost email threads. Everything stays attached to the project.",
      },
    ],
  },
];
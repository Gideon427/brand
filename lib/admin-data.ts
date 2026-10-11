export type AdminProject = {
  id: string;
  client: string;
  title: string;
  status: "discovery" | "design" | "development" | "review" | "delivery";
  progress: number;
  dueDate: string;
  services: string[];
  tasks: { name: string; owner: string }[];
};

export type AdminTask = {
  id: string;
  title: string;
  project: string;
  owner: string;
  due: string;
  status: "todo" | "in-progress" | "review";
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
  tasks: number;
  color: string;
};

export type Client = {
  id: string;
  name: string;
  industry: string;
  location: string;
  projects: number;
  status: "active" | "paused" | "onboarding";
};

export type Audit = {
  id: string;
  client: string;
  industry: string;
  location: string;
  monthlyRevenue: string;
  targetRevenue: string;
  progress: number;
  areasComplete: number;
  areasTotal: number;
  status: "new" | "in-review" | "complete";
  notes: string;
};

export type ReportItem = {
  rank: string;
  title: string;
  priority: "high" | "medium" | "low";
  description: string;
};

// -------- Projects --------
export const adminProjects: AdminProject[] = [
  {
    id: "north-co-website",
    client: "North & Co.",
    title: "Website Design & Development",
    status: "development",
    progress: 72,
    dueDate: "18 Oct",
    services: ["Website", "Lead Generation"],
    tasks: [
      { name: "Homepage development", owner: "Alex" },
      { name: "Mobile optimisation", owner: "Sofia" },
      { name: "Content integration", owner: "Daniel" },
    ],
  },
  {
    id: "aurelia-branding",
    client: "Aurelia",
    title: "Brand Identity System",
    status: "design",
    progress: 48,
    dueDate: "30 Oct",
    services: ["Branding"],
    tasks: [
      { name: "Logo refinement", owner: "Sofia" },
      { name: "Brand guidelines draft", owner: "Maya" },
    ],
  },
  {
    id: "mira-ecommerce",
    client: "Mira",
    title: "E-commerce Storefront Rebuild",
    status: "review",
    progress: 89,
    dueDate: "22 Oct",
    services: ["Ecommerce", "Marketing"],
    tasks: [
      { name: "Final QA", owner: "Daniel" },
      { name: "Checkout flow review", owner: "Alex" },
    ],
  },
  {
    id: "atlas-content",
    client: "Atlas",
    title: "Content Engine Setup",
    status: "discovery",
    progress: 20,
    dueDate: "15 Nov",
    services: ["Content Marketing", "Lead Generation"],
    tasks: [
      { name: "Topic map", owner: "Maya" },
      { name: "SEO structure plan", owner: "Leo" },
    ],
  },
];

// -------- Tasks --------
export const adminTasks: AdminTask[] = [
  { id: "t1", title: "Homepage copy", project: "North & Co.", owner: "Maya", due: "Oct 8", status: "todo" },
  { id: "t2", title: "Client research", project: "Atlas", owner: "Leo", due: "Oct 9", status: "todo" },
  { id: "t3", title: "Social campaign concept", project: "Aurelia", owner: "Sofia", due: "Oct 10", status: "todo" },
  { id: "t4", title: "Homepage development", project: "North & Co.", owner: "Alex", due: "Oct 7", status: "in-progress" },
  { id: "t5", title: "Brand presentation", project: "Aurelia", owner: "Sofia", due: "Oct 9", status: "in-progress" },
  { id: "t6", title: "E-commerce product page", project: "Mira", owner: "Daniel", due: "Oct 8", status: "review" },
  { id: "t7", title: "Client proposal", project: "Atlas", owner: "Alex", due: "Oct 6", status: "review" },
];

// -------- Team --------
export const teamMembers: TeamMember[] = [
  { id: "m1", name: "Sofia", role: "Web Designer", initials: "S", tasks: 3, color: "bg-orange-500" },
  { id: "m2", name: "Daniel", role: "Developer", initials: "D", tasks: 5, color: "bg-blue-600" },
  { id: "m3", name: "Maya", role: "Content", initials: "M", tasks: 4, color: "bg-purple-600" },
  { id: "m4", name: "Leo", role: "Video & Motion", initials: "L", tasks: 2, color: "bg-green-700" },
];

// -------- Clients --------
export const clients: Client[] = [
  { id: "c1", name: "North & Co.", industry: "Professional Services", location: "United Kingdom", projects: 1, status: "active" },
  { id: "c2", name: "Aurelia", industry: "Consulting", location: "United Kingdom", projects: 1, status: "active" },
  { id: "c3", name: "Mira", industry: "E-commerce", location: "United Kingdom", projects: 1, status: "active" },
  { id: "c4", name: "Atlas", industry: "B2B SaaS", location: "Ireland", projects: 1, status: "onboarding" },
  { id: "c5", name: "Lumen & Co.", industry: "Retail", location: "United Kingdom", projects: 0, status: "paused" },
];

// -------- Audits --------
export const audits: Audit[] = [
  {
    id: "north-co-audit",
    client: "North & Co.",
    industry: "Professional Services",
    location: "United Kingdom",
    monthlyRevenue: "$18,000",
    targetRevenue: "$40,000",
    progress: 68,
    areasComplete: 5,
    areasTotal: 8,
    status: "in-review",
    notes: "Strong service offer. Website currently creates friction before enquiry.",
  },
  {
    id: "atlas-audit",
    client: "Atlas",
    industry: "B2B SaaS",
    location: "Ireland",
    monthlyRevenue: "$42,000",
    targetRevenue: "$80,000",
    progress: 40,
    areasComplete: 3,
    areasTotal: 8,
    status: "new",
    notes: "Traffic is there but conversion path is unclear.",
  },
];

// -------- Reports --------
export const impactItems: ReportItem[] = [
  { rank: "01", title: "Website", priority: "high", description: "Build a clearer website that explains the offer and makes enquiries easier." },
  { rank: "02", title: "Lead Generation", priority: "high", description: "Create a stronger path from visitor to enquiry." },
  { rank: "03", title: "Content", priority: "medium", description: "Create useful content that answers common customer questions." },
  { rank: "04", title: "Digital Presence", priority: "medium", description: "Improve consistency across every channel you appear on." },
];

export const qaChecks = [
  { label: "Mobile layout", passed: true },
  { label: "Desktop layout", passed: true },
  { label: "Navigation", passed: true },
  { label: "Forms", passed: true },
  { label: "Links", passed: true },
  { label: "Content", passed: true },
  { label: "Speed", passed: false },
  { label: "Final polish", passed: false },
];

export function getAdminProject(id: string) {
  return adminProjects.find((p) => p.id === id);
}

export function getAudit(id: string) {
  return audits.find((a) => a.id === id);
}
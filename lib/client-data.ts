export type ClientProject = {
  id: string;
  title: string;
  progress: number;
  currentStage: string;
  nextAction: string;
  dueDate: string;
  milestones: {
    name: string;
    status: "complete" | "in-progress" | "upcoming";
  }[];
  tasks: { name: string; done: boolean }[];
};

export type Message = {
  id: string;
  from: "team" | "client";
  author: string;
  body: string;
  time: string;
};

export type ClientFile = {
  id: string;
  name: string;
  type: "PDF" | "FIG" | "DOC" | "IMG";
  size: string;
  updated: string;
};

export const clientProject: ClientProject = {
  id: "north-co-website",
  title: "North & Co. Website",
  progress: 72,
  currentStage: "Homepage Review",
  nextAction: "Review your new homepage",
  dueDate: "18 Oct",
  milestones: [
    { name: "Design", status: "complete" },
    { name: "Development", status: "in-progress" },
    { name: "Launch", status: "upcoming" },
  ],
  tasks: [
    { name: "Website structure", done: true },
    { name: "Homepage design", done: true },
    { name: "Mobile design", done: true },
    { name: "Website development", done: false },
    { name: "Content upload", done: false },
    { name: "Final review", done: false },
  ],
};

export const clientMessages: Message[] = [
  {
    id: "m1",
    from: "team",
    author: "Brandoria Team",
    body: "We've uploaded the latest homepage design. We'd love to hear what you think.",
    time: "8:12 AM",
  },
  {
    id: "m2",
    from: "client",
    author: "Emma Carter",
    body: "This looks great. I'd like to change the wording on the main button.",
    time: "9:20 AM",
  },
  {
    id: "m3",
    from: "team",
    author: "Brandoria Team",
    body: "Absolutely. We'll make that adjustment and send the updated version for approval.",
    time: "9:24 AM",
  },
];

export const clientFiles: ClientFile[] = [
  { id: "f1", name: "Business Growth Audit", type: "PDF", size: "2.4 MB", updated: "Today" },
  { id: "f2", name: "Brand Guidelines", type: "PDF", size: "8.1 MB", updated: "Yesterday" },
  { id: "f3", name: "Homepage Design", type: "FIG", size: "12.3 MB", updated: "Yesterday" },
  { id: "f4", name: "Logo Package", type: "IMG", size: "3.8 MB", updated: "3 days ago" },
  { id: "f5", name: "Content Draft", type: "DOC", size: "180 KB", updated: "5 days ago" },
  { id: "f6", name: "Discovery Notes", type: "DOC", size: "94 KB", updated: "1 week ago" },
];

export const recentActivity = [
  { id: "a1", label: "Homepage design uploaded", time: "Today" },
  { id: "a2", label: "Brand assets approved", time: "Yesterday" },
  { id: "a3", label: "Project started", time: "3 days ago" },
];

export const invoice = {
  number: "INV-0042",
  amount: "$1,500",
  dueDate: "18 Oct",
  status: "Due" as const,
};

export const billingHistory = [
  { id: "b1", number: "INV-0041", amount: "$1,500", paid: "12 Sep", status: "Paid" },
  { id: "b2", number: "INV-0040", amount: "$2,500", paid: "14 Aug", status: "Paid" },
  { id: "b3", number: "INV-0039", amount: "$2,500", paid: "10 Jul", status: "Paid" },
];
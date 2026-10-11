export type Role = "admin" | "client";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  company?: string;
};

export const demoUsers: DemoUser[] = [
  {
    id: "u_admin_1",
    name: "Alex Morgan",
    email: "admin@brandoria.co",
    password: "admin",
    role: "admin",
  },
  {
    id: "u_client_1",
    name: "Emma Carter",
    email: "emma@north.co",
    password: "client",
    role: "client",
    company: "North & Co.",
  },
];

export function findUser(email: string, password: string) {
  return demoUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
}
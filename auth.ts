import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUser } from "@/lib/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = findUser(email, password);
        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;

      return {
        ...token,
        id: String(user.id),
        role: user.role as "admin" | "client",
      };
    },
    async session({ session, token }) {
      const jwtToken = token as { id?: string; role?: "admin" | "client" };

      if (session.user) {
        const userSession = session.user as typeof session.user & {
          id?: string;
          role?: "admin" | "client";
        };

        userSession.id = jwtToken.id ?? "";
        userSession.role = jwtToken.role ?? "client";
      }

      return session;
    },
  },
});
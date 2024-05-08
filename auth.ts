import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismadb } from "@/lib/prismadb";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { getUserByEmail } from "./server/controllers/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismadb),

  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") {
        return true;
      }

      /**
       * Credential Login must have email verified
       */
      const existingUser = await getUserByEmail(user?.email as string);
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },

    jwt: async ({ token }) => {
      const existingUser = await getUserByEmail(token?.email as string);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser?.id;

      return token;
    },

    session: ({ session, token }) => {
      return session;
    },
  },

  // Use JWT as session startegy coz the database and adapter must be compatible with EDGE
  session: { strategy: "jwt" },

  // Separated providers in authconfig coz some webAPIs is not supported in Edge required for Adapters like Prisma
  ...authConfig,
});

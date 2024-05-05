import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismadb } from "@/lib/prismadb";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismadb),

  // Use JWT as session startegy coz the database and adapter must be compatible with EDGE
  session: { strategy: "jwt" },

  // Separated providers in authconfig coz some webAPIs is not supported in Edge required for Adapters like Prisma
  ...authConfig,
});

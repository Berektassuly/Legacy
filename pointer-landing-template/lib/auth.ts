import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createHash } from "crypto";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const [user] = await db.select().from(users).where(eq(users.email, creds.email));
        if (!user?.hashedPassword) return null;
        const hashed = createHash("sha256").update(creds.password).digest("hex");
        return hashed === user.hashedPassword
          ? {
              id: user.id,
              name: user.name ?? undefined,
              email: user.email,
              image: user.image ?? undefined,
              isCompany: user.isCompany ?? undefined,
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        const existing = await db.select().from(users).where(eq(users.email, user.email));
        if (existing.length === 0) {
          await db.insert(users).values({ email: user.email, name: user.name ?? null, isCompany: false });
        }
      }
      return true;
    },
  },
};

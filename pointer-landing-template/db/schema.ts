import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  hashedPassword: text("hashed_password"),
  createdAt: timestamp("created_at").defaultNow(),
  isAdmin: boolean("is_admin").default(false),
  isCompany: boolean("is_company").default(false),
});

export const accounts = pgTable("accounts", {
  // OAuth provider fields placeholder
});

export const sessions = pgTable("sessions", {
  // session store placeholder
});

export const verificationTokens = pgTable("verification_tokens", {
  // magic link/email placeholders
});

import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }
  const hashedPassword = createHash("sha256").update(password).digest("hex");
  await db.insert(users).values({ email, name: name ?? null, hashedPassword });
  return NextResponse.json({ success: true });
}

import { NextResponse, NextRequest} from "next/server";
import { createHash } from "crypto";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try{
    const { email, password, name, isCompany } = await req.json();
    
    console.log(email, password, name, isCompany);

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }
    const hashedPassword = createHash("sha256").update(password).digest("hex");
    const res = await db
      .insert(users)
      .values({ email, name: name ?? null, hashedPassword, isCompany: !!isCompany });
    console.log(" ")
    console.log(res)

    return NextResponse.json({ success: true });
  }catch(err){
    return NextResponse.json({success:false, error:err});
  }

}

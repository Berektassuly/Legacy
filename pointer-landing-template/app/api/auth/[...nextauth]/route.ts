import { handlers } from "@/app/auth.config"
import { rateLimit } from "@/lib/rate-limit"

export const GET = handlers.GET

export async function POST(req: Request, ctx: any) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!rateLimit(ip)) {
    return new Response("Too Many Requests", { status: 429 })
  }
  return handlers.POST(req, ctx)
}

import { auth } from "@/app/auth.config"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isAuthed = !!req.auth
  const isDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isIssuer = nextUrl.pathname.startsWith("/issuer")

  if (isDashboard && !isAuthed) {
    const url = new URL("/login", req.url)
    url.searchParams.set("next", nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  if (isIssuer && (!isAuthed || (req.auth as any).role === "user")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/issuer/:path*"]
}

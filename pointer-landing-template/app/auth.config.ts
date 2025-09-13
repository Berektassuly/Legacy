import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        console.log("[DEV] Magic link for", identifier, url)
      }
    }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true })
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, user }) {
      const membership = await prisma.membership.findFirst({
        where: { userId: user.id, role: { in: ["brandAdmin", "issuer"] } }
      })
      ;(session as any).role = membership?.role ?? "user"
      ;(session as any).userId = user.id
      return session
    },
    async signIn({ user, request }) {
      const form = request?.body
      const representsOrg = form?.get?.("representsOrg") === "true"
      ;(user as any).representsOrg = representsOrg

      const existing = await prisma.profile.findUnique({ where: { userId: user.id } })
      if (!existing) {
        await prisma.profile.create({ data: { userId: user.id, verificationLevel: "none" } })
      }

      if (user.email) {
        const domain = user.email.split("@")[1]?.toLowerCase()
        if (domain) {
          let brand = await prisma.brand.findUnique({ where: { domain } })
          if (!brand && representsOrg) {
            brand = await prisma.brand.create({ data: { name: domain, domain, status: "unverified" } })
            const profile = await prisma.profile.findUnique({ where: { userId: user.id } })
            if (profile && brand) {
              await prisma.membership.upsert({
                where: { profileId_brandId: { profileId: profile.id, brandId: brand.id } },
                update: { role: "brandAdmin" },
                create: {
                  role: "brandAdmin",
                  userId: user.id,
                  profileId: profile.id,
                  brandId: brand.id
                }
              })
              await prisma.profile.update({
                where: { id: profile.id },
                data: { primaryBrandId: brand.id }
              })
            }
          } else if (brand) {
            const profile = await prisma.profile.findUnique({ where: { userId: user.id } })
            if (profile) {
              await prisma.membership.upsert({
                where: { profileId_brandId: { profileId: profile.id, brandId: brand.id } },
                update: {},
                create: { role: "user", userId: user.id, profileId: profile.id, brandId: brand.id }
              })
              await prisma.profile.update({
                where: { id: profile.id },
                data: { primaryBrandId: brand.id }
              })
            }
          }
        }
      }
      return true
    }
  }
})

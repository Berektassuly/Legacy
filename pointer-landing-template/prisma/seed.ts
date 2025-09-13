import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const brand = await prisma.brand.upsert({
    where: { domain: "example.com" },
    update: {},
    create: { name: "example.com", domain: "example.com", status: "unverified" }
  })

  const user = await prisma.user.upsert({
    where: { email: "demo@legacy.local" },
    update: {},
    create: { email: "demo@legacy.local", displayName: "Demo User" }
  })

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: { primaryBrandId: brand.id },
    create: { userId: user.id, primaryBrandId: brand.id }
  })

  await prisma.membership.upsert({
    where: { profileId_brandId: { profileId: profile.id, brandId: brand.id } },
    update: {},
    create: { userId: user.id, profileId: profile.id, brandId: brand.id, role: "user" }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

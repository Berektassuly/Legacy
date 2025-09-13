import { auth } from "@/app/auth.config"

export default async function DashboardPage() {
  const session = await auth()
  return (
    <div className="p-8 space-y-2">
      <h1 className="text-2xl font-bold">Welcome{session?.user?.email ? `, ${session.user.email}` : ""}</h1>
      <p className="text-muted-foreground">You are logged in.</p>
      {(session as any)?.role === "brandAdmin" && (
        <p className="text-sm">Brand admin access granted.</p>
      )}
    </div>
  )
}

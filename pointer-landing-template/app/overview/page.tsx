import Link from 'next/link'

export default function OverviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="flex flex-col gap-2">
        <Link href="/overview/dashboard" className="underline">
          Dashboard
        </Link>
        <Link href="/overview/analytics" className="underline">
          Analytics
        </Link>
        <Link href="/overview/organization" className="underline">
          Organization
        </Link>
        <Link href="/overview/projects" className="underline">
          Projects
        </Link>
      </div>
    </div>
  )
}

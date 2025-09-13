import type { ReactNode } from 'react'
import Layout from '@/components/kokonutui/layout'

export default function OverviewLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>
}

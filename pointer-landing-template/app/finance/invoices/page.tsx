import Layout from "@/components/kokonutui/layout"
import InvoicesTable from "@/components/finance/invoices-table"

export default function InvoicesPage() {
  return (
    <Layout>
      <h1 className="mb-4 text-xl font-semibold text-gray-100">Invoices</h1>
      <InvoicesTable />
    </Layout>
  )
}

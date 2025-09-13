import Layout from "@/components/kokonutui/layout"
import PaymentsTable from "@/components/finance/payments-table"

export default function PaymentsPage() {
  return (
    <Layout>
      <h1 className="mb-4 text-xl font-semibold text-gray-100">Payments</h1>
      <PaymentsTable />
    </Layout>
  )
}

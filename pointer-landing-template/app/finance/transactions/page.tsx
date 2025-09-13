import Layout from "@/components/kokonutui/layout"
import TransactionsTable from "@/components/finance/transactions-table"

export default function TransactionsPage() {
  return (
    <Layout>
      <h1 className="mb-4 text-xl font-semibold text-gray-100">Transactions</h1>
      <TransactionsTable />
    </Layout>
  )
}

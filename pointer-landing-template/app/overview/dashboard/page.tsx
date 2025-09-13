import { readData } from '@/lib/fs-db'
import { Invoice, Payment, Transaction } from '@/lib/types'

export default async function OverviewDashboardPage() {
  const [invoices, payments, transactions] = await Promise.all([
    readData<Invoice>('invoices.json'),
    readData<Payment>('payments.json'),
    readData<Transaction>('transactions.json'),
  ])

  const walletsLinked = transactions.filter(t => t.type === 'WALLET_LINKED').length
  const sbtMinted = transactions.filter(t => t.type === 'SBT_MINTED').length
  const invoicesCreated = invoices.length
  const invoicesPaid = payments.length
  const revenueDistributed = transactions
    .filter(t => t.type === 'REVENUE_DISTRIBUTED')
    .reduce((sum, t) => sum + (t.amount ?? 0), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#1F1F23] rounded">
          <div className="text-sm text-gray-400">Wallets linked</div>
          <div className="text-2xl font-semibold">{walletsLinked}</div>
        </div>
        <div className="p-4 bg-[#1F1F23] rounded">
          <div className="text-sm text-gray-400">SBT minted</div>
          <div className="text-2xl font-semibold">{sbtMinted}</div>
        </div>
        <div className="p-4 bg-[#1F1F23] rounded">
          <div className="text-sm text-gray-400">Invoices created</div>
          <div className="text-2xl font-semibold">{invoicesCreated}</div>
        </div>
        <div className="p-4 bg-[#1F1F23] rounded">
          <div className="text-sm text-gray-400">Invoices paid</div>
          <div className="text-2xl font-semibold">{invoicesPaid}</div>
        </div>
        <div className="p-4 bg-[#1F1F23] rounded md:col-span-3">
          <div className="text-sm text-gray-400">Revenue distributed (USDC)</div>
          <div className="text-2xl font-semibold">{revenueDistributed}</div>
        </div>
      </div>
    </div>
  )
}

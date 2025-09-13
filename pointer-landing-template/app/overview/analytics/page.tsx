import { readData } from '@/lib/fs-db'
import { Transaction } from '@/lib/types'

export default async function AnalyticsPage() {
  const transactions = await readData<Transaction>('transactions.json')
  const walletsLinked = transactions.filter(t => t.type === 'WALLET_LINKED').length
  const kycApproved = 0
  const invoicesPaid = transactions.filter(t => t.type === 'INVOICE_PAID').length
  const conversion = walletsLinked ? ((invoicesPaid / walletsLinked) * 100).toFixed(2) : '0'

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p>Wallets linked: {walletsLinked}</p>
      <p>KYC approved: {kycApproved}</p>
      <p>Invoices paid: {invoicesPaid}</p>
      <p>Conversion (Wallet linked → Invoice paid): {conversion}%</p>
    </div>
  )
}

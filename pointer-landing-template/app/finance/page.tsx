import Link from 'next/link'

export default function FinancePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Finance</h1>
      <div className="flex flex-col gap-2">
        <Link href="/finance/transactions" className="underline">
          Transactions
        </Link>
        <Link href="/finance/invoices" className="underline">
          Invoices
        </Link>
        <Link href="/finance/payments" className="underline">
          Payments
        </Link>
      </div>
    </div>
  )
}

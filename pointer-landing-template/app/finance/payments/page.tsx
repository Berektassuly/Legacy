import { readData } from '@/lib/fs-db'
import { Payment } from '@/lib/types'

export default async function PaymentsPage() {
  const payments = await readData<Payment>('payments.json')
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">Invoice</th>
            <th className="px-2 py-1">Amount</th>
            <th className="px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-t border-[#1F1F23]">
              <td className="px-2 py-1">{p.invoice_id}</td>
              <td className="px-2 py-1">{p.amount_usdc}</td>
              <td className="px-2 py-1">{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

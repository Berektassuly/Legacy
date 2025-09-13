import { readData } from '@/lib/fs-db'
import { Transaction } from '@/lib/types'

export default async function TransactionsPage() {
  const transactions = await readData<Transaction>('transactions.json')
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">Type</th>
            <th className="px-2 py-1">Amount</th>
            <th className="px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-t border-[#1F1F23]">
              <td className="px-2 py-1">{tx.type}</td>
              <td className="px-2 py-1">{tx.amount ?? '-'}</td>
              <td className="px-2 py-1">{new Date(tx.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

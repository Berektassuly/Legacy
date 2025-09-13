import Link from "next/link"

export interface Transaction {
  id: string
  type: string
  tokenMint: string
  amount: number
  signature?: string
  createdAt: string
}

const sample: Transaction[] = [
  {
    id: "1",
    type: "WALLET_LINKED",
    tokenMint: "-",
    amount: 0,
    signature: "3gL9dQ9k8WxFZqj",
    createdAt: "2024-01-01",
  },
]

export default function TransactionsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400">
            <th className="px-2 py-1 text-left">Type</th>
            <th className="px-2 py-1 text-left">Token</th>
            <th className="px-2 py-1 text-left">Amount</th>
            <th className="px-2 py-1 text-left">Signature</th>
            <th className="px-2 py-1 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((tx) => (
            <tr key={tx.id} className="border-b border-gray-800 text-gray-200">
              <td className="px-2 py-1">{tx.type}</td>
              <td className="px-2 py-1">{tx.tokenMint}</td>
              <td className="px-2 py-1">{tx.amount}</td>
              <td className="px-2 py-1">
                {tx.signature ? (
                  <Link
                    href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                    target="_blank"
                    className="text-indigo-400 hover:underline"
                  >
                    {tx.signature.slice(0, 8)}...
                  </Link>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-2 py-1">{tx.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

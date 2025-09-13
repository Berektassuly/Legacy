export interface Invoice {
  id: string
  asset: string
  amountUsdc: number
  status: string
  dueDate: string
}

const sample: Invoice[] = [
  {
    id: "1",
    asset: "Demo Asset",
    amountUsdc: 100,
    status: "SENT",
    dueDate: "2024-02-01",
  },
]

export default function InvoicesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400">
            <th className="px-2 py-1 text-left">Asset</th>
            <th className="px-2 py-1 text-left">Amount (USDC)</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Due</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((inv) => (
            <tr key={inv.id} className="border-b border-gray-800 text-gray-200">
              <td className="px-2 py-1">{inv.asset}</td>
              <td className="px-2 py-1">{inv.amountUsdc}</td>
              <td className="px-2 py-1">{inv.status}</td>
              <td className="px-2 py-1">{inv.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

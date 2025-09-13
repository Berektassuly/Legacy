export interface Payment {
  id: string
  invoiceId: string
  payer: string
  amountUsdc: number
  status: string
}

const sample: Payment[] = [
  {
    id: "1",
    invoiceId: "1",
    payer: "Fh8s...9pQ",
    amountUsdc: 100,
    status: "PAID",
  },
]

export default function PaymentsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400">
            <th className="px-2 py-1 text-left">Invoice</th>
            <th className="px-2 py-1 text-left">Payer</th>
            <th className="px-2 py-1 text-left">Amount (USDC)</th>
            <th className="px-2 py-1 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((pmt) => (
            <tr key={pmt.id} className="border-b border-gray-800 text-gray-200">
              <td className="px-2 py-1">{pmt.invoiceId}</td>
              <td className="px-2 py-1">{pmt.payer}</td>
              <td className="px-2 py-1">{pmt.amountUsdc}</td>
              <td className="px-2 py-1">{pmt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

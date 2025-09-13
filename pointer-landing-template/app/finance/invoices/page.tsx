'use client'

import { useEffect, useState } from 'react'

interface Invoice {
  id: string
  amount_usdc: number
  status: string
  memo?: string
  created_at: string
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')

  async function load() {
    const res = await fetch('/api/invoices')
    const data = await res.json()
    setInvoices(data)
  }

  useEffect(() => {
    load()
  }, [])

  async function createInvoice(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount_usdc: Number(amount), memo }),
    })
    setAmount('')
    setMemo('')
    load()
  }

  async function pay(id: string) {
    await fetch(`/api/invoices/${id}/pay`, { method: 'POST' })
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <form onSubmit={createInvoice} className="flex gap-2">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="bg-[#1F1F23] border border-[#333] px-2 py-1 rounded text-white"
          required
        />
        <input
          type="text"
          placeholder="Memo"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          className="bg-[#1F1F23] border border-[#333] px-2 py-1 rounded text-white"
        />
        <button type="submit" className="bg-[#6c47ff] px-4 py-1 rounded text-white">
          Create
        </button>
      </form>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">Amount</th>
            <th className="px-2 py-1">Status</th>
            <th className="px-2 py-1">Memo</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id} className="border-t border-[#1F1F23]">
              <td className="px-2 py-1">{inv.amount_usdc}</td>
              <td className="px-2 py-1">{inv.status}</td>
              <td className="px-2 py-1">{inv.memo}</td>
              <td className="px-2 py-1">
                {inv.status === 'SENT' && (
                  <button
                    onClick={() => pay(inv.id)}
                    className="bg-[#6c47ff] px-2 py-1 rounded text-white"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

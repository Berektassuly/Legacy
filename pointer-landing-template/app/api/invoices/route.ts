import { NextResponse } from 'next/server'
import { appendData, readData } from '@/lib/fs-db'
import { Invoice, Transaction } from '@/lib/types'
import { randomUUID } from 'crypto'

export async function GET() {
  const invoices = await readData<Invoice>('invoices.json')
  return NextResponse.json(invoices)
}

export async function POST(request: Request) {
  const body = await request.json()
  const invoice: Invoice = {
    id: randomUUID(),
    amount_usdc: Number(body.amount_usdc),
    memo: body.memo,
    status: 'SENT',
    created_at: new Date().toISOString(),
  }
  await appendData<Invoice>('invoices.json', invoice)
  const tx: Transaction = {
    id: randomUUID(),
    type: 'INVOICE_CREATED',
    metadata: { invoiceId: invoice.id },
    created_at: new Date().toISOString(),
  }
  await appendData<Transaction>('transactions.json', tx)
  return NextResponse.json(invoice, { status: 201 })
}

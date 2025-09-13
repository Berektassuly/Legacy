import { NextResponse } from 'next/server'
import { appendData, readData, writeData } from '@/lib/fs-db'
import { Invoice, Payment, Transaction } from '@/lib/types'
import { randomUUID } from 'crypto'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const invoices = await readData<Invoice>('invoices.json')
  const invoice = invoices.find(i => i.id === params.id)
  if (!invoice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (invoice.status !== 'PAID') {
    invoice.status = 'PAID'
    await writeData<Invoice>('invoices.json', invoices)
    const payment: Payment = {
      id: randomUUID(),
      invoice_id: invoice.id,
      amount_usdc: invoice.amount_usdc,
      created_at: new Date().toISOString(),
    }
    await appendData<Payment>('payments.json', payment)
    const tx: Transaction = {
      id: randomUUID(),
      type: 'INVOICE_PAID',
      amount: invoice.amount_usdc,
      metadata: { invoiceId: invoice.id, paymentId: payment.id },
      created_at: new Date().toISOString(),
    }
    await appendData<Transaction>('transactions.json', tx)
  }

  return NextResponse.json(invoice)
}

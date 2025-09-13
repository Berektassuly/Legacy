import { NextResponse } from 'next/server'
import { appendData, readData } from '@/lib/fs-db'
import { Transaction } from '@/lib/types'
import { randomUUID } from 'crypto'

export async function GET() {
  const transactions = await readData<Transaction>('transactions.json')
  return NextResponse.json(transactions)
}

export async function POST(request: Request) {
  const body = await request.json()
  const transaction: Transaction = {
    id: randomUUID(),
    created_at: new Date().toISOString(),
    ...body,
  }
  await appendData<Transaction>('transactions.json', transaction)
  return NextResponse.json(transaction, { status: 201 })
}

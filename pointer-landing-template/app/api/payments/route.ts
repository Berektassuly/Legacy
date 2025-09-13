import { NextResponse } from 'next/server'
import { readData } from '@/lib/fs-db'
import { Payment } from '@/lib/types'

export async function GET() {
  const payments = await readData<Payment>('payments.json')
  return NextResponse.json(payments)
}

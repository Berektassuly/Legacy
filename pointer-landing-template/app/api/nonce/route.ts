import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function GET() {
  const nonce = crypto.randomBytes(16).toString('hex')
  cookies().set('nonce', nonce, { httpOnly: true, sameSite: 'strict' })
  return NextResponse.json({ nonce })
}

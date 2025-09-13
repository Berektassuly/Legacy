import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth, clerkClient } from '@clerk/nextjs/server'
import bs58 from 'bs58'
import nacl from 'tweetnacl'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { publicKey, signature, nonce } = await req.json()
  const storedNonce = cookies().get('nonce')?.value
  if (!storedNonce || storedNonce !== nonce) {
    return new NextResponse('Invalid nonce', { status: 400 })
  }

  const message = new TextEncoder().encode(nonce)
  const isValid = nacl.sign.detached.verify(
    message,
    bs58.decode(signature),
    bs58.decode(publicKey)
  )
  if (!isValid) {
    return new NextResponse('Invalid signature', { status: 400 })
  }

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      wallets: {
        solana: {
          address: publicKey,
          verifiedAt: new Date().toISOString(),
        },
      },
    },
  })
  // TODO: record WALLET_LINKED in transactions table
  cookies().delete('nonce')
  return NextResponse.json({ linked: true })
}

'use client'

import { useMemo, useState } from 'react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import bs58 from 'bs58'

function WalletButton() {
  const { connected, publicKey, connect, signMessage } = useWallet()
  const [status, setStatus] = useState<string>('')

  const handleConnect = async () => {
    try {
      await connect()
    } catch (err) {
      console.error('Connect failed', err)
    }
  }

  const handleLink = async () => {
    if (!publicKey || !signMessage) return
    try {
      const nonceRes = await fetch('/api/nonce')
      const { nonce } = await nonceRes.json()
      const message = new TextEncoder().encode(nonce)
      const signature = bs58.encode(await signMessage(message))
      await fetch('/api/link-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: publicKey.toBase58(), signature, nonce })
      })
      setStatus('Wallet linked ✅')
    } catch (err) {
      console.error('Link failed', err)
    }
  }

  if (!connected) {
    return (
      <button onClick={handleConnect} className="bg-[#6c47ff] text-white rounded-md px-3 py-2 text-sm">
        Connect Phantom
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLink} className="bg-[#6c47ff] text-white rounded-md px-3 py-2 text-sm">
        Link Wallet
      </button>
      {status && <span className="text-xs text-green-500">{status}</span>}
    </div>
  )
}

export default function ConnectWallet() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletButton />
      </WalletProvider>
    </ConnectionProvider>
  )
}

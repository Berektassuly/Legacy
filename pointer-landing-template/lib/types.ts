export type TransactionType =
  | 'WALLET_LINKED'
  | 'SBT_MINTED'
  | 'INVOICE_CREATED'
  | 'INVOICE_PAID'
  | 'REVENUE_DISTRIBUTED'

export interface Transaction {
  id: string
  type: TransactionType
  amount?: number
  token_mint?: string
  metadata?: Record<string, any>
  created_at: string
}

export interface Invoice {
  id: string
  amount_usdc: number
  status: 'SENT' | 'PAID'
  memo?: string
  created_at: string
}

export interface Payment {
  id: string
  invoice_id: string
  amount_usdc: number
  created_at: string
}

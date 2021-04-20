type BuycoinsPriceStatus = "expired" | "active"

type OrderStatus = "pending" | "canceled" | "done" | "failed"

type Direction = "incoming" | "outgoing"

type OnchainTransferRequestStatus = "unconfirmed" | "confirmed" | "flagged" | "failed" | "expired" | "processed" | 
"ready_for_processing" | "processing"

export type ID = string

export type Cryptocurrency = "usd_tether" | "naira_token" | "bitcoin" | "ethereum" | "litecoin" | "usd_coin"

export type OrderSide = "buy" | "sell"

export type PriceType = "static" | "dynamic"

export type GetOrdersStatus = "open" | "completed"

export type PostOrderStatus = "inactive" | "active" | "pending_deactivation" | "payment_pending"
    | "payment_processing" | "cancelled" | "expired" | "completed" | "open" | "done"

export interface BuycoinsPrice {
    buyPricePerCoin: bigint,
    cryptocurrency: Cryptocurrency,
    expiresAt: number,
    id: ID,
    maxBuy: bigint,
    maxSell: bigint,
    minBuy: bigint,
    minCoinAmount: bigint,
    minSell: bigint,
    sellPricePerCoin: bigint,
    status: BuycoinsPriceStatus,
}

export interface Order {
    createdAt?: number,
    cryptocurrency: Cryptocurrency,    
    filledCoinAmount?: bigint,
    id: ID,
    price?: BuycoinsPrice,  
    side: OrderSide,
    status: OrderStatus,
    totalCoinAmount: bigint,
}

export interface Address {
    address: string,
    createdAt: number,
    cryptocurrency: Cryptocurrency,
    id: ID,
}

export interface OnchainTransferRequest {
    address: string,
    amount: number,
    createdAt: number,
    cryptocurrency: Cryptocurrency,
    fee: number,
    id: ID,
    status: OnchainTransferRequestStatus,
    transaction?: Transaction,
}

export interface Transaction {
    address?: Address,
    amount: number,
    confirmed: boolean,
    createdAt: number,
    cryptocurrency: Cryptocurrency,
    direction: Direction,
    id: ID,
    onchainTransferRequest?: OnchainTransferRequest,
    txhash?: string
}

export interface Account {
    confirmedBalance: number,
    cryptocurrency: Cryptocurrency,
    id: ID,
}
import { Cryptocurrency, GetOrdersStatus, ID, OrderSide, PostOrderStatus, PriceType } from '../types'

interface PostOrderEdge {
    cursor: string,
    node?: PostOrders,
}

export interface PostOrder {
    coinAmount: number,
    createdAt: number,
    cryptocurrency: Cryptocurrency,
    dynamicExchangeRate: number,
    id: ID,
    pricePerCoin: number,
    priceType: PriceType
    side: OrderSide,
    staticPrice: number,
    status: PostOrderStatus,
}

export interface PostOrderConnection {
    edges?: Array<PostOrderEdge>
    nodes?: Array<PostOrder>
    pageinfo: {
        endCursor: string,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        startCursor: string,
    }
}

export enum side {
    Buy = "buy",
    Sell = "sell",
}

export interface BuycoinsPricesOpts {
    mode: string,
    side: string,
    crypto: string,
}

export interface GetOrderOpts {
    status: GetOrdersStatus,
    side?: OrderSide,
    cryptocurrency?: Cryptocurrency
}

export interface PostOrders {
    dynamicPriceExpiry: number
    id: ID
    orders: PostOrderConnection
}

export interface PlaceLimitOrderOpts {
    orderSide: OrderSide,
    amount: number, 
    crypto: Cryptocurrency, 
    priceType: PriceType,
    staticPrice?: number, 
    dynamicExchangeRate?: number,
}

export interface MarketOrderOpts {
    orderSide: OrderSide,
    amount: number, 
    crypto: Cryptocurrency, 
}
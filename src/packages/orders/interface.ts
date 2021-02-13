import { Cryptocurrency, OrderSide, ID } from '../types'

export interface PriceData {
    [key: string]: any
}

export enum action {
    Buy = "Buy",
    Sell = "Sell",
}

export interface OrderOptions {
    amount: number,
    price: ID,
    crypto: Cryptocurrency,
}

export interface getPricesOpts {
    crypto: Cryptocurrency,
    side: OrderSide
}

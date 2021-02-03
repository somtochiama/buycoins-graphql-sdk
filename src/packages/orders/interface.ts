export interface PriceData {
    [key: string]: any
}

export enum action {
    Buy = "Buy",
    Sell = "Sell",
}

export interface OrderOptions {
    amount: number,
    price: string,
    crypto: string,
}

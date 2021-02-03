
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
    status: string
}

export interface PlaceLimitOrderOpts {
    orderSide: side,
    amount: number, 
    crypto: string, 
    priceType: string
    staticPrice?: number, 
    dynamicExchangeRate?: number,
}

export interface MarketOrderOpts {
    orderSide: string,
    amount: number, 
    crypto: string, 
}
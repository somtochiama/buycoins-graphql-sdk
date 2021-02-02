import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from './operations'
import Api from './api'
import { format } from 'prettier'

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

interface PlaceLimitOrderOpts {
    orderSide: side,
    amount: number, 
    crypto: string, 
    priceType: string
    staticPrice?: number, 
    dynamicExchangeRate?: number,
}

interface MarketOrderOpts {
    orderSide: string,
    amount: number, 
    crypto: string, 
}

class Trading extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    getBuycoinsPrices(opts: BuycoinsPricesOpts) {
        // Commenting out as API doesn't have buycoinsPrice field
        // although the  query is present in docs

        // return this.query(operationsData.buycoinsPrices, opts)
    }

    getOrdersExpiry(opts: GetOrderOpts): Promise<any>{
        return this.query(operationsData.getOrdersExpiry, opts)
    }

    getOrders(opts: GetOrderOpts): Promise<any>{
        return this.query(operationsData.getOrders, opts)
    }

    placeLimitOrder(opts: PlaceLimitOrderOpts): Promise<any>{
        return this.query(operationsData.placeLimitOrder, opts)
    }

    postMarketOrder(opts: MarketOrderOpts): Promise<any>{
        return this.query(operationsData.postMarketOrder, opts)
    }

    getMarketBook(): Promise<any>{
        return this.query(operationsData.getMarketBook)
    }
}


export default Trading
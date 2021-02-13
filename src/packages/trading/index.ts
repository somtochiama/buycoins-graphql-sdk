import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import * as types from './interface'
import Api from '../api'

class Trading extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    // eslint-disable-next-line
    getBuycoinsPrices(opts: types.BuycoinsPricesOpts) {
        // Commenting out as API doesn't have buycoinsPrice field
        // although the  query is present in docs

        // return this.query(operationsData.buycoinsPrices, opts)
        return
    }

    getOrdersExpiry(opts: types.GetOrderOpts): Promise<{orders: types.PostOrders}>{
        return this.query(operationsData.getOrdersExpiry, opts)
    }

    getOrders(opts: types.GetOrderOpts): Promise<{getOrders: types.PostOrders}>{
        return this.query(operationsData.getOrders, opts)
    }

    placeLimitOrder(opts: types.PlaceLimitOrderOpts): Promise<{ postLimitOrder: types.PostOrder }>{
        if (opts.priceType == "static" && !opts.staticPrice) {
            return Promise.reject({
                status: 422,
                errors: "field staticPrice required when priceType is static"
            })
        }
        if (opts.priceType == "dynamic" && !opts.dynamicExchangeRate) {
            return Promise.reject({
                status: 422,
                errors: "field dynamicExchangeRate required when priceType is dynamic"
            })
        }
        return this.query(operationsData.placeLimitOrder, opts)
    }

    postMarketOrder(opts: types.MarketOrderOpts): Promise<{ postMarketOrder: types.PostOrder}>{
        return this.query(operationsData.postMarketOrder, opts)
    }

    getMarketBook(): Promise<{ getMarketBook: types.PostOrderConnection}>{
        return this.query(operationsData.getMarketBook)
    }
}


export default Trading
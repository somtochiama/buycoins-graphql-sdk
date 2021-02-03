import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import { side, BuycoinsPricesOpts, GetOrderOpts, PlaceLimitOrderOpts, MarketOrderOpts} from './interface'
import Api from '../api'

class Trading extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    // eslint-disable-next-line
    getBuycoinsPrices(opts: BuycoinsPricesOpts) {
        // Commenting out as API doesn't have buycoinsPrice field
        // although the  query is present in docs

        // return this.query(operationsData.buycoinsPrices, opts)
        return
    }

    getOrdersExpiry(opts: GetOrderOpts): Promise<any>{
        return this.query(operationsData.getOrdersExpiry, opts)
    }

    getOrders(opts: GetOrderOpts): Promise<any>{
        return this.query(operationsData.getOrders, opts)
    }

    placeLimitOrder(opts: PlaceLimitOrderOpts): Promise<any>{
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

    postMarketOrder(opts: MarketOrderOpts): Promise<any>{
        return this.query(operationsData.postMarketOrder, opts)
    }

    getMarketBook(): Promise<any>{
        return this.query(operationsData.getMarketBook)
    }
}


export default Trading
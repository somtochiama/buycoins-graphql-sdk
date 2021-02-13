import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import { PriceData, OrderOptions, getPricesOpts} from './interface'
import { BuycoinsPrice, Order } from '../types'
import Api from '../api'
import { side } from '../trading/interface'


class Orders extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }
    
    async getPriceID(amount: number, crypto: string, action: side): Promise<string>{
        const data = await this.getPrices()
        const priceData = data.getPrices.find((price: PriceData) => price.cryptocurrency == crypto)
        if (priceData == undefined) {
            return Promise.reject({
               status: 422,
               message: `could not find price data for crypto ${crypto}.`  
            })
        }

        if (action == "buy") {
            if (amount < priceData.minBuy || amount > priceData.maxBuy) {
                return Promise.reject({
                    status: 422,
                    message: `price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}` 
                })
            }
        }

        if (action == "sell") {
            if (amount < priceData.minSell || amount > priceData.maxSell) {
                return Promise.reject({
                    status: 422,
                    message: `price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}` 
                })
            }
        }

        return priceData.id
    }

    getPrices(opts?: getPricesOpts): Promise<{getPrices:Array<BuycoinsPrice>}>{
        return this.query(operationsData.getPrices, opts)
    }

    buy(opts: OrderOptions): Promise<{buy:Order}>{
        return this.query(operationsData.buyCoin, opts)
    }

    sell(opts: OrderOptions): Promise<{sell:Order}>{
        return this.query(operationsData.sellCoin, opts)
    }

    getOrder(id: string): Promise<{node:Order}>{
        return this.query(operationsData.getOrder, {id})
    }

}


export default Orders
import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from './operations'
import Api from './api'

interface PriceData {
    [key: string]: any
}

enum action {
    Buy = "Buy",
    Sell = "Sell",
}

interface OrderOptions {
    amount: number,
    price: string,
    crypto: string,
}

class Orders extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }
    
    async getPriceID(amount: number, crypto: string, action: action): Promise<string>{
        const data = await this.getPrices()
        const priceData = data.getPrices.find((price: PriceData) => price.cryptocurrency == crypto)
        // TODO: Write validator
        if (priceData == undefined) {
            throw new Error (`could not find price data for crypto ${crypto}.`)
        }
        const min = `min${action}`
        const max = `max${action}`
        if (amount < priceData[min] || amount > priceData[max]) {
            throw new Error (`price must be betweeen ${min} and ${max}`)
        }

        return priceData.id
    }

    getPrices(): Promise<any>{
        return this.query(operationsData.getPrices)
    }

    async buy(opts: OrderOptions): Promise<any>{
        return this.query(operationsData.buyCoin, opts)
    }

    async sell(opts: OrderOptions): Promise<any>{
        return this.query(operationsData.sellCoin, opts)
    }

    async getOrder(id: string): Promise<any>{
        return this.query(operationsData.getOrder, {id})
    }

}


export default Orders
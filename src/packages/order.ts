import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from './operations'
import Api from './api'

interface PriceData {
    [key: string]: any
}

class Orders extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    // TODO: move to utils 
    static findPrice(data: Array<PriceData>, crypto: string): PriceData {
        return data.find(price => price.cryptocurrency == crypto)
    }


    async getPrices() {
        try {
            const data = await this.query(operationsData.getPrices)
            return data
          } catch (error) {
            throw error
          }
    }

    async buy(amount: number, crypto: string) {
        try {
            const prices = await this.getPrices()
            let priceData = Orders.findPrice(prices.getPrices, crypto)
            // TODO: Write validator
            if (priceData == undefined) {
                throw new Error (`could not find price for crypto ${crypto}.`)
            }
            if (amount < priceData.minBuy || amount > priceData.maxBuy) {
                console.log("here")
                throw new Error (`price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}`)
            }
            let buyOptions = {
                crypto,
                amount,
                price: priceData.id
            }
            let data = await this.query(operationsData.buyCoin, buyOptions)
            return data
          } catch (error) {
            throw error
          }
    }

    async sell(amount: number, crypto: string) {
        try {
            const prices = await this.getPrices()
            let priceData = Orders.findPrice(prices.getPrices, crypto)
            // TODO: Write validator
            if (priceData == undefined) {
                throw new Error (`could not find price for crypto ${crypto}.`)
            }
            if (amount < priceData.minSell || amount > priceData.maxSell) {
                console.log("here")
                throw new Error (`price must be betweeen ${priceData.minSell} and ${priceData.maxSell}`)
            }
            let sellOptions = {
                crypto,
                amount,
                price: priceData.id
            }
            let data = await this.query(operationsData.sellCoin, sellOptions)
            return data
          } catch (error) {
            throw error
          }
    }

    async getOrder(id: string) {
        try {
            const data = await this.query(operationsData.getOrder, {id})
            return data
          } catch (error) {
            throw error
          }
    }

}


export default Orders
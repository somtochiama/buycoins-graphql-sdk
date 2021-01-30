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

class Orders extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }
    
    getPriceID(amount: number, crypto: string, action: action): string{
        let priceData: PriceData
        this.getPrices()
        .then(data => {
            priceData = data.find((price: PriceData) => price.cryptocurrency == crypto)
        })
        // TODO: Write validator
        if (priceData == undefined) {
            throw new Error (`could not find price data for crypto ${crypto}.`)
        }
        if (amount < priceData[`min${action}`] || amount > priceData[`max${action}`]) {
            throw new Error (`price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}`)
        }

        return priceData.id
    }

    getPrices(): Promise<any>{
        return this.query(operationsData.getPrices)
    }

    async buy(amount: number, crypto: string): Promise<any>{
        const priceID = this.getPriceID(amount, crypto, action.Buy)
        const buyOptions = {
            crypto,
            amount,
            price: priceID
        }
        return this.query(operationsData.buyCoin, buyOptions)
    }

    async sell(amount: number, crypto: string): Promise<any>{
        const priceID = this.getPriceID(amount, crypto, action.Sell)
        const sellOptions = {
            crypto,
            amount,
            price: priceID
        }
        return this.query(operationsData.sellCoin, sellOptions)
    }

    async getOrder(id: string): Promise<any>{
        return this.query(operationsData.getOrder, {id})
    }

}


export default Orders
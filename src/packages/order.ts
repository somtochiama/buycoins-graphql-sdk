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

    // TODO: move to utils 
    static findPrice(data: Array<PriceData>, crypto: string): PriceData {
        return data.find(price => price.cryptocurrency == crypto)
    }

    getPriceID(amount: number, crypto: string, action: action): string{
        let priceData: PriceData
        this.getPrices()
        .then(data => {
            priceData = Orders.findPrice(data.getPrices, crypto)
        })
        // TODO: Write validator
        if (priceData == undefined) {
            throw new Error (`could not find price data for crypto ${crypto}.`)
        }
        if (amount < priceData[`min${action}`] || amount > priceData[`max${action}`]) {
            console.log("here")
            throw new Error (`price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}`)
        }

        return priceData.id
    }

    getPrices(): Promise<any>{
        return this.query(operationsData.getPrices)
    }

    async buy(amount: number, crypto: string): Promise<any>{
        let priceID = this.getPriceID(amount, crypto, action.Buy)
        let buyOptions = {
            crypto,
            amount,
            price: priceID
        }
        return this.query(operationsData.buyCoin, buyOptions)
    }

    async sell(amount: number, crypto: string) {
        let priceID = this.getPriceID(amount, crypto, action.Sell)
        let sellOptions = {
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
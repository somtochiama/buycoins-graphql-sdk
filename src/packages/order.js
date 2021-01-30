import operations from '../operations/query'
import mutations from '../operations/mutations'
import Api from './api'
import 'babel-core/register'
import 'babel-polyfill';

class Orders extends Api {
    constructor(client) {
        super(client)
    }

    async getPrices() {
        try {
            const data = await this.client.request(operations.getPrices)
            return data
          } catch (error) {
            throw error
          }
    }

    async buy(amount, crypto) {
        try {
            const prices = await this.getPrices()
            var priceData = findPrice(prices.getPrices, crypto)
            // TODO: Write validator
            if (priceData == undefined) {
                throw new Error (`could not find price for crypto ${crypto}.`)
            }
            if (amount < priceData.minBuy || amount > priceData.maxBuy) {
                console.log("here")
                throw new Error (`price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}`)
            }
            var buyOptions = {
                crypto,
                amount,
                price: priceData.id
            }
            var data = await this.client.request(mutations.buyCoin, buyOptions)
            return data
          } catch (error) {
            throw error
          }
    }

    async sell(amount, crypto) {
        try {
            const prices = await this.getPrices()
            var priceData = findPrice(prices.getPrices, crypto)
            // TODO: Write validator
            if (priceData == undefined) {
                throw new Error (`could not find price for crypto ${crypto}.`)
            }
            if (amount < priceData.minSell || amount > priceData.maxSell) {
                console.log("here")
                throw new Error (`price must be betweeen ${priceData.minSell} and ${priceData.maxSell}`)
            }
            var sellOptions = {
                crypto,
                amount,
                price: priceData.id
            }
            var data = await this.client.request(mutations.sellCoin, sellOptions)
            return data
          } catch (error) {
            throw error
          }
    }

    async getOrder(id) {
        try {
            const data = await this.client.request(operations.getOrderById, {id})
            return data
          } catch (error) {
            throw error
          }
    }

}

// TODO: move to utils 
function findPrice(data, crypto) {
    return data.find(price => price.cryptocurrency == crypto)
}

export default Orders

// T3JkZXItNzBiODA5YzUtZTAxOS00MGM3LWFkMWYtODkzYjgxNzY4MTRj
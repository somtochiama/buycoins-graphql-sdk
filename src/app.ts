import { GraphQLClient } from 'graphql-request'
import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import Orders from './packages/order'
import NairaAccount from './packages/nairaAccount'

const BUYCOINS_API_URL = "https://backend.buycoins.tech/api/graphql"

class Buycoins {
    nairaAccount: NairaAccount
    client: GraphQLClientClass
    orders: Orders

    constructor(publicKey: string, secretKey: string) {
        // super()
        const authValue = Buffer.from(publicKey + ':' + secretKey).toString('base64');
        this.client = new GraphQLClient(BUYCOINS_API_URL, { headers: {
            authorization: `Basic ${authValue}`
        } })
        this.orders = new Orders(this.client)
        this.nairaAccount = new NairaAccount(this.client)
    }

}

export default Buycoins
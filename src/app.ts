import { GraphQLClient } from 'graphql-request'
import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import Orders from './packages/order'
import NairaAccount from './packages/nairaAccount'
import Api from './packages/api'

const BUYCOINS_API_URL = "https://backend.buycoins.tech/api/graphql"

export class Buycoins {
    nairaAccount: NairaAccount
    client: GraphQLClientClass
    orders: Orders
    api: Api

    constructor(publicKey: string, secretKey: string) {
        if (!publicKey || !secretKey) {
            throw new Error("missing credentials, please pass in pub/secret key")
        }

        const authValue = Buffer.from(publicKey + ':' + secretKey).toString('base64');
        this.client = new GraphQLClient(BUYCOINS_API_URL, { headers: {
            authorization: `Basic ${authValue}`
        } })
        this.orders = new Orders(this.client)
        this.nairaAccount = new NairaAccount(this.client)
        this.api = new Api(this.client)
    }

}

import { GraphQLClient } from 'graphql-request'
import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import Orders from './packages/orders'
import Api from './packages/api'
import P2P from './packages/p2p'
import Send from './packages/send'
import Receive from './packages/receive'
import Webhooks from './packages/webhooks'

const BUYCOINS_API_URL = "https://backend.buycoins.tech/api/graphql"

export class Buycoins {
    client: GraphQLClientClass
    orders: Orders
    api: Api
    p2p: P2P
    send: Send
    receive: Receive
    webhooks: Webhooks

    constructor(publicKey: string, secretKey: string) {
        if (!publicKey || !secretKey) {
            throw new Error("missing credentials, please pass in pub/secret key")
        }

        const authValue = Buffer.from(publicKey + ':' + secretKey).toString('base64');
        this.client = new GraphQLClient(BUYCOINS_API_URL, { headers: {
            authorization: `Basic ${authValue}`
        } })
        this.orders = new Orders(this.client)
        this.api = new Api(this.client)
        this.p2p = new P2P(this.client)
        this.send = new Send(this.client)
        this.receive = new Receive(this.client)
        this.webhooks = new Webhooks(this.client)
    }

}

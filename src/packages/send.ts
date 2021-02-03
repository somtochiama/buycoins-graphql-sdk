import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from './operations'
import Api from './api'

export enum side {
    Buy = "buy",
    Sell = "sell",
}

export interface NetworkFeesOpts {
    amount: number,
    crypto: string,
}

export interface SendOpts {
    amount: number,
    crypto: string,
    address: string,
}
interface BalanceOpts {
    crypto?: string, 
}

class Send extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    getEstimatedNetworkFee(opts: NetworkFeesOpts) {
        return this.query(operationsData.getNetworkFees, opts)
    }

    sendCrypto(opts: SendOpts): Promise<any>{
        return this.query(operationsData.send, opts)
    }

    getBalance(opts?: BalanceOpts): Promise<any>{
        if (opts && opts.crypto) {
            return this.query(operationsData.getBalance, opts)
        }
        return this.query(operationsData.getAllBalances)
    }
}


export default Send
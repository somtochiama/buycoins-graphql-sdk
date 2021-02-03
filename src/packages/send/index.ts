import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import { NetworkFeesOpts, SendOpts, BalanceOpts } from './interface'
import Api from '../api'

class Send extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    getEstimatedNetworkFee(opts: NetworkFeesOpts): Promise<any>{
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
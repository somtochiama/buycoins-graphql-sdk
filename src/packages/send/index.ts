import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import { OnchainTransferRequest, Account } from '../types'
import * as types from './interface'
import Api from '../api'

class Send extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    getEstimatedNetworkFee(opts: types.NetworkFeesOpts): Promise<{getEstimatedNetworkFee: types.EstimatedFee}>{
        return this.query(operationsData.getNetworkFees, opts)
    }

    sendCrypto(opts: types.SendOpts): Promise<{ send: OnchainTransferRequest}>{
        return this.query(operationsData.send, opts)
    }

    getBalance(opts?: types.BalanceOpts): Promise<{getBalance: Account}>{
        if (opts && opts.crypto) {
            return this.query(operationsData.getBalance, opts)
        }

        return this.query(operationsData.getAllBalances)
    }
}


export default Send
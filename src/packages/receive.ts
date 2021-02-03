import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from './operations'
import Api from './api'

export interface CreateAddressOpts {
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

    createAddress(opts: CreateAddressOpts) {
        return this.query(operationsData.createAddress, opts)
    }
}


export default Send
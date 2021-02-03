import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import Api from '../api'

export interface CreateAddressOpts {
    crypto: string,
}

export interface SendOpts {
    amount: number,
    crypto: string,
    address: string,
}


class Receive extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    createAddress(opts: CreateAddressOpts): Promise<any>{
        return this.query(operationsData.createAddress, opts)
    }
}


export default Receive
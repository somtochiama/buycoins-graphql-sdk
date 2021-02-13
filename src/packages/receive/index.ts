import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import { CreateAddressOpts } from './interface'
import { Address } from '../types'
import Api from '../api'

class Receive extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    createAddress(opts: CreateAddressOpts): Promise<{createAddress:Address}>{
        return this.query(operationsData.createAddress, opts)
    }
}


export default Receive
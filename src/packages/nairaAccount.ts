import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from './operations'
import Api from './api'

interface createOpts {
    accountName: string
}

class NairaAccount extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    async createDepositAccount(createOptions: createOpts): Promise<any> {
        return this.query(operationsData.createNairaAccount, createOptions)
    }
}

export default NairaAccount
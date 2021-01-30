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

    async createDepositAccount(createOptions: createOpts) {
        try {
            const data = await this.query(operationsData.createNairaAccount, createOptions)
            return data
          } catch (error) {
            throw error
          }
    }
}

export default NairaAccount
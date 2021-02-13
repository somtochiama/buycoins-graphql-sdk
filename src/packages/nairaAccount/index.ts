import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import { operationsData } from '../operations'
import Api from '../api'
import { DepositAccount } from '../types'

class NairaAccount extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    async createDepositAccount(accountName: string): Promise<DepositAccount> {
        return this.query(operationsData.createNairaAccount, {
            accountName,
        })
    }
}

export default NairaAccount
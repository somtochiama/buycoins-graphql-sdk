import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import Api from './api'
import 'babel-core/register'
import 'babel-polyfill';

const createOperation = "createNairaAccount"

interface createOpts {
    accountName: string
}

class NairaAccount extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    async createDepositAccount(createOptions: createOpts) {
        try {
            const data = await this.query(createOperation, createOptions)
            return data
          } catch (error) {
            throw error
          }
    }
}

export default NairaAccount
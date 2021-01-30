import Api from './api'
import 'babel-core/register'
import 'babel-polyfill';

const createOperation = "createNairaAccount"

class NairaAccount extends Api {
    constructor(client) {
        super(client)
    }

    async createDepositAccount(accountName) {
        try {
            const accOpts = {
                accountName
            }
            const data = await this.query(createOperation, accOpts)
            return data
          } catch (error) {
            throw error
          }
    }
}

export default NairaAccount
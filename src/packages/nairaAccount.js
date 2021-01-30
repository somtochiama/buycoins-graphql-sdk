import mutations from '../operations/mutations'
import Api from './api'
import 'babel-core/register'
import 'babel-polyfill';

class NairaAccount extends Api {
    constructor(client) {
        super(client)
    }

    async createDepositAccount(accountName) {
        try {
            const accOpts = {
                accountName
            }
            const data = await this.client.request(mutations.createNairaAccount, accOpts)
            return data
          } catch (error) {
            throw error
          }
    }
}

export default NairaAccount
import operations from './operations'
import 'babel-core/register'
import 'babel-polyfill';

export default class Api {
    constructor(client) {
        this.client = client
    }

    static get(operationKey) {
        return operations[operationKey];
    }
    

    async query(operationKey, options) {
        const operation = Api.get(operationKey);
    
        if (!this.client) {
            throw new Error(
                'Missing client, construct with Buycoins class',
              );
        }

        return this.client.request(operation, options);
    }
}
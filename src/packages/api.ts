import { operationsData}  from './operations'
import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'

interface ApiOptions {
    [key: string]: any;
}

export default class Api {
    private client: GraphQLClientClass

    constructor(client: GraphQLClientClass) {
        this.client = client
    }

    async query(operation: string, options?: ApiOptions) {
        if (!this.client) {
            throw new Error(
                'Missing client, construct with Buycoins class',
              );
        }

        return this.client.request(operation, options);
    }
}
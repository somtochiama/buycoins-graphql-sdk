import {Operations, operationsData}  from './operations'
import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import 'babel-core/register'
import 'babel-polyfill';

interface ApiOptions {
    [key: string]: any;
}

export default class Api {
    private client: GraphQLClientClass

    constructor(client: GraphQLClientClass) {
        this.client = client
    }

    static get(operationKey: string): string {
        return operationsData[operationKey];
    }
    

    async query(operationKey: string, options?: ApiOptions) {
        const operation = Api.get(operationKey);
    
        if (!this.client) {
            throw new Error(
                'Missing client, construct with Buycoins class',
              );
        }

        return this.client.request(operation, options);
    }
}
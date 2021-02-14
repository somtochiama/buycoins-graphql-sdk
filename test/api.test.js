import Api from '../src/packages/api'
import { GraphQLClient, request } from 'graphql-request'
import { mockClient } from "./testdata/testdata"

jest.mock('graphql-request')

describe('Api', () => {
    test('throws error when client is undefined', () => {
        const api = new Api() // api initialized with no client
        return expect(api.query()).rejects.toThrowError(/Missing client/)
    })

    test('request is called successfully', () => {
        const client = new GraphQLClient("test.buycoins.sdk")
        const api = new Api(client)
        const query = `
            createDepositAccount(accountName: "tony stark") {
                accountNumber
                accountName
                accountType
                bankName
                accountReference
            }
        `
        
        api.query(query)
        // return expect(api.client.request).toHaveBeenCalled()
        return expect(api.client.request).toHaveBeenCalledWith(query, undefined)
    })
})
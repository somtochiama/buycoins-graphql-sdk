import { Buycoins } from '../src/app'
import Order from '../src/packages/order'
import NairaAccount from '../src/packages/nairaAccount'
import { GraphQLClient } from 'graphql-request'

describe('Buycoins', () => {
    test("should throw error if both keys are missing", () => {
        expect(() => {
            new Buycoins()
        }).toThrowError(/missing credentials/)
    })

    test("should throw error if one of keys are missing", () => {
        expect(() => {
            new Buycoins("pubkey")
        }).toThrowError(/missing credentials/)
    })

    test("should set up order api", () => {
        let buycoins = new Buycoins("mmmxnx", "menxnxnx")
        expect(buycoins.orders).toBeInstanceOf(Order)
    })

    test("should set up naira api", () => {
        let buycoins = new Buycoins("mmmxnx", "menxnxnx")
        expect(buycoins.nairaAccount).toBeInstanceOf(NairaAccount)
    })

    test("should set up graphql client correctly", () => {
        const buycoins = new Buycoins("mmmxnx", "mmmxnx");
        const BUYCOINS_API_URL = "https://backend.buycoins.tech/api/graphql"
        const expectedClient = new GraphQLClient(BUYCOINS_API_URL, { headers: {
            authorization: `Basic ${Buffer.from("mmmxnx" + ':' + "mmmxnx").toString('base64')}`
        } })
        expect(buycoins.client).toEqual(expectedClient)
    })
})
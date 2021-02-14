import P2P from "../src/packages/p2p"
import { operationsData } from "../src/packages/operations"
import { getOrders, getOrdersExpiry, marketBook, mockClient } from "./testdata/testdata"

describe ("P2P Trading", () => {

    const mockQuery = jest.fn()
    P2P.prototype.query = mockQuery

    const p2p = new P2P(mockClient)
    beforeEach(() => {
        mockQuery.mockClear()
    })

    test("getOrdersExpiry returns correct data", () => {
        const options = {
            status: "open"
        }
        mockQuery.mockResolvedValue(getOrdersExpiry)
        const promise = p2p.getOrdersExpiry(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getOrdersExpiry)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
        expect(promise).resolves.toEqual(getOrdersExpiry)
    })

    test("getOrders returns correct data", () => {
        const options = {
            status: "open"
        }
        mockQuery.mockResolvedValue(getOrders)
        const promise = p2p.getOrders(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getOrders)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
        expect(promise).resolves.toEqual(getOrders)
    })

    test("placeLimitOrder passes correct data", async () => {
        const options = {
            orderSide: "buy",
            amount: 0.01, 
            crypto: "bitcoin", 
            priceType: "static",
            staticPrice: 6000000,
        }
        await p2p.placeLimitOrder(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.placeLimitOrder)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
    })

    test("placeLimitOrder fails when priceType is static and no staticPrice", async () => {
        const options = {
            orderSide: "buy",
            amount: 0.01, 
            crypto: "bitcoin", 
            priceType: "static",
        }
        try {
            await p2p.placeLimitOrder(options);
          } catch (e) {
            expect(e.errors).toMatch(/field staticPrice required when priceType is static/);
        }
    })

    test("placeLimitOrder fails when priceType is dynamic and no dynamicExchangeRate", async () => {
        const options = {
            orderSide: "buy",
            amount: 0.01, 
            crypto: "bitcoin", 
            priceType: "dynamic",
        }
        try {
            await p2p.placeLimitOrder(options);
          } catch (e) {
            expect(e.errors).toMatch(/field dynamicExchangeRate required when priceType is dynamic/);
        }
    })

    test("postMarketOrder passes correct data", async () => {
        const options = {
            orderSide: "buy",
            amount: 0.01, 
            crypto: "bitcoin", 
        }
        await p2p.postMarketOrder(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.postMarketOrder)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
    })

    test("getMarketBook returns correct data", () => {
        mockQuery.mockResolvedValue(marketBook)
        const promise = p2p.getMarketBook()
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getMarketBook)
        expect(promise).resolves.toEqual(marketBook)
    })
})
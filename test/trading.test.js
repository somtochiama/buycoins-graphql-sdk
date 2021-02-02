import Trading from "../src/packages/trading"
import { operationsData } from "../src/packages/operations"
import { getOrders, getOrdersExpiry, marketBook, mockClient } from "./testdata/testdata"

describe ("Trading", () => {

    const mockQuery = jest.fn()
    Trading.prototype.query = mockQuery

    const trading = new Trading(mockClient)
    beforeEach(() => {
        mockQuery.mockClear()
    })

    test("getOrdersExpiry returns correct data", () => {
        const options = {
            status: "open"
        }
        mockQuery.mockResolvedValue(getOrdersExpiry)
        const promise = trading.getOrdersExpiry(options)
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
        const promise = trading.getOrders(options)
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
        await trading.placeLimitOrder(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.placeLimitOrder)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
    })

    test("postMarketOrder passes correct data", async () => {
        const options = {
            orderSide: "buy",
            amount: 0.01, 
            crypto: "bitcoin", 
        }
        await trading.postMarketOrder(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.postMarketOrder)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
    })

    test("getMarketBook returns correct data", () => {
        mockQuery.mockResolvedValue(marketBook)
        const promise = trading.getMarketBook()
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getMarketBook)
        expect(promise).resolves.toEqual(marketBook)
    })
})
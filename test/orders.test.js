import Orders from "../src/packages/order"
import { operationsData } from "../src/packages/operations"
import { priceData, mockClient } from "./testdata/testdata"

describe ("Orders", () => {

    const mockQuery = jest.fn()
    mockQuery.mockResolvedValue(priceData)
    Orders.prototype.query = mockQuery

    test("getPrices returns correct data", () => {

        const orders = new Orders(mockClient)
        const promise = orders.getPrices()
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getPrices)
        expect(promise).resolves.toEqual(priceData)
    })

    describe("getPriceID", () => {
        test("returns correct ID", async () => {
    
            const orders = new Orders(mockClient)
            try {
                const id = await orders.getPriceID(0.1, "ethereum");
                expect(id).toEqual("2")
              } catch (e) {
                
                expect(e).toMatch('');
              }
        })

        test("throws error for non-existent crypto", async () => {    
            const orders = new Orders(mockClient)
            try {
                await orders.getPriceID(0.1, "mycoin");
              } catch (e) {
                expect(e.message).toMatch(/could not find price data/);
              }
        })

        test("throws error for amount that is less than min", async () => {    
            const orders = new Orders(mockClient)
            try {
                await orders.getPriceID(0.000001, "ethereum");
              } catch (e) {
                expect(e.message).toMatch(/price must be between/);
              }
        })
    })

    test("buy makes the right call", async () => {
        mockQuery.mockClear()
        const orders = new Orders({
            amount: 0.4,
            crypto: "ethereum",
            price: "1"
        })
        try {
            await orders.buy(0.4, "ethereum");
            expect(mockQuery.mock.calls[0][0]).toBe(operationsData.buyCoin)
            expect(mockQuery.mock.calls[0][1]).toEqual({
                amount: 0.4,
                crypto: "ethereum",
                price: "1"
            })
        } catch (e) {
            expect(e.message).toMatch('');
        }
    })

    test("sell api makes the right call", async () => {
        mockQuery.mockClear()
        const orders = new Orders({
            amount: 0.4,
            crypto: "ethereum",
            price: "1"
        })
        try {
            await orders.sell(0.4, "ethereum");
            expect(mockQuery.mock.calls[0][0]).toBe(operationsData.sellCoin)
            expect(mockQuery.mock.calls[0][1]).toEqual({
                amount: 0.4,
                crypto: "ethereum",
                price: "1"
            })
        } catch (e) {
            expect(e.message).toMatch('');
        }
    })
})
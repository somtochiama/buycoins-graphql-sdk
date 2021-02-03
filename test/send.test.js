import Send from "../src/packages/send"
import { operationsData } from "../src/packages/operations"
import { getBalances, mockClient, networkFees } from "./testdata/testdata"

describe ("Trading", () => {

    const mockQuery = jest.fn()
    Send.prototype.query = mockQuery

    const send = new Send(mockClient)
    beforeEach(() => {
        mockQuery.mockClear()
    })

    test("getEstimatedNetworkFee returns correct data", () => {
        const options = {
            amount: 0.01,
            crypto: 'bitcoin',
        }
        mockQuery.mockResolvedValue(networkFees)
        const promise = send.getEstimatedNetworkFee(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getNetworkFees)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
        expect(promise).resolves.toEqual(networkFees)
    })

    test("sendCrypto passes correct data", async () => {
        const options = {
            address: "uuurkrkmckmdmcmwkopu8e9w8",
            amount: 0.01, 
            crypto: "bitcoin", 
        }
        await send.sendCrypto(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.send)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
    })

    test("getBalance returns correct all data when no arg is given", async () => {
        await send.getBalance()
        mockQuery.mockResolvedValue(getBalances)

        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getAllBalances)
        expect(mockQuery.mock.calls[0][1]).toBeUndefined
        expect(promise).resolves.toEqual(getBalances)
    })

    test("getBalance returns correct all data when arg is given", async () => {
        await send.getBalance({
            crypto: "bitcoin"
        })
        mockQuery.mockResolvedValue(getBalances)

        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.getAllBalances)
        expect(mockQuery.mock.calls[0][1]).toBe({
            crypto: "bitcoin"
        })
    })
})
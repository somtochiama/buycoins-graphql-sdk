import Receive from "../src/packages/receive"
import { operationsData } from "../src/packages/operations"
import { mockClient } from "./testdata/testdata"

describe ("Receiver", () => {

    const mockQuery = jest.fn()
    Receive.prototype.query = mockQuery

    const receive = new Receive(mockClient)
    beforeEach(() => {
        mockQuery.mockClear()
    })

    test("sendCrypto passes correct data", async () => {
        const options = {
            crypto: "bitcoin", 
        }

        await receive.createAddress(options)
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.createAddress)
        expect(mockQuery.mock.calls[0][1]).toBe(options)
    })
})
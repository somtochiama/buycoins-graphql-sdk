import Orders from "../src/packages/order"
import NairaAccount from "../src/packages/nairaAccount"
import { operationsData } from "../src/packages/operations"
import { createNairaAccountData } from "./testdata/testdata"

describe("NairaAccount", () => {
    const mockQuery = jest.fn()
    mockQuery.mockResolvedValue(createNairaAccountData)
    NairaAccount.prototype.query = mockQuery

    const nairaAccount = new NairaAccount()
    test("createDepositAccount calls api correctly", () => {
        const promise = nairaAccount.createDepositAccount({
            accountName: "somtochi test"
        })
        expect(mockQuery).toHaveBeenCalled()
        expect(mockQuery.mock.calls[0][0]).toBe(operationsData.createNairaAccount)
        expect(promise).resolves.toEqual(createNairaAccountData)
    })
})
import Api from '../src/packages/api'

describe('Api', () => {
    test('throws error when client is undefined', () => {
        const api = new Api() // api initialized with no client
        return expect(api.query()).rejects.toThrowError(/Missing client/)
    })
})
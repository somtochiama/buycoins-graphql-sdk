import { GraphQLClient as GraphQLClientClass  } from 'graphql-request/dist/index'
import crypto from 'crypto'
import Api from './api'
import { Buffer } from 'buffer/'

class Webhooks extends Api {
    constructor(client: GraphQLClientClass) {
        super(client)
    }

    static validateSignature(signature: string, body: string, token: string): boolean {
        const hmacSignature = crypto.createHmac('sha1', token).update(body).digest('hex')
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmacSignature))
    }
}

export default Webhooks
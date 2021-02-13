import { Cryptocurrency } from '../types'

export interface CreateAddressOpts {
    crypto: Cryptocurrency,
}

export interface SendOpts {
    amount: number,
    crypto: Cryptocurrency,
    address: string,
}

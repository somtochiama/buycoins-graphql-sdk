import { Cryptocurrency } from '../types'

export interface NetworkFeesOpts {
    amount: number,
    crypto: Cryptocurrency,
}

export interface SendOpts {
    amount: number,
    crypto: Cryptocurrency,
    address: string,
}

export interface BalanceOpts {
    crypto?: Cryptocurrency, 
}

export interface EstimatedFee {
    estimatedFee: bigint,
    total: bigint,
}

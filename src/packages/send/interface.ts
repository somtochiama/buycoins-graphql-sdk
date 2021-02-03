export interface NetworkFeesOpts {
    amount: number,
    crypto: string,
}

export interface SendOpts {
    amount: number,
    crypto: string,
    address: string,
}

export interface BalanceOpts {
    crypto?: string, 
}

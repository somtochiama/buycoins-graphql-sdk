export interface CreateAddressOpts {
    crypto: string,
}

export interface SendOpts {
    amount: number,
    crypto: string,
    address: string,
}

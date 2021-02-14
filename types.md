# Different return types in the SDK

## Deposit Account

```
DepositAccount {
    accountName,
    accountNumber,
    accountReference,
    accountType,
    bankName,
    id,
}
```

## BuycoinsPrice

```
interface BuycoinsPrice {
    buyPricePerCoin: bigint,
    cryptocurrency: Cryptocurrency,
    expiresAt: number,
    id: ID,
    maxBuy: bigint,
    maxSell: bigint,
    minBuy: bigint,
    minCoinAmount: bigint,
    minSell: bigint,
    sellPricePerCoin: bigint,
    status: BuycoinsPriceStatus,
}
```

## Order

```
export interface Order {
    createdAt?: number,
    cryptocurrency: Cryptocurrency,    
    filledCoinAmount?: bigint,
    id: ID,
    price?: BuycoinsPrice,  
    side: OrderSide,
    status: OrderStatus,
    totalCoinAmount: bigint,
}
```
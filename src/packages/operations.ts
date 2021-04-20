import { gql } from 'graphql-request'

export interface Operations {
    [key:string]: string
}

// TODO: Split operations for different files
export const operationsData: Operations = {
    getPrices:  gql`
        query($crypto: Cryptocurrency, $side: OrderSide) {
            getPrices(cryptocurrency: $crypto, side: $side){
            id
            cryptocurrency
            buyPricePerCoin
            minBuy
            maxBuy
            expiresAt
            }
        }
    `,
    getOrder: gql`
    query getOrder($id: ID!){
        node(id: $id) {
          id
          ... on Order {
            status
            cryptocurrency
            totalCoinAmount
            side
          }
        }
      }
    `,
    buyCoin: gql`
    mutation buy($price: ID!, $amount: BigDecimal!, $crypto: Cryptocurrency) {
        buy(price: $price, coin_amount: $amount, cryptocurrency: $crypto) {
            id
            cryptocurrency
            status
            totalCoinAmount
            side
        }
    }
    `,
    sellCoin: gql`
        mutation sell($price: ID!, $amount: BigDecimal!, $crypto: Cryptocurrency) {
            sell(price: $price, coin_amount: $amount, cryptocurrency: $crypto) {
                id
                cryptocurrency
                status
                totalCoinAmount
                side
            }
        }
    `,
    buycoinsPrices: gql`
    query($side: String!, $mode: String!, $crypto: String!) {
        buycoinsPrice(side: $side, mode: $mode, cryptocurrency: $crypto){
            buyPricePerCoin
            cryptocurrency
            id
            maxBuy
            maxSell
            minBuy
            minCoinAmount
            minSell
            mode
            sellPricePerCoin
            status
        }
    }
    `,
    getOrdersExpiry: gql`
    query($status: GetOrdersStatus!) {
        getOrders(status: $status) {
          dynamicPriceExpiry
        }
    }`,
    getOrders: gql`
    query($status: GetOrdersStatus!) {
        getOrders(status: $status) {
          dynamicPriceExpiry
          orders {
            edges {
              node {
                id
                cryptocurrency
                coinAmount
                side
                status
                createdAt
                pricePerCoin
                priceType
                staticPrice
                dynamicExchangeRate
              }
            }
          }
        }
      }      
    `,
    placeLimitOrder: gql`
    mutation($orderSide: OrderSide!, $amount: BigDecimal!, $crypto: Cryptocurrency, $staticPrice: BigDecimal, $priceType: PriceType!, $dynamicExchangeRate: BigDecimal) {
        postLimitOrder(orderSide: $orderSide, coinAmount: $amount, cryptocurrency: $crypto, staticPrice: $staticPrice, priceType: $priceType, dynamicExchangeRate: $dynamicExchangeRate){
          id
          cryptocurrency
          coinAmount
          side
          status 
          createdAt
          pricePerCoin
          priceType
          staticPrice
          dynamicExchangeRate
        }
      }
    `,
    postMarketOrder: gql`
    mutation($orderSide: OrderSide!, $amount: BigDecimal!, $crypto: Cryptocurrency) {
        postMarketOrder(orderSide: $orderSide, coinAmount: $amount, cryptocurrency: $crypto){
            id
            cryptocurrency
            coinAmount
            side
            status 
            createdAt
            pricePerCoin
            priceType
            staticPrice
            dynamicExchangeRate
        }
    }
    `,
    getMarketBook: gql `
    query {
        getMarketBook {
          dynamicPriceExpiry
          orders {
            edges {
              node {
                id
                cryptocurrency
                coinAmount
                side
                status 
                createdAt
                pricePerCoin
                priceType
                staticPrice
                dynamicExchangeRate
              }
            }
          }
        }
      }      
    `,
    getNetworkFees: `
    query($crypto: Cryptocurrency, $amount: BigDecimal!) {
      getEstimatedNetworkFee(cryptocurrency: $crypto, amount: $amount) {
        estimatedFee
        total
      }
    }`,
    send: `
    mutation($crypto: Cryptocurrency, $amount: BigDecimal!, $address: String!) {
      send(cryptocurrency: $crypto, amount: $amount, address: $address) {
        id
        address
        amount
        cryptocurrency
        fee
        status
        transaction {
          id
        }
      }
    }
    `,
    getAllBalances: `
      query{
        getBalances{
          id
          cryptocurrency
          confirmedBalance
        }
      }
    `,
    getBalance: `
      query($crypto: Cryptocurrency){
        getBalances(cryptocurrency: $crypto){
          id
          cryptocurrency
          confirmedBalance
        }
      }
    `,
    createAddress: `
    mutation($crypto: Cryptocurrency!) {
      createAddress(cryptocurrency: $crypto) {
        cryptocurrency
        address
      }
    }
    `
}


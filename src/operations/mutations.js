import { gql } from 'graphql-request'

const mutations = {
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
    createNairaAccount: gql`
    mutation createDepositAccount($accountName: String!) {
        createDepositAccount(accountName: $accountName) {
          accountNumber
          accountName
          accountType
          bankName
          accountReference
        }
    }
    `
}

export default mutations
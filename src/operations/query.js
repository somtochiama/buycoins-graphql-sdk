import { gql } from 'graphql-request'

const query = {
    getPrices:  gql`
        query{
            getPrices{
            id
            cryptocurrency
            buyPricePerCoin
            minBuy
            maxBuy
            expiresAt
            }
        }
    `,
    getOrderById: gql`
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
    `
}


export default query
# <img src="https://raw.githubusercontent.com/SomtochiAma/buycoins-graphql-sdk/main/images/download.jpeg" width="50" height="50"> Buycoins GraphQL SDK :purple_heart:

A super simple and lightweight Javascript SDK for the [Buycoins API](https://developers.buycoins.africa).

[![codecov](https://codecov.io/gh/SomtochiAma/buycoins-graphql-sdk/branch/main/graph/badge.svg?token=R4Q1P67I5R)](https://codecov.io/gh/SomtochiAma/buycoins-graphql-sdk)
![Tests](https://github.com/SomtochiAma/buycoins-graphql-sdk/workflows/Tests/badge.svg)
[![npm version](https://badge.fury.io/js/buycoins-graphql-sdk.svg)](https://badge.fury.io/js/buycoins-graphql-sdk)


## Table of Contents

* [Installation](#installation)
    * [Authentication](#authentication)
* [Quick Start](#quick-start)
* [Usage](#usage)
    * [Naira Token Account](#naira-token-account)
    * [Placing Orders](#placing-orders)
      * [Get Prices](#get-prices)
      * [Buy](#buy)
      * [Sell](#sell)
      * [Get Price ID](#get-price-id)
* [P2P Trading](#p2p-trading)
  * [Dynamic Price Expiry](#dynamic-price-expiry)
  * [Placing a limit order](#placing-a-limit-order)
  * [Placing a limit order](#placing-a-limit-order-1)
  * [Get Orders](#get-orders)
  * [Get Market Orders](#get-market-orders)
  * [Placing a limit order](#placing-a-limit-order-2)
* [Send](#send)
  * [Network Fees](#network-fees)
  * [Send Cryptocurrency](#send-cryptocurrency)
  * [Account Balance](#account-balance)
* [Receive](#receive)
  * [Create Address](#create-address)
* [Run your own GraphQL queries](#run-your-own-graphql-queries)
* [Feature Parity with the Buycoins API](#feature-parity-with-the-buycoins-api)
* [Contributing.](#contributing)

## Installation

```sh
npm i buycoins-graphql-sdk
```

### Authentication 

To access the Buycoins API, you will need to generate a public and a secret key on the `API Settings` screen in the Buycoins app. Enable this feature by sending a request to <support@buycoins.africa>.

From the Buycoins API documentation:

> The API is currently open to access requests from *fully verified* BuyCoins users. To apply, please send an email to support@buycoins.africa from your email account registered on BuyCoins.

## Quick Start

To get up and running:

```js
import { Buycoins } from 'buycoins-graphql-sdk'

// Pass in the public and secret key when creating a new instance.
var buycoinsClient = new Buycoins(process.env.PUBLIC_KEY, process.env.SECRET_KEY)

// The SDK is promise based :). You can also use async/await
buycoinsClient.getBalance()
.then(data => {
    // TODO: Handle data
})
.catch(err => {
   // TODO: Handle error
})
```

That's it!

## Usage

The SDK models the API and each property in the `Buycoins` class from the SDK matches with a section in the Buycoins API documentation.

### Naira Token Account

#### Depositing and Withdrawing Naira
Depositing and Widthdrawals occur with the Buycoins User Interface on web or the mobile app.

BuyCoins API docs: [https://developers.buycoins.africa/naira-token-account/]([https://developers.buycoins.africa/naira-token-account/)

### Placing Orders

#### Get Prices
To get active prices with the API:

```js
buycoins.orders.getPrices()
```

This returns an array of different prices and the id of the cryptocurrency will be used in buying and selling.
Example response
```json
{
  "data": {
    "getPrices": [
      {
        "id": "QnV5Y29pbnNQcmljZS03Z", # will be used in buy and sell API
        "cryptocurrency": "bitcoin",
        "buyPricePerCoin": "16530037.235",
        "minBuy": "0.001",
        "maxBuy": "0.45663548",
        "expiresAt": 1612008724
      },
      {
        "id": "QnV5Y29pbnNQcmljZS04Y2ZhYjhmNS0yYTEwLTQ1NzUtOWRhNi1jNzQ4MWY5MDIyODk=",
        "cryptocurrency": "ethereum",
        "buyPricePerCoin": "656408.797",
        "minBuy": "0.02",
        "maxBuy": "11.49923881",
        "expiresAt": 1612008724
      },
    ]
  }
}
```

#### Buy
To buy cryptocurrency with the API:

```js
buycoins.orders.buy({
    amount: 0.01,
    price: "QnV5Y29pbnNQcmljZS04Y2ZhYjhmNS0yYTEwLTQ1NzUtOWRhNi1jNzQ4MWY5MDIyODk=",
    crypto: "ethereum",
})
```

#### Sell

To sell cryptocurrency with the API:

```js
buycoins.orders.sell({
    amount: 0.01,
    price: "QnV5Y29pbnNQcmljZS04Y2ZhYjhmNS0yYTEwLTQ1NzUtOWRhNi1jNzQ4MWY5MDIyODk=",
    crypto: "ethereum",
})
```

BuyCoins API docs: [https://developers.buycoins.africa/placing-orders/sell](https://developers.buycoins.africa/placing-orders/sell)

#### Get Order

The buy and sell API usually returns an order object, To get the order, so that you can check the status:

```js
buycoins.orders.getOrder(<order-id>)
```

#### Get Price ID

Too lazy to loop over `getPrice` and get the correct ID for the crypto? We got you!

When buying:
```js
buycoins.orders.getPriceID(0.01,"ethereum", "Buy") 
```

When selling:
```js
buycoins.orders.getPriceID(0.01,"ethereum", "Sell") 
```

### P2P Trading

BuyCoins API docs: [https://developers.buycoins.africa/p2p/introduction](https://developers.buycoins.africa/p2p/introduction)

#### Dynamic Price Expiry

You can find out when next dynamic prices will be updated

```js
buycoins.p2p.getOrdersExpiry({
  status: "open"
})
```
BuyCoins API docs: [https://developers.buycoins.africa/p2p/post-limit-order#dynamic-price-expiry](https://developers.buycoins.africa/p2p/post-limit-order#dynamic-price-expiry)

#### Placing a limit order

You can place a static limit order using the `placeLimitOrder` method. `StaticPrice` is required:

```js
buycoins.p2p.placeLimitOrder({
    orderSide: "buy",
    amount: 0.01, 
    crypto: "bitcoin", 
    priceType: "static",
    staticPrice: 6000000,
  }
)
```

You can place a dynamic limit order using the `placeLimitOrder` method. `dynamicExchangeRate` is required:

```js
buycoins.p2p.placeLimitOrder({
    orderSide: "buy",
    amount: 0.01, 
    crypto: "bitcoin", 
    priceType: "dynamic",
    dynamicExchangeRate: 1.5,
  }
)
```

BuyCoins API docs: [https://developers.buycoins.africa/p2p/placing-a-limit-order](https://developers.buycoins.africa/p2p/placing-a-limit-order)

#### Placing a limit order

To post a market order call the `postMarketOrder` method.

Note from API documentation:
> When you want to sell cryptocurrency, orderSide should be buy so that your order is matched with a buy limit order. To buy cryptocurrency, orderSide should be sell

```js
buycoins.p2p.postMarketOrder({
    orderSide: "buy", // change to `sell` if you are buying crypto
    amount: 0.01, 
    crypto: "bitcoin", 
  }
)
```

BuyCoins API docs: [https://developers.buycoins.africa/p2p/post-market-order#when-to-place-a-market-order](https://developers.buycoins.africa/p2p/post-market-order#when-to-place-a-market-order)

#### Get Orders

You can retrieve a list of orders you have placed by calling the `getOrders` method. 

```js
buycoins.p2p.getOrders({
  status: "open" // change to `completed` if you want to retrieve completed orders
})
```

BuyCoins API docs: [https://developers.buycoins.africa/p2p/get-orders#open-and-completed-orders](https://developers.buycoins.africa/p2p/get-orders#open-and-completed-orders)

#### Get Market Orders

You can view the market book using the `getMarketBook` query.

```js
buycoins.p2p.getMarketBook()
```

BuyCoins API docs: [https://developers.buycoins.africa/p2p/get-market-book](https://developers.buycoins.africa/p2p/get-market-book)

#### Placing a limit order

You can place a static limit order using the `placeLimitOrder` method. `StaticPrice` is required:

```js
buycoins.p2p.placeLimitOrder({
    orderSide: "buy",
    amount: 0.01, 
    crypto: "bitcoin", 
    priceType: "static",
    staticPrice: 6000000,
  }
)
```

You can place a dynamic limit order using the `placeLimitOrder` method. `dynamicExchangeRate` is required:

```js
buycoins.p2p.placeLimitOrder({
    orderSide: "buy",
    amount: 0.01, 
    crypto: "bitcoin", 
    priceType: "dynamic",
    dynamicExchangeRate: 1.5,
  }
)
```

BuyCoins API docs: [https://developers.buycoins.africa/p2p/placing-a-limit-order](https://developers.buycoins.africa/p2p/placing-a-limit-order)

### Send

#### Network Fees

To get estimated network fees before sending

```
buycoins.send.getEstimatedNetworkFee({
  crypto: "bitcoin",
  amount: 0.01
})
```

BuyCoins API docs: [https://developers.buycoins.africa/sending/network-fees](https://developers.buycoins.africa/sending/network-fees)

#### Send Cryptocurrency 

This allows you to send cryptocurrency to an on-chain address.

```
buycoins.send.sendCrypto({
  crypto: "bitcoin",
  amount: 0.01,
  address: "<on-chain-address>"
})
```

BuyCoins API docs: [https://developers.buycoins.africa/sending/send](https://developers.buycoins.africa/sending/send)

#### Account Balance

To get account balance of all cryptocurrency:

```
buycoins.send.getBalance()
```

To get account balance of a particular cryptocurrency:

```
buycoins.send.getBalance({
  crypto: "bitcoin"
})
```

BuyCoins API docs: [https://developers.buycoins.africa/sending/account-balances](https://developers.buycoins.africa/sending/account-balances)


### Receive

#### Create Address

To receive cryptocurrency, you will first have to create an address on BuyCoins.

```js
buycoins.receive.createAddress({
  crypto: "bitcoin"
})
```
BuyCoins API docs: [https://developers.buycoins.africa/receiving/create-address](https://developers.buycoins.africa/receiving/create-address)

### Run your own GraphQL queries

If we are yet to implement some features or you want to run some customized queries outside what the API provides. You can access the `query` function.

```js
buycoins.api.request(`query{
  getPrices{
    id
    cryptocurrency
    buyPricePerCoin
    minBuy
    maxBuy
    expiresAt
  }
}`)
```

You can pass in options to the query:

```js
const options = {
  name: "wanda"
}

buycoins.api.request(`mutation($name: String!) {
  createDepositAccount(accountName: name) {
    accountNumber
    accountName
    accountType
    bankName
    accountReference
  }
}`, options)
```

### Feature Parity with the Buycoins API

This project is in continous development and is striving for feature parity with the Buycoins API.The sections of the Buycoins API yet to be implemented are listed below:

- [Webhook](https://developers.buycoins.africa/webhooks/introduction)


### Contributing.

Your pull request are definitely welcome :heart:! We alway looking to add more test and acheive feature parity with the Buycoins API. Take a look at [Contributing.md](Contributing.md)


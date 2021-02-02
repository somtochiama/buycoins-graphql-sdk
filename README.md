# Buycoins GraphQL SDK

A simple javascript SDK for the [Buycoins API](https://developers.buycoins.africa)

[![codecov](https://codecov.io/gh/SomtochiAma/buycoins-graphql-sdk/branch/main/graph/badge.svg?token=R4Q1P67I5R)](https://codecov.io/gh/SomtochiAma/buycoins-graphql-sdk)

## Installation

```sh
npm i buycoins-graphql-sdk
```

### Authentication 

To access the Buycoins API, you will need to generate to generate a public and a secret key on thr `API Settings` screen in the Buycoins app. Enable this feature by sending a request to <support@buycoins.africa>.

From the Buycoins API documentation:

> The API is currently open to access requests from *fully verified* BuyCoins users. To apply, please send an email to support@buycoins.africa from your email account registered on BuyCoins.

## Quick Start

To create a naira deposit account:

```js
import { Buycoins } from 'buycoins-graphql-sdk'

// Pass in the public and secret key when creating a new instance.
var buycoinsClient = new Buycoins(process.env.PUBLIC_KEY, process.env.SECRET_KEY)

// The SDK is promise based :). You can also use async/await
buycoinsClient.nairaAccount.createDepositAccount({
    accountName: "somtochi test"
})
.then(data => {
    // TODO: Handle error
})
.catch(err => {
   // TODO: Handle error
})
```

That's it!

## Usage

The SDK models the API and each property in the `Buycoins` matches with a section in the Buycoins API documentation.

### Naira Token Account

#### Create Virtual Deposit Account
To create a virtual bank account:

```
buycoins.NairaAccount.createDepositAccount({
    accountName: <replace-with-account-name>
})
```

BuyCoins API docs: (https://developers.buycoins.africa/naira-token-account/create-virtual-deposit-account)[https://developers.buycoins.africa/naira-token-account/create-virtual-deposit-account]

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
        "id": "QnV5Y29pbnNQcmljZS03ZjdmNWZlYy1kYWU1LTQ3MjItYWFhMS1mOTAxNGQzZWZjNmE=", # will be used in buy and sell API
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

To buy cryptocurrency with the API:

```js
buycoins.orders.sell({
    amount: 0.01,
    price: "QnV5Y29pbnNQcmljZS04Y2ZhYjhmNS0yYTEwLTQ1NzUtOWRhNi1jNzQ4MWY5MDIyODk=",
    crypto: "ethereum",
})
```

BuyCoins API docs: (https://developers.buycoins.africa/placing-orders/sell)[https://developers.buycoins.africa/placing-orders/sell]

### Get Price ID

Too lazy to loop over `getPrice` and get the correct ID for the crypto? We got you!

When buying:
```js
buycoins.orders.getPriceID(0.01,"ethereum", "Buy") 
```

When selling:
```js
buycoins.orders.getPriceID(0.01,"ethereum", "Sell") 
```


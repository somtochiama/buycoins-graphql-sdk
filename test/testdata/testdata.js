export const priceData =  {
    getPrices: [
        {
            "id": "2",
            "cryptocurrency": "bitcoin",
            "buyPricePerCoin": "16530037.235",
            "minBuy": "0.001",
            "maxBuy": "0.45663548",
            "expiresAt": 1612008724
          },
          {
            "id": "2",
            "cryptocurrency": "ethereum",
            "buyPricePerCoin": "656408.797",
            "minBuy": "0.02",
            "maxBuy": "11.49923881",
            "expiresAt": 1612008724
          }
    ]
}

export const mockClient = {
  request: "",
}

export const createNairaAccountData = {
  createDepositAccount: {
    accountNumber: '9977055301',
    accountName: 'somtochi test',
    accountType: 'deposit',
    bankName: 'Providus Bank',
    accountReference: 'e994df44-3383-4d2a-bebd-3e4c0e59f6a7'
  }
}

export const getOrdersExpiry = {
  "data": {
    "getOrders": {
      "dynamicPriceExpiry": 1612243795
    }
  }
}

export const getOrders = {
  "data": {
    "getOrders": {
      "dynamicPriceExpiry": 1612244515,
      "orders": {
        "edges": [
          {
            "node": {
              "id": "UG9zdE9yZGVyLWQyMzBhYTU4LWU2ZDktNDM2MS04ODFlLWUzNTc1N2EwMWY2Nw==",
              "cryptocurrency": "bitcoin",
              "coinAmount": "0.00998924",
              "side": "buy",
              "status": "active",
              "createdAt": 1612242637,
              "pricePerCoin": "50872.0",
              "priceType": "dynamic",
              "staticPrice": null,
              "dynamicExchangeRate": "1"
            }
          },
          {
            "node": {
              "id": "UG9zdE9yZGVyLWUxZmY1YWZjLTRhN2EtNDBmYS1hOWJmLWY4YjY4YTk0NjU4NA==",
              "cryptocurrency": "bitcoin",
              "coinAmount": "0.00998729",
              "side": "buy",
              "status": "active",
              "createdAt": 1612242475,
              "pricePerCoin": "50872.0",
              "priceType": "dynamic",
              "staticPrice": null,
              "dynamicExchangeRate": "1"
            }
          }
        ]
      }
    }
  }
}

export const marketBook = {
  "data": {
    "getMarketBook": {
      "dynamicPriceExpiry": 1612245175,
      "orders": {
        "edges": [
          {
            "node": {
              "id": "UG9zdE9yZGVyLWE0YjgzZDNlLTJlMzUtNDM1My04Y2UxLWQwNzJlNTQzZDFhZQ==",
              "cryptocurrency": "bitcoin",
              "coinAmount": "0.04",
              "side": "sell",
              "status": "active",
              "createdAt": 1612244815,
              "pricePerCoin": "16754620.83",
              "priceType": "static",
              "staticPrice": "1675462083",
              "dynamicExchangeRate": null
            }
          },
          {
            "node": {
              "id": "UG9zdE9yZGVyLWQyMzBhYTU4LWU2ZDktNDM2MS04ODFlLWUzNTc1N2EwMWY2Nw==",
              "cryptocurrency": "bitcoin",
              "coinAmount": "0.00997582",
              "side": "buy",
              "status": "active",
              "createdAt": 1612242637,
              "pricePerCoin": "50940.21",
              "priceType": "dynamic",
              "staticPrice": null,
              "dynamicExchangeRate": "1"
            }
          },
        ]
      }
    }
  }
}

export const networkFees = {
  "data": {
    "getEstimatedNetworkFee": {
      "estimatedFee": "0.00046",
      "total": "0.01046"
    }
  }
}

export const getBalances = {
  "data": {
    "getBalances": [
      {
        "id": "QWNjb3VudC0=",
        "cryptocurrency": "usd_tether",
        "confirmedBalance": "0.0"
      },
      {
        "id": "QWNjb3VudC0=",
        "cryptocurrency": "naira_token",
        "confirmedBalance": "2655.18"
      },
    ]
  }
}
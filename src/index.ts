// For test

import { Buycoins } from './app'

const buycoinsClient = new Buycoins(process.env.PUBLIC_KEY, process.env.SECRET_KEY)

buycoinsClient.orders.sell({
    crypto: "bitcoin",
    amount: 0.01,
    price: "QnV5Y29pbnNQcmljZS0zOGIwYTg1Yi1jNjA1LTRhZjAtOWQ1My01ODk1MGVkMjUyYmQ"
})
.then(data => console.log(data))
.catch(err => {
    if (err.response) {
        console.log(err.response)
    } else {
        console.log(err)
    }
})

// buycoinsClient.orders.buy({
//     amount: 0.001,
//     crypto: "ethereum",
//     price: "QnV5Y29pbnNQcmljZS1lMjdjY2FjMy03YjAxLTRhMzYtOWM5Yi1lODUxY2Q2YzE2ZjY="
// })
//             .then(data => console.log(data))
//             .catch(err => {
//                 if (err.response) {
//                     console.log(err.response)
//                 } else {
//                     console.log(err)
//                 }
//             })

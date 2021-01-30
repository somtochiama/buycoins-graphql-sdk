// For test

import Orders from './packages/order'

const buycoinsClient = new Orders(null)

buycoinsClient.getPrices()
.then(data => console.log(data))
.catch(err => {
    if (err.response) {
        console.log(err.response)
    } else {
        console.log(err)
    }
})

// buycoinsClient.orders.buy(0.1, "litecoin")
//             .then(data => console.log(data))
//             .catch(err => {
//                 if (err.response) {
//                     console.log(err.response)
//                 } else {
//                     console.log(err)
//                 }
//             })


// buycoinsClient.nairaAccount.createDepositAccount("somtochi test")
// .then(data => console.log(data))
// .catch(err => {
//     if (err.response) {
//         console.log(err.response)
//     }
//     console.log(err)
// })
// id: 'T3JkZXItNzBiODA5YzUtZTAxOS00MGM3LWFkMWYtODkzYjgxNzY4MTRj',
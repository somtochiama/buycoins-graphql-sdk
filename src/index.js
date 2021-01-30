import Buycoins from './app'

var buycoinsClient = new Buycoins(process.env.PUBLIC_KEY, process.env.SECRET_KEY)

buycoinsClient.orders.getPrices()
.then(data => console.log(data))
.catch(err => {
    if (err.response) {
        console.log(err.response)
    } else {
        console.log(err)
    }
})

// var data =  buycoinsClient.orders.buy(0.1, "litecoin")
//             .then(data => console.log(data))
//             .catch(err => {
//                 if (err.response) {
//                     console.log(err.response)
//                 } else {
//                     console.log(err)
//                 }
//             })


// var data =  buycoinsClient.nairaAccount.create("somtochi test")
// .then(data => console.log(data))
// .catch(err => {
//     if (err.response) {
//         console.log(err.response.errors)
//     }
//     console.log(err)
// })
// id: 'T3JkZXItNzBiODA5YzUtZTAxOS00MGM3LWFkMWYtODkzYjgxNzY4MTRj',
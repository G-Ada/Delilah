const ordersRepo = require('../repository/orders.repo')

const ordersServices = {
    getOrdersWithProducts: async () => {
        let orders = await ordersRepo.getOrders()
        let products = await ordersRepo.getProducts()
        try {
            for (let i = 0; i < orders.length; i++) {
                orders[i].products = []
                for (let u = 0; u < products.length; u++) {
                    if (orders[i].orderID == products[u].orderID) {
                        orders[i].products.push(products[u])
                    }
                }
            }
            return orders
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    getOrdersByUserID: async (id) => {
        let orders = await ordersRepo.getOrderByUserID(id)
        let products = await ordersRepo.getProducts()
        try {
            for (let i = 0; i < orders.length; i++) {
                orders[i].products = []
                for (let u = 0; u < products.length; u++) {
                    if (orders[i].orderID == products[u].orderID) {
                        orders[i].products.push(products[u])
                    }
                }
            }
            return orders
        } catch (error) {
            console.log(error.message)
            return error
        }
    }
}

module.exports = ordersServices
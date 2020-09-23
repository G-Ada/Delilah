const { async } = require("hasha")
const Sequelize = require("sequelize")
const sql = new Sequelize("mysql://root@localhost:3306/delilah")
const productsRepo = require('./products.repo')

const ordersRepository = {
    createOrder: async (data, id) => {
        await sql.query(`INSERT INTO orders
        (delivery_state, order_time, payment_method, userID)
        values(?, ?, ?, ?)`,
        {
            replacements: [
                data.delivery_state,
                data.order_time,
                data.payment_method,
                id
            ]
        })
        let orderID = await sql.query('SELECT id FROM orders WHERE id = LAST_INSERT_ID()', {type: sql.QueryTypes.SELECT})
        return orderID[0].id
    },
    addProducts: async(data, orderID) => {
            for (let i = 0; i < data.products.length; i++) {
                let product = await productsRepo.getProductById(data.products[i].id)
                await sql.query(`INSERT INTO productorders
                (productID, orderID, quantity, price)
                values (?, ?, ?, ?)`,
                {
                    replacements: [
                        data.products[i].id,
                        orderID,
                        data.products[i].quantity,
                        product.price
                    ]
                })
            }
    },
    getProducts: async () => {
        try {
            let products = await sql.query(`SELECT 
            products.name AS product,
            productorders.quantity,
            productorders.price,
            productorders.orderID
            FROM productorders
            INNER JOIN products ON products.id = productorders.productID
            ORDER BY productorders.orderID`,
            {type: sql.QueryTypes.SELECT})
            return products
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    getOrders: async () => {
        try {
            let orders = await  sql.query(`SELECT 
            orders.id AS orderID,
            orders.order_time AS Time, 
            orders.delivery_state AS Status,
            orders.payment_method,
            users.full_name AS User,
            users.adress
            FROM orders
            INNER JOIN users ON users.id = orders.userID
            ORDER BY orders.id
            `, 
             {type: sql.QueryTypes.SELECT})
            return orders
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    getOrderByUserID: async(id) => {
        let orders = await sql.query(`SELECT 
        orders.id AS orderID,
        orders.order_time AS Time, 
        orders.delivery_state AS Status,
        orders.payment_method
        FROM orders WHERE orders.userID = ${id}
        `, 
         {type: sql.QueryTypes.SELECT})
        return orders
    },
    getOrderByID: async(id) => {
        let order = await sql.query(`SELECT * FROM orders WHERE id = ${id}`, 
        {type: sql.QueryTypes.SELECT})
        return order
    },
    updateDeliveryState: async(state, id)=> {
        try {
            let newDeliveryState = await sql.query('UPDATE orders SET delivery_state = :value WHERE id = :id',
        {
            replacements: {
                value: state,
                id: id
            }
        })
        return newDeliveryState
        } catch (error) {
            console.log(error.message)
            return error
        }
        
    }
}
module.exports = ordersRepository
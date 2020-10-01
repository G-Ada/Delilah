const express = require('express')
const routes = express.Router()
const ordersRepository = require('../repository/orders.repo')
const ordersServices = require('../services/orders.services')
const middlewares = require('../middlewares/middlewares')
const jwt = require('jsonwebtoken')

routes.post('/add', middlewares.authentication, async (req, res) => {
    const data = req.body
    try {
        let token = req.cookies.galletita
        let decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(data.products.length != 0){
            let order = await ordersRepository.createOrder(data, decoded.data)
            await ordersRepository.addProducts(data, order)
            res.status(200).send('Creado')
        } else {
            throw new Error ('El pedido no tiene productos')
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

routes.get('', middlewares.authorization, async (req, res) => {
    try {
        let orders = await ordersServices.getOrdersWithProducts()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

routes.get('/:id', middlewares.authorization, async (req, res) => {
    let id = req.params.id
    try {
        let orders = await ordersServices.getOrdersByUserID(id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

routes.put('/:id', middlewares.onlyAdmin, async (req, res) => {
    try {
        let id = req.params.id
        let state = req.body.delivery_state
        if (state) {
            await ordersRepository.updateDeliveryState(state, id)
            let newOrder = await ordersRepository.getOrderByID(id)
            res.status(200).json(newOrder)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

module.exports = routes
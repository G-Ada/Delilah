const express = require('express')
const { async } = require('hasha')
const routes = express.Router()
const ordersRepository = require('../repository/orders.repo')
const ordersServices = require('../services/orders.services')

routes.post('/add', async (req, res) => {
    const data = req.body
    try {
        let order = await ordersRepository.createOrder(data, data.id)
        await ordersRepository.addProducts(data, order)
        res.status(200).send('Creado')
    } catch (error) {
        res.status(500).json(error.message)
    }
})

routes.get('', async (req, res) => {
    try {
        let orders = await ordersServices.getOrdersWithProducts()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

routes.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let orders = await ordersServices.getOrdersByUserID(id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

routes.put('/:id', async (req, res) => {
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
        res.status(500).json({error: error.message})
    }
})

module.exports = routes
const express = require('express')
const routes = express.Router()
const productsServices = require('../services/products.services')
const productsRepo = require('../repository/products.repo')
const middlewares = require('../middlewares/middlewares')


routes.get('', async (req, res) => {
    try {
        let products = await productsRepo.getAllProducts()
        if(products.length > 0){
            res.status(200).json(products)
        } else {
            res.status(404).send('No hay ningún producto')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

routes.get('/:id', async(req, res)=> {
    try {
        let id = req.params.id
        let product = await productsRepo.getProductById(id)
        if(product){
            res.status(200).json(product)
        } else {
            res.status(404).send('El producto no existe')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

routes.delete('/:id',middlewares.onlyAdmin, async(req, res)=> {
    try {
        let id = req.params.id
        let product = await productsRepo.deleteProduct(id)
        if(product == 'ok'){
            res.status(200).send('Producto eliminado con éxito')
        } else {
            res.status(400).send('Hubo un error')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

routes.put('/:id',middlewares.onlyAdmin, async(req, res)=>{
    try {
        let id = req.params.id
        let data = req.body
        await productsServices.updateProduct(data, id)
        let newProduct = await productsRepo.getProductById(id)
        res.status(200).json(newProduct)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

routes.post('/add',middlewares.onlyAdmin, async(req,res)=> {
    try {
        let data = req.body
        let newProductID = await productsRepo.createProduct(data)
        let product = await productsRepo.getProductById(newProductID)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({eror: error.message})
    }
})

module.exports = routes
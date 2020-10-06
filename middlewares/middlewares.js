const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const userRepository = require('../repository/users.repo')
const productsRepo = require('../repository/products.repo')
require('dotenv').config()

app.use(cookieParser())

const middlewares = {
    authentication: async (req, res, next) => {
        try {
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded){
                next()
            }
        } catch (error) {
            console.log(error)
            res.status(401).send('Debes ingresar con un usuario válido')
        }
    },
    authorization: async (req, res, next) => {
        try {
            let id =  req.params.id
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            let user = await userRepository.findUserById(decoded.data)
            if (user[0].admin == 1 || user[0].id == id) {
                next()
            } else {
                throw new Error('No estas autorizado')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send(error.message)
        }
    },
    onlyAdmin: async (req, res, next) => {
        try {
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            let user = await userRepository.findUserById(decoded.data)
            if (user[0].admin == 1) {
                next()
            } else {
                throw new Error('No estas autorizado')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send(error.message)
        }
    },
    onlyUser: async(req, res, next) => {
        try {
            let id = req.params.id
            let token = req.cookies.galletita
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.data == id) {
                next()
            } else {
                throw new Error('No estas autorizado')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send(error.message)
        }
    },
    checkIfProductExists: async(req, res, next) => {
        try {
            let data = req.body.products
            let product = null
            for (let i = 0; i < data.length; i++) {
                product = await productsRepo.getProductById(data[i].id)
                console.log(product)
                if (!product) {
                    throw new Error ('El o los productos seleccionados no existen')
                }
            }
            next()
        } catch (error) {
            res.json(error.message)
        }
    }
}

module.exports = middlewares
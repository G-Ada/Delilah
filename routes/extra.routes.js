const express = require('express')
const routes = express.Router()
const userRepository = require('../repository/users.repo')
const userServices = require('../services/users.services')
const middlewares = require('../middlewares/middlewares')

routes.post('/register', async (req, res) => {
    const user = req.body
    let existingUser = await userServices.checkExistingUser(user)
    let usedUserName = await userServices.checkUsedUserName(user)
    try {
        if (existingUser) {
            res.status(400).send('El usuario ya existe')
        } else {
            if(!usedUserName){
                userRepository.insert(user)
                res.status(200).json(user)
            } else {
                res.status(400).send('El nombre de usuario ya esta ocupado')
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

routes.post('/login', async(req, res) => {
    const data = req.body
    let user = null
    try {
        user = await userRepository.login(data.username, data.password)
        if(user.length != 0){
            let findUser = await userRepository.findUserByUserName(data.username)
            let id = findUser[0].id
            let token = userServices.generateToken(id)
            res.cookie("galletita", token, {
                httpOnly: true
            })
            res.status(200).send('Ha ingresado con éxito')
        } else {
            res.status(401).send('El usuario no es válido')
        }
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message})
    }
})

module.exports = routes;
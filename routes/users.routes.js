const express = require('express')
const middlewares = require('../middlewares/middlewares')
const routes = express.Router()
const repositoryUsers = require('../repository/users.repo')
const userServices = require('../services/users.services')

routes.get("",middlewares.onlyAdmin, async (req, res) => {
    try {
        let users = await userServices.showManyUsersData();
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(404).send('No se encontraron usuarios')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

routes.get('/:id',middlewares.authorization, async(req, res) => {
    const data = req.params.id
    try {
        let user = await userServices.showUserData(data)
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).send('El usuario no existe')
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
})

routes.delete('/:id',middlewares.authorization, async (req, res)=> {
    const data = req.params.id
    try {
        let user = await repositoryUsers.findUserById(data);
        if(user.length !=0){
            repositoryUsers.deleteUserById(data);
            res.status(200).send('Usuario eliminado')
        }else {
            res.sendStatus(404)
        }  
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Hubo un error')
    }
})

routes.put('/:id',middlewares.onlyUser, async (req, res) => {
    const data = req.body
    const id = req.params.id
    try {
        await userServices.updateUser(data, id)
        let newUser = await userServices.showUserData(id)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = routes


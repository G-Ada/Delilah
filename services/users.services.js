const repository = require('../repository/users.repo')
const jwt = require('jsonwebtoken')

const userServices = {
    checkExistingUser: async (user) => {
        let existingUser = await repository.findUserByFullName(user.fullname)
        if (!existingUser.length) {
            return false
        } else {
            return true
        }
    },
    checkUsedUserName: async (user) => {
        let userName = await repository.findUserByUserName(user.username)
        if (!userName.length) {
            return false
        } else {
            return true
        }
    },
    generateToken: (data) => {
        try {
            const resultado = jwt.sign({ data },
                process.env.SECRET_KEY)
            return resultado
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    showUserData: async (id) => {
        try {
            const data = await repository.findUserById(id)
            if (data.length != 0) {
                const user = {
                    id: data[0].id,
                    username: data[0].username,
                    fullname: data[0].fullname,
                }
                return user
            } else {
                return false
            }
        } catch (error) {
            console.log(error.message)
            return error
        }

    },
    showManyUsersData: async () => {
        const users = []
        try {
            const data = await repository.showAllUsers()
            if(data.length !=0) {
                for (let i = 0; i < data.length; i++) {
                    let user = {
                        id: data[i].id,
                        username: data[i].username,
                        fullname: data[i].fullame,
                    }
                    users.push(user)
                }
                return users
            } else {
                return false
            }
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updateUser: async(data, id) => {
        const info = [data.username, data.fullname, data.mail, data.phone, data.adress, data.password]
        console.log(info)
        try {
            if(info[0]){
                await repository.updateName(info[0], id)
            }
            if(info[1]){
                await repository.updatelastName(info[1], id)
            }
            if(info[2]){
                await repository.updateUser(info[2], id)
            }
            if(info[3]){
                await repository.updateUser(info[3], id)
            }
            if(info[4]){
                await repository.updateUser(info[4], id)
            }
            if(info[5]){
                await repository.updateUser(info[5], id)
            }
        } catch (error) {
            console.log(error.message)
            return error
        }
    }
   
}

module.exports = userServices;
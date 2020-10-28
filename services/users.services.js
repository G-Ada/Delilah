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
                    fullname: data[0].full_name,
                    mail: data[0].mail,
                    phone: data[0].phone,
                    adress: data[0].adress
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
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    let user = {
                        id: data[i].id,
                        username: data[i].username,
                        fullname: data[i].full_name,
                        mail: data[i].mail,
                        phone: data[i].phone,
                        adress: data[i].adress
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
    updateUser: async (data, id) => {
            try {
                for(let property in data) {
                    await repository.update(property, data[property], id)
                } 
            } catch (error) {
                console.log(error.message)
                return error
            }
    }

}

module.exports = userServices;
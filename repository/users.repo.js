const sql = require('../conection')
const hash = require('hasha');

const userMethods = {
    insert: (user) => {
        let hashedPass = hash(user.password);
        sql.query(`
            INSERT INTO users
            (username, full_name, mail, phone, adress, password, admin)
            values (?, ?, ?, ?, ?, ?, ?)
            `,
            {
                replacements:
                    [user.username,
                    user.fullname,
                    user.mail,
                    user.phone,
                    user.adress,
                    hashedPass,
                    user.admin]
            }).then(result => {
                return result
            }).catch(error => {
                return error
            })
    },
    findUserByFullName: async (fullname) => {
        try {
            const user = await sql.query(`SELECT * FROM users WHERE full_name = :fullname`,
                {
                    replacements: {
                        fullname: fullname
                    },
                    type: sql.QueryTypes.SELECT
                })
            return user
        } catch (error) {
            console.log(error.message)
            return error
        }

    },
    findUserByUserName: async (username) => {
        try {
            const user = await sql.query('SELECT * FROM users WHERE username = :user',
                {
                    replacements: {
                        user: username
                    },
                    type: sql.QueryTypes.SELECT
                })
            return user
        } catch (error) {
            console.log(error.message)
            return error
        }

    },
    findUserById: async (id) => {
        try {
            const user = await sql.query(`SELECT * FROM users WHERE id = ${id}`,
                {
                    type: sql.QueryTypes.SELECT
                })
            return user
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    login: async (username, password) => {
        try {
            let pass = hash(password)
            const findUser = await sql.query('SELECT * FROM users WHERE username = :username AND password = :password',
                {
                    replacements: {
                        username: username,
                        password: pass
                    },
                    type: sql.QueryTypes.SELECT
                })
            return findUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    showAllUsers: async () => {
        try {
            const users = await sql.query('SELECT * FROM users', { type: sql.QueryTypes.SELECT })
            return users
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    deleteUserById: async (id) => {
        try {
            sql.query('DELETE FROM users WHERE id = :id',
                {
                    replacements: {
                        id: id
                    }
                })
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updateUsername: async (username, id) => {
        try {
            let newUser = await sql.query('UPDATE users SET username = :username WHERE id = :id',
                {
                    replacements: {
                        username: username,
                        id: id
                    }
                })
            return newUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updateFullname: async (fullname, id) => {
        try {
            let newUser = await sql.query('UPDATE users SET full_name = :fullname WHERE id = :id',
                {
                    replacements: {
                        fullname: fullname,
                        id: id
                    }
                })
            return newUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updateMail: async (mail, id) => {
        try {
            let newUser = await sql.query('UPDATE users SET mail = :mail WHERE id = :id',
                {
                    replacements: {
                        mail: mail,
                        id: id
                    }
                })
            return newUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updatePhone: async (phone, id) => {
        try {
            let newUser = await sql.query('UPDATE users SET phone = :phone WHERE id = :id',
                {
                    replacements: {
                        phone: phone,
                        id: id
                    }
                })
            return newUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updateAdress: async (adress, id) => {
        try {
            let newUser = await sql.query('UPDATE users SET adress = :adress WHERE id = :id',
                {
                    replacements: {
                        adress: adress,
                        id: id
                    }
                })
            return newUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    updatePassword: async (password, id) => {
        try {
            let newUser = await sql.query('UPDATE users SET password = :password WHERE id = :id',
                {
                    replacements: {
                        password: password,
                        id: id
                    }
                })
            return newUser
        } catch (error) {
            console.log(error.message)
            return error
        }
    }

}

module.exports = userMethods;
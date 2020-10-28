const sql = require('../conection')
const hash = require('hasha');
const { async } = require('hasha');

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
    updateUser: async(property, value, id) => {
        try {
            let newUser = await sql.query(`UPDATE users SET ${property} = :value WHERE id = :id`,
                {
                    replacements: {
                        value: value,
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
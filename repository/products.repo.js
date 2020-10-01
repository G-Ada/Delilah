const sql = require('../conection')

const productsRepo = {
    getAllProducts: async() => {
        try {
            let products = await sql.query('SELECT * FROM products', { type: sql.QueryTypes.SELECT })
            return products
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    getProductByName: async (name)=>{
        try {
            let products = await sql.query('SELECT * FROM products WHERE name = :name',{
                replacements: {
                    name: name
                },
                type: sql.QueryTypes.SELECT
            })
        return products
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    getProductById: async(id)=> {
        try {
            let product = await sql.query('SELECT * FROM products WHERE id = :id', {
                replacements: {
                    id: id
                },
                type: sql.QueryTypes.SELECT
            })
            return product[0]
        } catch (error) {
            return error
        }
    },
    createProduct: async(data)=>{
        try {
            let product =  await sql.query(`
            INSERT INTO products
            (name, price, image)
            values (?, ?, ?)`,
            {
                replacements:
                [
                    data.name,
                    data.price,
                    data.image
                ],
            })
            //El primer valor del array es el id del producto insertado
            return product[0]
        } catch (error) {
            return error
        }
    },
    deleteProduct: async(id)=> {
        try {
            await sql.query('DELETE FROM products WHERE id = :id',
                {
                    replacements: {
                        id: id
                    }
                })
            return 'ok'
        } catch (error) {
            console.log(error.message)
            return error
        }
    },
    update: async (property, value, id) => {
        try {
            let newProduct = await sql.query(`UPDATE products SET ${property} = :value WHERE id = :id`,
                {
                    replacements: {
                        value: value,
                        id: id
                    }
                })
            return newProduct
        } catch (error) {
            console.log(error.message)
            return error
        }
    }

}

module.exports = productsRepo;
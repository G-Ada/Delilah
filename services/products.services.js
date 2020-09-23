const productsRepo = require('../repository/products.repo')

const productsServices = {
    updateProduct: async (data, id) => { 
        try {
            for(let property in data) {
                await productsRepo.update(property, data[property], id)
            } 
        } catch (error) {
            console.log(error.message)
            return error
        }
    }
}

module.exports = productsServices;
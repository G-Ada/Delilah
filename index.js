const express = require('express')
const app = express()
const extraRoutes = require('./routes/extra.routes')
const usersRoutes = require('./routes/users.routes')
const productsRoutes = require('./routes/products.routes')
const orderRoutes = require('./routes/orders.routes')
require('dotenv').config()

app.use(express.json())

app.use("", extraRoutes)
app.use("/users", usersRoutes)
app.use("/menu", productsRoutes)
app.use("/order", orderRoutes)

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send("error en el servidor")
    }
    next();
})

app.listen(3000, () => {
    console.log("server is ready")
})
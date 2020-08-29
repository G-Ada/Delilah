const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send("error en el servidor")
    }
    next();
})

app.listen(3000, () => {
    console.log("server is ready")
})
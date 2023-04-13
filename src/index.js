const express = require('express')
const connection = require('./database/db.js')
const app = express()
require('dotenv').config()

const userRouter = require('./v1/routes/userRouter.js')
const subscriptionRouter = require('./v1/routes/subscripcionRouter.js')

const PORT = process.env.PORT

// función de middleware integrada en Express. Analiza las requests entrantes con cargas JSON
app.use(express.json())
app.use(express.urlencoded())

// Enrutado
app.use('/api', userRouter)
app.use('/api', subscriptionRouter)

// Conexion a BBDD
connection()

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})

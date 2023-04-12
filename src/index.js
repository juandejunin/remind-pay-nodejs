const express = require('express')
const connection = require('./database/db.js')
const app = express()
require('dotenv').config()

const UserRouter = require('./routes/UserRouter.js')

const PORT = process.env.PORT

// función de middleware integrada en Express. Analiza las requests entrantes con cargas JSON
app.use(express.json())
app.use(express.urlencoded())

// Enrutado
app.use('/api', UserRouter)
app.get('/', (req, res) => {
  res.status(200).send('Prueba index????')
})

// Conexion a BBDD
connection()

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})

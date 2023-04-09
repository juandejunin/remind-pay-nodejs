const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.status(200).send('Prueba index????')
})

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})

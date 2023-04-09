const express = require('express')
const { default: mongoose } = require('mongoose')
const connection = require('./database/db.js')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

connection()

app.get('/', (req, res) => {
  res.status(200).send('Prueba index????')
})

// mongoose.connect(URL_MONGO, {}
// ).then(() => {
//   console.log('DB is connected')
// }).catch(err => {
//   console.log(err)
// })

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})

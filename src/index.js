const express = require('express')
const { default: mongoose } = require('mongoose')
mongoose.set('strictQuery', true)
const app = express()
require('dotenv').config()

const PORT = process.env.PORT
const URL_MONGO = process.env.URL_MONGO

app.get('/', (req, res) => {
  res.status(200).send('Prueba index????')
})

mongoose.connect(URL_MONGO, {}
).then(() => {
  console.log('DB is connected')
}).catch(err => {
  console.log(err)
})

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})

const express = require('express')
const app = express()

const PORT = 8080

app.get('/', (req, res) => {
  res.status(200).send('Prueba index????')
})

app.listen(PORT, () => {
  console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})

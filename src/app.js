const express = require('express')

const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

app.use(express.json())

app.use('/api', uploadRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`)
})
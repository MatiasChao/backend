const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

connectDB()

const PORT = process.env.PORT || 4000

app.use(express.json({ extended: true }))
//esto puedo reemplazarlo por express.json--
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// importamos las rutas
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/restaurant', require('./routes/restaurant'))

app.listen(PORT, () => {
    console.log(`el servidor esta funcionadno en el puerto ${PORT}`)
})
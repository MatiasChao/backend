const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB conectada')
    } catch (error) {
        console.log('Error al conectar con la DB: ', error)
        process.exit(1) // detiene la app en caso de error en la app
    }
}

module.exports = connectDB;
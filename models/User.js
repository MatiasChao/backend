const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
    // ver FK con Country 
})

module.exports = mongoose.model('User', UsersSchema)
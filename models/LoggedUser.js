const mongoose = require('mongoose')

const LoggedUser = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    loggedAt: { 
        type: Date,
        default: Date.now, 
        expires: process.env.logginExpireTime 
    }
})

module.exports = mongoose.model('LoggedUser', LoggedUser)
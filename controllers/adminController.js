const LoggedUser = require('../models/LoggedUser')
const fetch = require('node-fetch')

exports.getUsersLogged = async (req, res) => {
    try {
        LoggedUser.countDocuments({}, function(err, count){
            res.send('Cantidad de usuarios logueados: ' + count)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}
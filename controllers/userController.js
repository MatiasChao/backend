const LoggedUser = require('../models/LoggedUser')
const fetch = require('node-fetch')

exports.createLoggedUser = async (req, res) => {
    try {
        let user;
        user = new LoggedUser(req.body)

        await user.save()

        res.send('Usuario logueado guardado correctamente')
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

exports.deleteLoggedUser = async (req, res) => {

    // /users/logged/:id 
    console.log(req.body.email)
}

exports.getUserInfo = async (req, res) => {
    const url = 'http://stg-api.pedidosya.com/public/v1/myAccount'

    await fetch(url, {
        headers: {
            'Authorization' : req.get('Authorization')
        }
    })
    .then(res => res.json())
    .catch(error => {
        if (error.res.code == "INVALID_TOKEN") {
            authUtil.refreshApiToken();
            refreshedApiToken = true;
        }
    })
    .then(response =>
        res.send(response)
    )
}
const LoggedUser = require('../models/LoggedUser')
const fetch = require('node-fetch')

//le tengo que mandar el userId
exports.createLoggedUser = async (req, res) => {

    console.log("llegando a createLoggedUser: ")
    console.log(req.body.email)

    res.send('Usuario logueado guardado correctamente')
    /*
    try {
        let user;
        user = new LoggedUser(req.body)

        await user.save()

        res.send('Usuario logueado guardado correctamente')
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
    */
}

// ELIMINAR EN EL USER LOGGED CUANDO CIERRA SESION
exports.deleteLoggedUser = async (req, res) => {
    console.log("llegando a createLoggedUser: ")

    // intentar que me llegue el id.. /users/logged/:id 
    console.log(req.body.email)
}

// OBTENER LA INFO DEL USER
exports.getUserInfo = async (req, res) => {
    console.log("llegando a getUserInfo: ")
    console.log("global.authorizationToken ---> ", global.authorizationToken)

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
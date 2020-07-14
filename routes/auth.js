const { response } = require('express');
const express = require('express')
const router = express.Router()
const authUtil = require('../authUtils')
const fetch = require('node-fetch')

// Servicio para obtener la autenticación de un usuario
// POST: http://localhost:4000/api/auth/user ---> pasarle el body
router.post('/user', async (req, res) => { 

    const email = req.body.email
    const password = req.body.password

    // cuando inicia sesión obtiene el auth token de la app
    const authorization = await authUtil.getApiToken()

    let response = ''

    const refreshedApiToken = false;
    let retries = 5;
    do {
        retries--
        const url = `http://stg-api.pedidosya.com/public/v1/tokens?userName=${email}&password=${password}`
        response = await fetch(url, {
            headers: {
                'Authorization' : authorization
            }
        })
        .then(res => res.json())
        .then(
            data => {
                if(data.code === 'INVALID_TOKEN') {
                    authUtil.refreshApiToken();
                    refreshedApiToken = true;
                } else if(data.code === 'USR_INVALID_CREDENTIALS') {
                    res.status(401).json({msg: 'Error en las credenciales del usuario'})
                } else {
                    res.send(data)
                }
            },
            err => {
                console.log("ERROR: ", err)
            }
        )   
    } while (refreshedApiToken && retries > 0)

    if (retries = 0)
        return res.status(401).json({ msg: 'Hubo un problema al intentar acceder a la App, intente más tarde' })

    return response;
})

module.exports = router;
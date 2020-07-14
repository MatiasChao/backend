const fetch = require('node-fetch')
const authUtil = require('../authUtils')
const { off } = require('../models/LoggedUser')

// Buscamos los restaurantes por las coordinadas que le pasamos
exports.getRestaurantByCoordinates = async (req, res) => {
    console.log("- getRestaurantByCoordinates -")
    console.log("global.authorizationToken ---> ", global.authorizationToken)
    
    //http://stg-api.pedidosya.com/public/v1/search/restaurants?country=1&point=-34.334334343,-54.232323232
    
    const country = req.body.country
    const point = req.body.point
    const offset = req.body.offset
    const max = req.body.max
    const fields = 'name,ratingScore,logo,deliveryTimeMaxMinutes,link'

    const url = `http://stg-api.pedidosya.com/public/v1/search/restaurants?country=${country}&point=${point}&max=${max}&offset=${offset}&fields=${fields}`

    console.log("OK: ---> ", global.authorizationToken)
    if(global.authorizationToken == undefined) {
        await authUtil.getApiToken()
    }

    // mandar el token de la app por header
    // hay que mandar el COUNTRY., lo saco del user logged
    // latitud y long separados por coma

    let refreshedApiToken = false;
    let retries = 5;

    do {
        console.log("ENTRE DE NUEVO: ", retries)
        retries--
        await fetch(url, {
            headers: {
                'Authorization' : global.authorizationToken
            }
        })
        .then(res => res.json())
        .then(
            data => {
                if(data.code === 'INVALID_TOKEN') {
                    console.log("Entro a invalid token...")
                    authUtil.refreshApiToken();
                    refreshedApiToken = true;
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
}
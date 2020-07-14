const fetch = require('node-fetch')
const authUtil = require('../authUtils')

exports.getRestaurantByCoordinates = async (req, res) => {
    const country = req.body.country
    const point = req.body.point
    const offset = req.body.offset
    const max = req.body.max
    const fields = 'name,ratingScore,logo,deliveryTimeMaxMinutes,link,opened'

    const url = `http://stg-api.pedidosya.com/public/v1/search/restaurants?country=${country}&point=${point}&max=${max}&offset=${offset}&fields=${fields}`

    if(global.authorizationToken == undefined) {
        await authUtil.getApiToken()
    }

    let refreshedApiToken = false;
    let retries = 5;

    do {
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
                    authUtil.refreshApiToken();
                    refreshedApiToken = true;
                } else {
                    res.send(data)
                }
            }
        )
    } while (refreshedApiToken && retries > 0)

    if (retries = 0)
        return res.status(401).json({ msg: 'Hubo un problema al intentar acceder a la App, intente más tarde' })
}
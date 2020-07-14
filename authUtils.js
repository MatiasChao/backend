const { response } = require('express');
const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

exports.getApiToken = () => {
    return this.getApiToken(false);
}

exports.refreshApiToken = () => {
    return this.getApiToken(true);
}

exports.getApiToken = async (expired) => {

    let tokenAuth = global.authorizationToken

    if (tokenAuth != undefined && !expired)
        return tokenAuth;

    const clientId = process.env.clientId
    const clientSecret = process.env.clientSecret

    const url = `http://stg-api.pedidosya.com/public/v1/tokens?clientId=${clientId}&clientSecret=${clientSecret}`
    const response = await fetch(url)
    const authCode = await response.json()
    tokenAuth = authCode.access_token
    global.authorizationToken = tokenAuth

    return tokenAuth
}

exports.getApiTokenUpdate = async (expired) => {
    let tokenAuth = ''

    const clientId = process.env.clientId
    const clientSecret = process.env.clientSecret

    const url = `http://stg-api.pedidosya.com/public/v1/tokens?clientId=${clientId}&clientSecret=${clientSecret}`
    const response = await fetch(url)
    const authCode = await response.json()
    tokenAuth = authCode.access_token

    return tokenAuth
}
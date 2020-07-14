const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// guarda el usuario logueado
// api/users/logged
router.post('/logged',
    userController.createLoggedUser
)

// elimina el usuario logueado
// api/users/
// intentar que me llegue el id.. /users/logged/:id 
router.delete('/logged',
    userController.deleteLoggedUser
)
//req a call back funtion...

// obtener la info del usuario logueado
// api/users/info
router.get('/info',
    userController.getUserInfo
)

module.exports = router;
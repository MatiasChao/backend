const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Guarda el usuario logueado
// api/users/logged
router.post('/logged',
    userController.createLoggedUser
)

// Eliminar el usuario logueado cuando cierra sesión manualmente
// api/users/logged
router.delete('/logged',
    userController.deleteLoggedUser
)

// Obtener la info del usuario logueado
// api/users/info
router.get('/info',
    userController.getUserInfo
)

module.exports = router;
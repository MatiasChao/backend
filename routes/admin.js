const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

// Obtener la info del usuario logueado
// api/admin/users
router.get('/users',
    adminController.getUsersLogged
)

module.exports = router;
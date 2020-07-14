const express = require('express')
const router = express.Router()
const userController = require('../controllers/restaurantController')

// obtener la info del usuario logueado
// api/restaurant/search
router.post('/search',
    userController.getRestaurantByCoordinates
)

module.exports = router;
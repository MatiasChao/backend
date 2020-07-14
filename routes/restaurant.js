const express = require('express')
const router = express.Router()
const userController = require('../controllers/restaurantController')

// api/restaurant/search
router.post('/search',
    userController.getRestaurantByCoordinates
)

module.exports = router;
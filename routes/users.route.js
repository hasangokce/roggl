const express = require('express')
const router = express.Router()
const UsersController = require('../controller/users.controller.js') // controller
const usersController = new UsersController()


router.post('/', usersController.lookCredentials)
router.post('/register', usersController.userRegister)

module.exports = router

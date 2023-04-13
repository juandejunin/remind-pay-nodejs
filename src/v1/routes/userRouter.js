const express = require('express')
const userController = require('../../controllers/usersController')
const { registroValidator } = require('../../middlewares/validators')
// const tokenValidator = require('../middlewares/tokenValidator')

const userRouter = express.Router()

userRouter.route('/users/register').post(registroValidator, userController.userRegister)

module.exports = userRouter

const express = require('express')
const userController = require('../../controllers/usersController')
const { registroValidator, loginValidator, modifyUserValidator } = require('../../middlewares/validators')
const tokenValidator = require('../../middlewares/tokenValidator')

const userRouter = express.Router()
// Ruta de registro de usuario:
userRouter.route('/users/register').post(registroValidator, userController.userRegister)
// Ruta que verifica el registro:
userRouter.route('/user/verify/:cryptoToken').get(userController.verifyEmail)
// Ruta de login:
userRouter.route('/users/login').post(loginValidator, userController.loginUser)
// Ruta de moficar datos del usuario
userRouter.route('/users/:id').patch(tokenValidator, modifyUserValidator, userController.modifyUser)

module.exports = userRouter

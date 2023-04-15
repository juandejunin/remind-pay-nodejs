const express = require('express')
const userController = require('../../controllers/usersController')
const { registroValidator, loginValidator, modifyUserValidator } = require('../../middlewares/validators')
const tokenValidator = require('../../middlewares/tokenValidator')

const userRouter = express.Router()
// Ruta de registro de usuario:
userRouter.route('/users/register').post(registroValidator, userController.userRegister)
// Renovar token
userRouter.route('/users/renew').post(tokenValidator, userController.renewToken)
// Ruta que verifica el registro:
userRouter.route('/users/verify/:cryptoToken').get(userController.verifyEmail)
// Ruta de login:
userRouter.route('/users/login').post(loginValidator, userController.loginUser)
// Ruta de moficar datos del usuario
userRouter.route('/users/:id').patch(tokenValidator, modifyUserValidator, userController.modifyUser)
// Ruta de reseteo del password
userRouter.route('/users/reset').post(userController.resetPassword)
// Ruta de contraseña olvidada
userRouter.route('/users/forgot-password').post(userController.forgotPassword)

module.exports = userRouter

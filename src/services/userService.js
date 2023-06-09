const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { createResponse } = require('../utils/responseGenerator')
const { signToken } = require('../utils/jwtOperations')
const { initUserSeguridad, verifyUser, buildForgotPassword, passwordReset } = require('../utils/verificationManager')
const { sendVerificationMail, sendForgotPasswordMail, sendChangedPasswordMail } = require('../utils/emailTransporter')
const buildHostName = require('../utils/hostManager')

const USER_ERROR = 'Error getting user'

const SALT_ROUNDS = 10

const MSG_NO_VERIFICADO = 'You must verify the account. Check your mail'

const userRegister = async (req) => {
  let data = null

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, data, errors.array(), 400)
  }

  const { username, email, password } = req.body
  console.log(username)

  const usernameExists = await User.findOne({ username })
  console.log(usernameExists)
  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists) {
    return createResponse(false, data, 'Invalid Email/Username    qweqweqweq', 400)
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const userData = req.body
  userData.password = passwordHash
  userData.security = initUserSeguridad()

  const createdUser = await User.create(userData)

  await sendVerificationMail(createdUser, buildHostName(req))

  data = {
    msg: 'Registered successfully. ' + MSG_NO_VERIFICADO,
    id: createdUser._id
  }

  return createResponse(true, data, null, 201)
}

const renewToken = async (req) => {
  let data = null
  const { userName, userId } = req

  const userExists = await User.findById(userId)
  console.log(userExists)

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  const userToken = {
    id: userId,
    name: userName
  }

  const token = signToken(userToken)

  data = {
    token,
    id: userId,
    name: userName,
    username: userExists.username
  }

  return createResponse(true, data, null, 200)
}

const verifyEmail = async (req) => {
  let data = null
  const { cryptoToken } = req.params

  const userExists = await User.findOne({ 'security.cryptoToken': cryptoToken })

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  userExists.security = verifyUser(userExists)

  const userUpdated = await User.update(userExists._id, userExists)

  data = {
    email: userUpdated.email,
    username: userUpdated.username,
    verified: userUpdated.security.verified
  }

  return createResponse(true, data, null, 200)
}

const loginUser = async (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return createResponse(false, null, errors.array(), 400)
  }
  // Usuario que solicita login desde el front-end
  const { email, password } = req.body
  // Buscar en la base de datos un usuario con ese email, si existe asignar a la constante userDB
  const userDB = await User.findOne({ email })
  // Si userDB existe:
  if (userDB) {
    // Comprobar que no este iniciado un proceso de cambio de contraseña, si es asi retornar error y solicitar terminar el procedimiento
    if (userDB.security?.restorePassword) {
      return createResponse(false, null, 'A password change has been requested and you must finish the process', 400)
    }

    // Si no esta en proceso de cambio de contraseña comparar las password, si no son iguales retornar un arror
    if (!bcrypt.compareSync(password, userDB.password)) {
      return createResponse(false, null, 'Invalid email o password', 401)
    }

    // Si el usuario no esta verificaco aun retornar error y un mensaje que solicite revisar el email
    if (!userDB.security?.verified) {
      return createResponse(false, null, MSG_NO_VERIFICADO, 400)
    }

    // Si paso las validaciones  crear el jwt token
    const userToken = {
      id: userDB._id,
      name: userDB.name
    }
    const token = signToken(userToken)
    const data = {
      id: userDB._id,
      name: userDB.name,
      username: userDB.username,
      token
    }
    return createResponse(true, data, null, 200)
  }
  return createResponse(false, null, 'Invalid email o password', 401)
}

const modifyUser = async (req) => {
  let data = null

  const { userId, body } = req
  const { username, name, password } = body

  const userExists = await User.findById(userId)

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  const usernameExists = await User.findOne({ username })

  if (userExists.username !== username && usernameExists) {
    return createResponse(false, data, 'Username already exists', 400)
  }
  const passwordHash = password ? await bcrypt.hash(password, SALT_ROUNDS) : userExists.password

  userExists.username = username || userExists.username
  userExists.name = name || userExists.name
  userExists.password = passwordHash

  const userUpdated = await User.update(userId, userExists)

  data = {
    id: userUpdated._id,
    name: userUpdated.name,
    username: userUpdated.username
  }

  return createResponse(true, data, null, 201)
}

const resetPassword = async (req) => {
  let data = null
  const { headers, body } = req
  const { userid, cryptotoken } = headers
  const { password } = body

  if (!password) {
    return createResponse(false, data, 'You must inform the new password', 400)
  }

  const userExists = await User.findOne({
    _id: userid,
    'security.cryptoToken': cryptotoken,
    'security.restorePassword': true
  })

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  userExists.security = passwordReset(userExists)
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  userExists.password = passwordHash

  await User.update(userExists._id, userExists)

  await sendChangedPasswordMail(userExists)

  data = {
    msg: 'The password has been updated'
  }

  return createResponse(true, data, null, 200)
}

const forgotPassword = async (req) => {
  let data = null
  const { email } = req.body

  if (!email) {
    return createResponse(false, data, 'You must provide the email to recover the password', 400)
  }

  const userExists = await User.findOne({ email })

  if (!userExists) {
    return createResponse(false, data, USER_ERROR, 400)
  }

  userExists.security = buildForgotPassword(userExists)

  const userUpdated = await User.update(userExists._id, userExists)
  await sendForgotPasswordMail(userUpdated)

  data = {
    msg: 'You have requested to change your password',
    id: userUpdated._id,
    cryptoToken: userUpdated.security?.cryptoToken
  }

  return createResponse(true, data, null, 200)
}
module.exports = {
  userRegister,
  verifyEmail,
  loginUser,
  modifyUser,
  renewToken,
  resetPassword,
  forgotPassword
}

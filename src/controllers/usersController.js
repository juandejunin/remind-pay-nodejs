const userService = require('../services/userService')

const userRegister = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.registroUsuario(req)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  userRegister
}

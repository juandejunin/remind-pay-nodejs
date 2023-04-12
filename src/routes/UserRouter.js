const express = require('express')
const User = require('../models/Users')
const UserRouter = express.Router()

UserRouter.get('/users', async (req, res) => {
  const users = await User.find({})
  return res.status(200).send({
    success: true,
    users
  })
})

UserRouter.post('/users', async (req,res) => {
  try {
    const {name, username, email, password } = req.body
    if (!name || !username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'error'
      })
    }

    const user = new User({
      name,
      username,
      email,
      password
    })
    await user.save()
    return res.status(200).send({
      success: true,
      message: 'ok'
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'error'
    })
  }
})

UserRouter.put('/users/:id', async (req, res) => {
  const { id } = req.params

  const userExists = await User.findById({ _id: id })
  console.log(userExists)

  if (!userExists) {
    return res.status(404).send({
      success: false,
      message: 'error'
    })
  }

  const { name, username, email } = req.body

  userExists.username = username || userExists.username
  userExists.name = name || userExists.name
  userExists.email = email || userExists.email

  const userUpdated = await User.findByIdAndUpdate(id, userExists)

  const data = {
    id: userUpdated._id,
    name: userUpdated.name,
    username: userUpdated.username
  }

  return res.status(200).send({
    success: true,
    data
  })
})

UserRouter.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete({ _id: id })
    res.status(200).send({
      success: true,
      message: 'Delete ok'

    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    })
  }
})
module.exports = UserRouter

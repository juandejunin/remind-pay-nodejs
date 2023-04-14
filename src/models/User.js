const { Schema, model }  = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  security: {
    verified: Boolean,
    cryptoToken: String,
    restorePassword: Boolean
  },
  subscriptions: [{
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
    delete returnedObject._id
  }
})

const User = model('User', userSchema)

const findOne = async (data) => {
  return await User.findOne(data)
}

const findById = async (id) => {
  return await User.findById(id).populate('courses')
}

const create = async (newUserData) => {
  const newUser = new User(newUserData)

  const user = await newUser.save()
  return user
}

const update = async (id, newUserData) => {
  return await User.findByIdAndUpdate(id, newUserData, { new: true })
}

module.exports = { findOne, findById, create, update }

const mongoose = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
  name_subscription: {
    type: String,
    required: true
  },
  payment_date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Typed.objectId,
    ref: 'User'
  }

})

module.exports = mongoose.model('Subscription', SubscriptionSchema)
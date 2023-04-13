const { mongoose, Schema } = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  nameSubscription: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  }

})

module.exports = mongoose.model('Subscription', SubscriptionSchema)

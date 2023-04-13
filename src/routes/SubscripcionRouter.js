const express = require('express')
const Subscription = require('../models/Subscription')
const SubscriptionRouter = express.Router()

// get Subscripcion
SubscriptionRouter.get('/subscription', async (req, res) => {
  const subscription = await Subscription.find({})
  return res.status(200).send({
    success: true,
    subscription
  })
})

SubscriptionRouter.get('/subscription/:id', async (req, res) => {
  try {
    const { id } = req.params
    const subscription = await Subscription.findById(id)

    if (!subscription) {
      return res.status(404).send({
        success: true,
        messagge: 'not get by id'
      })
    }
    return res.status(200).send({
      success: true,
      messagge: 'ok get by id',
      subscription
    })
  } catch (error) {
    return res.status(500).send({
      success: true,
      messagge: 'not get by id'
    })
  }
})
// Create Subscripcion

SubscriptionRouter.post('/subscription', async (req, res) => {
  try {
    const { userId, body } = req

    const { nameSubscription, paymentDate } = body

    if (!nameSubscription || !paymentDate) {
      return res.status(400).send({
        success: false,
        messagge: 'error'
      })
    }
    console.log(userId)

    const subscription = await new Subscription({
      nameSubscription,
      paymentDate,
      userId

    })
    await subscription.save()
    return res.status(200).send({
      success: true,
      messagge: 'ok',
      subscription
    })
  } catch (error) {
    return res.status(400).send({
      success: true,
      messagge: error.messagge
    })
  }
})

// Update Subscription
SubscriptionRouter.put('/subscription/:id', async (req, res) => {
  const { id } = req.params

  const subscriptioExists = await Subscription.findById({ _id: id })
  console.log(subscriptioExists)

  if (!subscriptioExists) {
    return res.status(404).send({
      success: false,
      message: 'error'
    })
  }

  const { nameSubscription, paymentDate } = req.body

  subscriptioExists.nameSubscription = nameSubscription || subscriptioExists.nameSubscription
  subscriptioExists.paymentDate = paymentDate || subscriptioExists.paymentDate

  const subscriptionUpdated = await Subscription.findByIdAndUpdate(id, subscriptioExists)

  const data = {

    nameSubscription: subscriptionUpdated.nameSubscription,
    paymentDate: subscriptionUpdated.paymentDate
  }

  return res.status(200).send({
    success: true,
    data
  })
})

// Delete Subscription
SubscriptionRouter.delete('/subscription/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Subscription.findByIdAndDelete({ _id: id })
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
module.exports = SubscriptionRouter

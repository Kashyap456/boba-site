const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isAdmin = require('../middlewares/isAdmin')

const Store = require('../models/store')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const stores = await Store.find()
    res.json(stores)
  } catch (e) {
    res.send('error occured')
  }
})

router.get('/logged', async (req, res) => {
  const logged = req.session.username
  if (logged) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.post('/addstore', isAdmin, async (req, res) => {
  try {
    const { name, address, imgurl } = req.body
    /*
    const geocoder = new google.maps.Geocoder()

    let latlng = {}
    geocoder.geocode({ address }, (results, status) => {
      const lat = results[0].geometry.location.lat()
      const lng = results[0].geometry.location.lng()
      latlng = { lat, lng }
    })
*/
    await Store.create({
      name, address, imgurl,
    })
    res.send('store was added successfully')
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/getstore', async (req, res) => {
  try {
    const { id } = req.body
    const store = await Store.findOne({ _id: id })
    res.json(store)
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/review', isAuthenticated, async (req, res) => {
  try {
    const { id, review } = req.body
    review.author = req.session.username
    const store = await Store.findById(id)
    const { reviews } = store
    const rev = reviews.find(({ author }) => author === req.session.username)
    if (!rev) {
      // review does not exist
      await Store.updateOne({ _id: id }, { $addToSet: { reviews: review } })
    } else {
      // review does exist, update
      rev.rating = review.rating
      rev.text = review.text
      await Store.updateOne({ _id: id }, { reviews })
    }
    const storeup = await Store.findById(id)
    const revs = storeup.reviews
    let sum = 0
    revs.forEach(e => {
      sum += parseInt(e.rating, 10)
    })
    const rate = (sum / revs.length)
    await Store.updateOne({ _id: id }, { rating: rate })
    res.send('review successfully added')
  } catch (e) {
    res.send('error occured')
  }
})

module.exports = router

const mongoose = require('mongoose')

const { Schema, model, Types } = mongoose

// const { Schema, model } = require('mongoose')

const storeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  reviews: { type: Array, default: [] },
  imgurl: { type: String, required: false, default: '' },
  latlng: { type: Object },
  rating: { type: Number, default: 1 },

  created_at: Date,
  updated_at: Date,
})

const Store = model('Store', storeSchema)

module.exports = Store

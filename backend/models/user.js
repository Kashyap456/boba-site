const mongoose = require('mongoose')

const { Schema, model } = mongoose

// const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  created_at: Date,
  updated_at: Date,
})

const User = model('User', userSchema)

module.exports = User

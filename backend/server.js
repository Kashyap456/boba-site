const cookieSession = require('cookie-session')

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const AccountRouter = require('./routes/account')
const StoreRouter = require('./routes/api')

const MONGO_URI = 'mongodb+srv://kashyap456:c9blaber@cluster0.ppm6c.mongodb.net/boba-site?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(express.json())

app.use(express.static('dist'))

app.use(
  cookieSession({
    name: 'session',
    keys: ['ezreal'],
    maxAge: 10 * 1000 * 24 * 60,
    httpOnly: false,
    secure: false,
  }),
)

app.get('/', (req, res) => {
  res.send('welcome to the CW lite API/DB')
})

app.use('/account', AccountRouter)
app.use('/api/stores', StoreRouter)

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use((err, req, res, next) => {
  if (!res.headersSent) {
    res.send(err.message)
    // next(err)
  }
  res.status(400)
})

app.listen(3000, () => {
  console.log('listening on 3000')
  console.log('mongoDB is connected')
})

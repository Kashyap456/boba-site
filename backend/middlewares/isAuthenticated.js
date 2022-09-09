const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    const err = new Error('Please log in to access this service')
    next(err)
  }
}

module.exports = isAuthenticated

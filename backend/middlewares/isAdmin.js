const isAdmin = (req, res, next) => {
  console.log(req.session)
  if (req.session.username && req.session.admin) {
    next()
  } else {
    const err = new Error('You are not an admin user')
    next(err)
  }
}

module.exports = isAdmin

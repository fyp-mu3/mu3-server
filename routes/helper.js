const error = require('./response').error
const _User = require('../models/User')
const User = new _User()

module.exports = {
  needAuth: (req, res, next) => {
    if (!req.query.emailAddress) {
      return error(res, -1, 'Unauthorized')
    }
    
    User.findOne({emailAddress: req.query.emailAddress}).then((_user) => {
      if (!_user) {
        error(res, -1, 'User not found')
      } else {
        req._user = _user
        next()
      }
    })
    .catch(err => error(res, -1, JSON.stringify(err)))
  }
}

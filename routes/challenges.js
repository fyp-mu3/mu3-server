var express = require('express')
var router = express.Router()
const _CodeChallenge = require('../models/CodeChallenge')
const CodeChallenge = new _CodeChallenge()

const _User = require('../models/User')
const User = new _User()

const needAuth = require('./helper').needAuth
const response = require('./response')

const some = require('lodash/some')

/* GET all challenges. */
router.get('/', needAuth, function (req, res, next) {
  CodeChallenge.find().then(function (challenges) {
    if (req._user && req._user.challenge_sessions) {
      Object.keys(req._user.challenge_sessions).forEach(key => {
        for (let challenge of challenges) {
          if (challenge.id === key) {
            challenge.session = req._user.challenge_sessions[key]
          }
        }
      })
    }

    res.json(challenges)
  })
  .catch((err) => res.json(err))
})

router.get('/startChallenge', needAuth, function (req, res, next) {
  if (!req.query.challenge_id) {
    response.error(res, -1, 'challenge id undefined')
  }

  if (!req._user.challenge_sessions) {
    req._user.challenge_sessions = {}
  }

  // if (req._user.challenge_sessions[req.query.challenge_id]) {
  //   return response.error(res, -2, 'challenge session already created')
  // }

  req._user.challenge_sessions[req.query.challenge_id] = {
    challenge_id: req.query.challenge_id,
    result: req.query.result === 'true',
    started: true
  }
  let updateUser = new _User(req._user)
  updateUser.save().then(result => {
    response.success(res, 1, result)
  })
})


module.exports = router

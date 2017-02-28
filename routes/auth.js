var express = require('express')
var router = express.Router()
const passport = require('passport')
const btoa = require('btoa')

const linkedInUtils = require('../app/common/linkedInUtils')

const User = require('../models/User')

/* GET users listing. */
router.get('/linkedin', passport.authenticate('linkedin'))

router.get('/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/auth/redirectSession',
    failureRedirect: 'http://localhost:8888/login'
  })
)

router.get('/redirectSession', (req, res, next) => {
  if (!req.session.passport || !req.session.passport.user) {
    res.json({
      status: -1,
      problem: {
        message: 'unexpected auth error'
      }
    })
    return
  }

  let parsedObj = linkedInUtils.mapLinkedInAuthResponseToUser(req.session.passport.user)

  let _session = Object.assign(req.session, {extractedUser: parsedObj})

  let encodedSession = btoa(JSON.stringify(_session))
  res.redirect(`http://localhost:8888/login?session=${encodedSession}`)
  // res.json({json: encodedSession})
})

router.get('/status', (req, res, next) => {
  let _email = null

  if (req.query.email) {
    _email = req.query.email
    console.log(_email);
    let abstractUser = new User({emailAddress: _email})
    abstractUser.exists(hasObj => res.json(
      {
        status: 1,
        problem: null,
        data: {
          email: _email,
          registered: hasObj
        }
      }
    ))
    return
  }

  if (!req.session.passport || !req.session.passport.user) {
    res.json({
      status: -1,
      problem: {
        message: 'No active session'
      }
    })
    return
  }

  // construct basic user object to check account existent
  let parsedObj = linkedInUtils.mapLinkedInAuthResponseToUser(req.session.passport.user)

  let abstractUser = new User(parsedObj)
  abstractUser.exists((hasObj) => {
    responseWithRegisterInfo(hasObj)
  })

  const responseWithRegisterInfo = (info) => {
    res.json({
      status: 1,
      problem: null,
      data: {
        rawUser: req.session.passport.user,
        extractedUser: parsedObj,
        registered: info
      }
    })
  }
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router

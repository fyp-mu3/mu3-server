var express = require('express')
var router = express.Router()
const passport = require('passport')
const btoa = require('btoa')

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
      error: 'unexpected auth error'
    })
    return
  }

  let encodedSession = btoa(JSON.stringify(req.session))
  res.redirect(`http://localhost:8888/login?session=${encodedSession}`)
  // res.json({json: encodedSession})
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router

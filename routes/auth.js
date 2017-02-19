var express = require('express')
var router = express.Router()
const passport = require('passport')

/* GET users listing. */
router.get('/linkedin', passport.authenticate('linkedin'))

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failWithError: true }),
  (req, res, next) => {
    // res.json({ linkedin: 'success', session: req.session })
    res.redirect('/')
  }
)

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router

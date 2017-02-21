var express = require('express')
var router = express.Router()
var getLinkedInProfile = require('../app/common/linkedInUtils').getLinkedInProfile

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (!req.session.passport.user.accessToken) {
    res.json({error: 'accessToken not found'})
    return
  }

  getLinkedInProfile(req.session.passport.user.accessToken)
  res.json(req.session)
})

module.exports = router

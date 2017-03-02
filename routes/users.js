var express = require('express')
var router = express.Router()
var getLinkedInProfile = require('../app/common/linkedInUtils').getLinkedInProfile
var User = require('../models/User')

/* GET users listing. */
router.put('/update', function (req, res, next) {
  // if (!req.session.passport.user.accessToken) {
  //   res.json({error: 'accessToken not found'})
  //   return
  // }

  let user = new User({
    username: req.body.username,
    level: 'user',
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress
  })

  user.save({upsert: true})
  .then((result) => {
    console.log(result)
    res.json(result)
  })
  .catch(err => { console.error(err); res.json(err) })
})

module.exports = router

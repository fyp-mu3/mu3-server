var express = require('express')
var router = express.Router()
var getLinkedInProfile = require('../app/common/linkedInUtils').getLinkedInProfile
var User = require('../models/User')
var CodeChallenge = require('../models/CodeChallenge')

const needAuth = require('./helper').needAuth
const response = require('./response')

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
    emailAddress: req.body.emailAddress,
    profile: req.body.profile
  })

  user.save({upsert: true})
  .then((result) => {
    console.log(result)
    res.json(result)
  })
  .catch(err => { console.error(err); res.json(err) })
})

router.get('/updateRanking', needAuth, async (req, res, next) => {
  let currentUser = req._user
  if (!currentUser.challenge_sessions) {
    let emptyRankModel = {
      username: currentUser.username,
      rank: 0,
      numSolvedChallenges: 0,
      solvedChallenges: []
    }
    return response.success(res, 1, emptyRankModel)
  }
  let challengeIds = Object.keys(currentUser.challenge_sessions)
  let solved = []
  challengeIds.forEach(key => {
    let challenge = currentUser.challenge_sessions[key]
    if (challenge && challenge.result === true) {
      solved.push(key)
    }
  })

  let _CodeChallenge = new CodeChallenge()
  let challenges = await _CodeChallenge.find({id: {$in: solved}})

  // s: 3, A: 2, B: 1, C: 0
  let maxRank = 0 // c

  for (let challenge of challenges) {
    let rank = challenge.rank || 0
    if (rank > maxRank) { maxRank = rank }
  }

  currentUser.rank = maxRank
  let user = new User(currentUser)
  const result = await user.save()
  
  // response ranking result
  let rankModel = {
    username: currentUser.username,
    rank: currentUser.rank,
    numSolvedChallenges: solved.length,
    solvedChallenges: challenges
  }
  
  response.success(res, 1, rankModel)
})

router.get('/get', (req, res, next) => {
  let user = new User()
  user.findOne(req.query)
  .then((doc) => {
    res.json(doc)
  })
})

module.exports = router

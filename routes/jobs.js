var express = require('express')
var router = express.Router()
const error = require('./response').error
const ok = require('./response').success
const needAuth = require('./helper').needAuth

const _Job = require('../models/Job')
const Job = new _Job()

const _User = require('../models/User')
const User = new _User()

const _Company = require('../models/Company')
const Company = new _Company()

const ObjectId = require('mongodb').ObjectID

const json2csv = require('json2csv')
const CSVFields = ['person', 'top100u', 'comp.rel.maj', 'worked.it.consult', 'worked.in.house', 'mbti.e', 'mbti.n', 'mbti.t', 'mbti.j']

const FileHelper = require('../app/common/FileHelper')

const containsObjectId = (array, objectId) => {
  let _objectId = objectId
  if (array) {
    if (typeof objectId === 'string') {
      _objectId = new ObjectId(objectId)
    }

    let result = array.filter(value => _objectId.equals(value._id))
    return result.length > 0
  } else {
    return false
  }
}

/* GET all challenges. */
router.get('/', needAuth, function (req, res, next) {
  Job.normalise().then(function (jobs) {
    let mapped = jobs.map((item, index) => {
      if (item.applicants && containsObjectId(item.applicants, req._user._id)) {
        item.applied = true
      } else {
        item.applied = false
      }

      if (typeof item.rankRequired === 'string') {
        if (item.rankRequired === 's') item.rankRequired = 3
        if (item.rankRequired === 'a') item.rankRequired = 2
        if (item.rankRequired === 'b') item.rankRequired = 1
        if (item.rankRequired === 'c') item.rankRequired = 0
      }

      item.canApply = (req._user.rank >= item.rankRequired)
      
      return item
    })
    res.json(mapped.filter(item => !item.delete))
  })
  .catch((err) => res.json(err))
})

router.get('/apply', needAuth, function (req, res, next) {
  let job_id = req.query.job_id
  if (!job_id) error(res, -1, 'job_id not found')

  Job.findOne({id: job_id}).then((doc) => {
    if (!doc) { return error(res, -1, 'job not found') }

    // save object by appending applicant id
    User.findOne({emailAddress: req._user.emailAddress}).then((_user) => {
      if (_user) {
        let jobDoc = new _Job(doc)
        jobDoc.appendApplicant(_user._id)
        jobDoc.save().then(updateDoc => ok(res, 1, updateDoc))
      } else {
        error(res, -1, 'user not found')
      }
    })
  })
})

router.get('/create', needAuth, (req, res, next) => {
  let query = req.query
  let parsed = JSON.parse(query.json)

  if (parsed) {
    let newJob = new _Job(_Job.transform(parsed))
    newJob.save().then((doc) => {
      ok(res, 1, doc)
    })
  } else {
    error(res, -1, 'failed to parse json object')
  }
})

router.get('/companies/me', needAuth, (req, res, next) => {
  Company.find({admin: req._user.emailAddress}).then((docs) => {
    ok(res, 1, docs)
  })
})

router.get('/computeRanking', needAuth, async (req, res, next) => {
  let job_id = req.query.job_id
  let industry = req.query.industry || 'consult'

  if (!job_id) {
    return error(res, -1, 'job_id not found')
  }

  // find all applicants
  const job = await Job.findOne({id: job_id})

  if (!job.applicants) { return error(res, -2, 'no applicants') }

  let applicants = []
  let rawApplicants = []
  for (let item of job.applicants) {
    const user = await User.findOne({_id: item})
    // applicants.push(user)
    applicants.push(transformUserToCSVModel(user))
    rawApplicants.push(user)
  }
  try {
    const csv = await convertJsonToCSV(applicants, CSVFields)

    await FileHelper.saveFileToRanking(csv, 'job-' + job.id + '.csv', industry)
    const result = await generateRankingResult(job.id, industry)

    // save result to job as temp ranking result
    let normalisedResult = result.map(row => {
      let matchedUser = null
      let filter = rawApplicants.filter(applicant => applicant.username === row.person)
      if (filter.length > 0) { matchedUser = filter[0] }
      row.user = matchedUser
      return row
    })
    job.ranking = normalisedResult
    const updateJob = new _Job(job)
    await updateJob.save()

    return ok(res, 1, result)
  } catch (e) {
    return error(res, -1, e)
  }
})

const transformUserToCSVModel = (user) => {
  // construct empty model with all fields
  let model = CSVFields.reduce((prev, cur) => {
    prev[cur] = 0
    return prev
  }, {})

  model.person = user.username
  model.top100u = user.profile.isTop100u ? 1 : 0
  model['mbti.e'] = user.profile.mbti.e
  model['mbti.n'] = user.profile.mbti.n
  model['mbti.t'] = user.profile.mbti.t
  model['mbti.j'] = user.profile.mbti.j

  // iterate all positions
  if (user.profile.positions && user.profile.mapped_positions) {
    user.profile.mapped_positions.forEach((position) => {
      if (position.category === 'cf') {
        model['worked.it.consult'] = 1
      }

      if (position.category === 'inhouse') {
        model['worked.in.house'] = 1
      }
    })
  }

  // education
  if (user.profile.education && user.profile.education.name) {
    if (user.profile.education.department === 'cs') {
      model['comp.rel.maj'] = 1
    }
  }

  return model
}

const convertJsonToCSV = (data, fields) => {
  return new Promise((resolve, reject) => {
    json2csv({ data: data, fields: fields }, (err, csv) => {
      if (err) {
        reject(err)
      } else {
        resolve(csv)
      }
    })
  })
}

const generateRankingResult = (job_id, industry) => {
  return new Promise((resolve, reject) => {
    const child = require('child_process').exec(`./generateRankingResult.sh ${job_id} ${industry}`)
    child.stdout.pipe(process.stdout)
    child.on('exit', function () {
      FileHelper.openRankingResult(job_id, industry).then(result => {
        resolve(result)
      })
    })
  })
}


module.exports = router

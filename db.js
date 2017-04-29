const url = '192.168.99.100:32768/mu3-dev'
const db = require('monk')(url)

db.then(() => {
  console.log('Connected to MongoDB instance')
}).catch((err) => {
  console.error('Fail to connect MongoDB with error', err)
})

/** initialisation */
const users = db.get('users')

/** check if root user exists */
users.findOne({username: 'root'}).then((root) => {
  return initRootUser()
})

module.exports = {
  db: db,
  MONGO_URL: url,
  collection: {
    users: users
  }
}

const User = require('./models/User')

/** utilities */
const initRootUser = () => {
  let rootUser = {
    username: 'root',
    level: 'admin',
    firstName: 'mu3',
    lastName: 'bot',
    emailAddress: 'cytangah@ust.hk',
    passwordSalt: '$mu3',
    passwordHash: '059925bd319f172b7e0b53ff3e34b1a2eafcf7dab01d36c74da06e4fcd5a7a34' // sha256(sha256(root), $mu3)
  }

  let rootUserObj = new User(rootUser)
  rootUserObj.save().then((result) => {
    console.log(result)
  }).catch((err) => {
    console.error(err)
  })
}

const CodeChallenge = require('./models/CodeChallenge')
const questions = require('./app/common/initQuestionBank')
const initCodeChallenges = () => {
  for (let question of questions) {
    let obj = new CodeChallenge(question)
    obj.save()
  }
}

const Company = require('./models/Company')
const companies = require('./app/common/companyBank')
const initCompanies = () => {
  for (let company of companies) {
    let obj = new Company(company)
    obj.save()
  }
}

const Job = require('./models/Job')
const jobs = require('./app/common/jobBank')
const initJobs = () => {
  for (let job of jobs) {
    let obj = new Job(job)
    obj.save()
  }
}

const University = require('./models/University')
const csv2json = require('csvtojson')
const initUniversities = () => {
  csv2json()
  .fromFile('./top100u.csv')
  .on('json', json => {
    let uni = new University({
      name: json.uni_name,
      abbr: json.abbr
    })
    uni.save()
  })
  .on('done', error => {
    if (error) return console.error(error)
  })
}

/** jobs */
initCodeChallenges()
initCompanies()
initJobs()
initUniversities()

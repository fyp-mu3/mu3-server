const db = require('monk')('192.168.99.100:32768/mu3-dev')

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

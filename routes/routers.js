const routers = [
  {
    path: '/',
    route: require('./index')
  },
  {
    path: '/users',
    route: require('./users')
  },
  {
    path: '/auth',
    route: require('./auth')
  },
  {
    path: '/challenges',
    route: require('./challenges')
  },
  {
    path: '/jobs',
    route: require('./jobs')
  }
]

module.exports = routers

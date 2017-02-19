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
  }
]

module.exports = routers

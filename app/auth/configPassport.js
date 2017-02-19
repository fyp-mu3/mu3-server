const passport = require('passport')
const linkedInApi = require('../../credentials').linkedin
const LinkedInStrategy = require('passport-linkedin').Strategy

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  /** LinkedIn */
  passport.use(
    new LinkedInStrategy({
      consumerKey: linkedInApi.clientId,
      consumerSecret: linkedInApi.secret,
      callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }, (token, tokenSecret, profile, done) => {
      console.log(profile)
      done(null, profile)
    })
  )
}

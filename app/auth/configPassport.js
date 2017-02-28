const passport = require('passport')
const linkedInApi = require('../../credentials').linkedin
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

const linkedInUtils = require('../common/linkedInUtils')

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  /** LinkedIn */
  passport.use(
    new LinkedInStrategy({
      clientID: linkedInApi.clientId,
      clientSecret: linkedInApi.secret,
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true
    }, (accessToken, refreshToken, profile, done) => {
      console.log({
        accessToken: accessToken,
        refreshToken: refreshToken,
        // profile: profile
      })
      done(null, {
        account_type: 'linkedin',
        accessToken: accessToken,
        id: profile.id,
        profile: profile,
        extractedUser: linkedInUtils.mapLinkedInAuthResponseToUser({profile: profile})
      })
    })
  )
}

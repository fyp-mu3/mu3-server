const passport = require('passport')
const linkedInApi = require('../../credentials').linkedin
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

const linkedInUtils = require('../common/linkedInUtils')

const _User = require('../../models/User')
const User = new _User()

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
      const extractedUser = linkedInUtils.mapLinkedInAuthResponseToUser({profile: profile})

      User.findOne({emailAddress: extractedUser.emailAddress}).then((systemUser) => {
        done(null, {
          account_type: 'linkedin',
          accessToken: accessToken,
          id: profile.id,
          profile: profile,
          extractedUser: extractedUser,
          systemUser: systemUser
        })
      })
    })
  )
}

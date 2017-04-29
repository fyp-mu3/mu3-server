const BaseModel = require('./BaseModel')

class User extends BaseModel {
  constructor (obj) {
    /** declare collection */
    super('users')

    this._data = obj
    this._key = 'emailAddress'
  }

  normalise () {
    return this._db.get(this._collection).aggregate([
      {
        $unwind: '$challenge_sessions'
      }
      // {
      //   $lookup: {
      //     from: 'codeChallenges',
      //     localField: 'challenge_id',
      //     foreignField: 'id',
      //     as: 'codeChallenge'
      //   }
      // }
    ])
  }
}

module.exports = User

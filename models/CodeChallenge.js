const BaseModel = require('./BaseModel')

class CodeChallenge extends BaseModel {
  constructor (obj) {
    super('codeChallenges')
    this._data = obj
    this._key = 'id'
  }
}

module.exports = CodeChallenge

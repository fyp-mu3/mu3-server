const BaseModel = require('./BaseModel')

class User extends BaseModel {
  constructor (obj) {
    super('users')

    this._data = obj
    this._key = 'emailAddress'
  }
}

module.exports = User

const BaseModel = require('./BaseModel')

class Company extends BaseModel {
  constructor (obj) {
    /** declare collection */
    super('company')

    this._data = obj
    this._key = 'id'
  }
}

module.exports = Company

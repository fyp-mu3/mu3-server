const BaseModel = require('./BaseModel')

class University extends BaseModel {
  constructor (obj) {
    /** declare collection */
    super('university')

    this._data = obj
    this._key = 'name'
  }
}

module.exports = University

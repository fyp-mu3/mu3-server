const db = require('../db').db

class BaseModel {
  constructor (collection) {
    this._collection = collection
    this._db = db
  }

  collection () {
    return this._db.get(this._collection)
  }

  uniqueFilter () {
    let filter = {}
    filter[this._key] = this._data[this._key]
    return filter
  }

  save (options = {upsert: true}) {
    const filter = {}
    filter[this._key] = this._data[this._key]

    return db.get(this._collection).findOne(filter)
    .then((doc) => {
      if (doc && options.upsert) {
        /** if user exists, update */
        return db.get(this._collection).update(doc, this._data)
      } else {
        return db.get(this._collection).insert(this._data)
      }
    })
  }
}

module.exports = BaseModel

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
    const filter = this.uniqueFilter()

    return db.get(this._collection).findOne(filter)
    .then((doc) => {
      if (doc) {
        /** if user exists, update */
        return db.get(this._collection).update(doc, { $set: this._data })
      } else {
        return db.get(this._collection).insert(this._data)
      }
    })
  }

  exists (cb) {
    return this.collection().findOne(this.uniqueFilter()).then((doc) => {
      cb(doc !== null)
    })
  }

  findOne (query) {
    return db.get(this._collection).findOne(query)
  }

  find (query) {
    return db.get(this._collection).find(query || {})
  }
}

module.exports = BaseModel

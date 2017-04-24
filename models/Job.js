const BaseModel = require('./BaseModel')
const ObjectID = require('mongodb').ObjectID
const uuid = require('uuid/v4')

class Job extends BaseModel {
  constructor (obj) {
    /** declare collection */
    super('jobs')

    this._data = obj
    this._key = 'id'
  }

  normalise () {
    return this._db.get(this._collection).aggregate([
      {
        $lookup: {
          from: 'company',
          localField: 'company',
          foreignField: 'id',
          as: 'company'
        }
      },
      {
        $unwind: '$company'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'applicants',
          foreignField: '_id',
          as: 'applicants'
        }
      }
    ])
  }

  appendApplicant (username) {
    let mongo_id = new ObjectID(username)
    if (!this._data.applicants) {
      this._data.applicants = []
    }

    let matches = this._data.applicants.filter((obj) => {
      return mongo_id.equals(obj)
    })
    if (matches.length === 0) {
      this._data.applicants.push(mongo_id)
    }
  }

  /** Helpers */
  static transform (raw) {
    let transformed = {
      id: uuid(),
      title: '',
      company: null,
      description: '',
      salary: '',
      rankRequired: 'c'
    }

    if (raw.title) { transformed.title = raw.title }
    if (raw.company) { transformed.company = raw.company }
    if (raw.description) { transformed.description = raw.description }
    if (raw.salary) { transformed.salary = raw.salary }
    if (raw.rankRequired) { transformed.rankRequired = raw.rankRequired }

    return transformed
  }

  static applicants (query) {
    
  }
}

module.exports = Job

const fs = require('fs')
const csv = require('csvtojson')

const saveFileToRanking = (data, filename, industry) => {
  return new Promise((resolve, reject) => {
    // const _path = '../../ranking/temp/' + filename
    const _path = `./ranking/${industry}/` + filename
    fs.writeFile(_path, data, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const openRankingResult = (job_id, industry) => {
  return new Promise((resolve, reject) => {
    const _path = `./ranking/temp/job-${job_id}-sorted.csv`
    console.info(_path)
    fs.readFile(_path, 'utf-8', (err, data) => {
      if (err) { reject(err) }

      let ranked = []

      csv()
      .fromString(data)
      .on('json', jsonObj => {
        ranked.push(jsonObj)
      })
      .on('done', (err) => {
        if (err) { return reject(err) }
        resolve(ranked)
      })
    })
  })
}

module.exports = {
  saveFileToRanking: saveFileToRanking,
  openRankingResult: openRankingResult
}

var express = require('express')
var router = express.Router()

const error = require('./response').error
const ok = require('./response').success

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(req.session)
});

router.get('/universities', async function (req, res, next) {
  const _University = require('../models/University')
  const University = new _University()

  let items = await University.find()
  ok(res, 1, items)
})

module.exports = router;

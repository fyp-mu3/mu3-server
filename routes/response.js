module.exports = {
  error: function (res, statusCode, errorMessage) {
    res.json({
      status: statusCode,
      problem: errorMessage
    })
  },
  success: function (res, statusCode = 1, data) {
    res.json({
      status: statusCode,
      data: data
    })
  }
}

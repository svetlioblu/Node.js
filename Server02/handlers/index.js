let staticFiles = require('./staticFiles')
let homePage = require('./homepage')
let postRequests = require('./postRequests')

let handlers = [
  homePage,
  staticFiles,
  postRequests
]
module.exports = handlers

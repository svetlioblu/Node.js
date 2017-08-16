let fs = require('fs')
let query = require('querystring')
let addId = require('./addId')
let storage = []

module.exports = (req, res) => {
  if (req.method === 'POST') {
    let body = ''

    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      let parsedBody = query.parse(body)
      storage.push(parsedBody)
      let storage2 = addId(storage)
      console.log(storage2)

      // operte with result
      // fs readfile
      
      res.writeHead(200)
      res.write(body)
      res.end()
    })
  } else {
    return true
  }
}

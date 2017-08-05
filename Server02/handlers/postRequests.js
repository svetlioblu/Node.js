let fs = require('fs')
let query = require('querystring')

module.exports = (req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      let result = query.parse(body)
      console.log(result)
      res.writeHead(200)
      res.write(body)
      res.end()
    })
  } else {
    return true
  }
}

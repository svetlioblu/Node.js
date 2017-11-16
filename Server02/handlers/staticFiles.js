let fs = require('fs')
let url = require('url')
let content = require('./contentType')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  let contentType = content(req.pathName)
  if (req.method === 'GET') {
    fs.readFile('.' + req.pathName, (err, data) => {
      if (err || !req.pathName.startsWith('/Server02/content')) {
        fs.readFile('./Server02/content/page404.html', (err, data) => {
          if (err) console.log(err)
          res.writeHead(404)
          res.write(data)
          res.end()
        })
      } else {
        res.writeHead(200, {
          'Content-Type': contentType
        })
        res.write(data)
        res.end()
      }
    })
  } else {
    return true
  }
}

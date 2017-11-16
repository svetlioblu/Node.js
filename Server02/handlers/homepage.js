let fs = require('fs')
let url = require('url')
let content = require('./contentType')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  let contentType = content(req.pathName)
  if (req.pathName === '/') {
    fs.readFile('./Server02/content/index.html', (err, data) => {
      if (err) {
        console.log(err)
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

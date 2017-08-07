let fs = require('fs')
let query = require('querystring')

module.exports = (req, res) => {
  if (req.method === 'POST') {
    let body = ''
    let arr = []
    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      let result = query.parse(body)
      arr.push(result)
      fs.writeFile('./db.json', 'module.exports = ' + JSON.stringify(result, null, 4), (err) => {
        console.log(err)
      })

      res.writeHead(200)
      res.write(body)
      console.log(arr)
      res.end()
    })
  } else {
    return true
  }
}

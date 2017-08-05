let http = require('http')
let port = process.env.PORT || 1111
let handlers = require('./handlers/index')
http
  .createServer((req, res) => {
    for (var handler of handlers) {
      let next = handler(req, res)
      if (!next) {
        break
      }
    }
  })
  .listen(port)
console.log(`Server listennin' on ${port} port`)

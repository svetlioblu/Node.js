const express = require('express')
const app = express()
const routes = require('./routes')

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(routes)
app.listen(3030, () => { console.log('RESTful server is listening on port 3030...') })
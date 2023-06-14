const express = require('express')
const app = express()
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: false }))

const routes = require('./routes')
app.use(routes)



app.listen(5000, () => { console.log('The server listening on port 5000...') })
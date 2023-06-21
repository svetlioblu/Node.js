const express = require('express')
const app = express()
const routes = require('./routes')

// This parse query strings. can use both middlewears
app.use(express.urlencoded({ extended: false }))
//RESTful recieves JSON post data(AJAX), regardless MPA , where used the above middlewear
app.use(express.json())
//CORS settings with 3 options config.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods',
        'OPTIONS,GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','*')

    next()
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(routes)
app.listen(3030, () => { console.log('RESTful server is listening on port 3030...') })
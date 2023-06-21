const express = require('express')
const app = express()
const routes = require('./routes')

// This parse query strings. can use both middlewears
app.use(express.urlencoded({ extended: false }))
//RESTful recieves JSON post data(AJAX), regardless MPA , where used the above middlewear
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(routes)
app.listen(3030, () => { console.log('RESTful server is listening on port 3030...') })
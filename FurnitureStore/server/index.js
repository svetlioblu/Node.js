const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')

const { auth } = require('./middleWears/authMiddlewear')

mongoose.connect('mongodb://127.0.0.1:27017/furnitures')
    .then(() => { console.log('DB Connected') })
    .catch(err => console.log(err))

// This parse query strings. can use both middlewears
app.use(express.urlencoded({ extended: false }))
//RESTful recieves JSON post data(AJAX), regardless MPA , where used the above middlewear
app.use(express.json())
//CORS settings with 3 options config.
app.use(cors()) 
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods',
//         'OPTIONS,GET,POST,PUT,PATCH,DELETE')
//     res.setHeader('Access-Control-Allow-Headers','*')

//     next()
// })

app.get('/', (req, res) => res.send('Hello from RESTful server'))


app.use(auth)
app.use(routes)

app.listen(3030, () => { console.log('RESTful server is listening on port 3030...') })
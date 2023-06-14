const express = require('express')
const handlebars = require('express-handlebars')

const routes = require('./routes')

//config express
const app = express()
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: false }))
// config handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', 'src/views')
//config routes 
app.use(routes)


app.listen(5000, () => { console.log('The server listening on port 5000...') })
const express = require('express')
const handlebars = require('express-handlebars')

const routes = require('./routes')

//config express
const app = express()

// config handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', 'src/views')

//config middlewears
app.use(express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)


app.listen(5000, () => { console.log('The server listening on port 5000...') })
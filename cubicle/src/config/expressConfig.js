const express = require('express')
const cookieParser = require('cookie-parser')

function expressConfig(app) {
    //express config to get static files
    app.use(express.static('src/assets'))
    // express config middlewear to parse post requests as object
    app.use(express.urlencoded({ extended: false }))
    // adding cookies feature 
    app.use(cookieParser())
}
module.exports = expressConfig
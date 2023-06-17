const router = require('express').Router()
const catalogservice = require('../services/catalogService')

router.get('/catalog', (req, res) => {

    res.render('photos/catalog')
})

module.exports = router
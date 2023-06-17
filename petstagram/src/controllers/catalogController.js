const router = require('express').Router()

router.get('/catalog', (req, res) => {
    res.render('photos/catalog')
})

module.exports = router
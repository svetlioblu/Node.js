const router = require('express').Router()
router.get('/', (req, res) => {
    res.send('First action')
})


module.exports = router
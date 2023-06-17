const router = require('express').Router()
const catalogService = require('../services/catalogService')

router.get('/catalog', async (req, res) => {
    const cards = await catalogService.getAll().lean()

    res.render('photos/catalog', { cards })
})

module.exports = router
const router = require('express').Router()
const catalogService = require('../services/catalogService')

router.get('/catalog', async (req, res) => {
    const cards = await catalogService.getAll().lean()

    res.render('photos/catalog', { cards })
})

router.get('/catalog/:name/:cardId', async (req, res) => {
    const cardId = req.params.cardId
    const oneCard = await catalogService.getOne(cardId).lean()
    const isOwner = req.user._id == oneCard.owner._id
    res.render('photos/details', { oneCard, isOwner })
})

module.exports = router
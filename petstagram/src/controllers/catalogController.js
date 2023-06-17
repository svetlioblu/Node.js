const router = require('express').Router()
const catalogService = require('../services/catalogService')


router.get('/catalog', async (req, res) => {
    const cards = await catalogService.getAll().lean()
    //TODO to show details in catalog for logged in user

    res.render('photos/catalog', { cards })
})

router.get('/catalog/:name/:cardId', async (req, res) => {
    const cardId = req.params.cardId
    const oneCard = await catalogService.getOne(cardId).lean()
    const isOwner = req.user?._id == oneCard.owner._id
    res.render('photos/details', { oneCard, isOwner })
})

router.get('/catalog/:name/:cardId/delete', async (req, res) => {
    const cardId = req.params.cardId
    
    await catalogService.delete(cardId)
    res.redirect('/catalog')
})
module.exports = router
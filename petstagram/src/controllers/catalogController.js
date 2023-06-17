const router = require('express').Router()
const catalogService = require('../services/catalogService')
const { getErrorMessage } = require('../utils/errorHelpers')

router.get('/catalog', async (req, res) => {
    const cards = await catalogService.getAll().lean()
    //TODO to show details in catalog for logged in user

    res.render('photos/catalog', { cards })
})

router.get('/catalog/:name/:cardId', async (req, res) => {
    const cardId = req.params.cardId
    try {
        const oneCard = await catalogService.getOne(cardId).lean()
        const isOwner = req.user?._id == oneCard.owner._id
        res.render('photos/details', { oneCard, isOwner })
    } catch (err) {
        res.render('photos/catalog', { error: getErrorMessage(err) })
    }

})

router.get('/catalog/:name/:cardId/delete', async (req, res) => {
    const cardId = req.params.cardId
    try {
        await catalogService.delete(cardId)
        res.redirect('/catalog')
    } catch (err) {
        res.render('photos/details', { error: 'Unsuccessful deleteion' })
    }

})
module.exports = router
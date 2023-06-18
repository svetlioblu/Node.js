const router = require('express').Router()
const catalogService = require('../services/catalogService')
const { getErrorMessage } = require('../utils/errorHelpers')

router.get('/catalog', async (req, res) => {
    const cards = await catalogService.getAll().lean()
    //TODO to show details in catalog for logged in user only
    res.render('photos/catalog', { cards })
})

router.get('/catalog/:name/:cardId', async (req, res) => {
    const cardId = req.params.cardId
    try {
        const oneCard = await catalogService.getOne(cardId).populate('comments.user').lean()
        const isOwner = req.user?._id == oneCard.owner._id
        res.render('photos/details', { oneCard, isOwner })
    } catch (err) {
        res.render('photos/catalog', { error: getErrorMessage(err) })
    }

})
router.get('/catalog/:name/:cardId/edit', async (req, res) => {
    const cardId = req.params.cardId
    try {
        const oneCard = await catalogService.getOne(cardId).lean()

        res.render('photos/edit', { oneCard })
    } catch (err) {
        res.render('photos/edit', { error: getErrorMessage(err) })
    }

})

router.post('/catalog/:name/:cardId/edit', async (req, res) => {
    const editedData = req.body
    const cardName = req.params.name
    const cardId = req.params.cardId
    try {
        await catalogService.edit(cardId, editedData)
        res.redirect(`/catalog/${cardName}/${cardId}`)
    } catch (err) {

        res.render('photos/edit', { error: getErrorMessage(err) })
    }
})

router.get('/catalog/:name/:cardId/delete', async (req, res) => {
    const cardId = req.params.cardId
    try {
        await catalogService.delete(cardId)
        res.redirect('/catalog')
    } catch (err) {
        const oneCard = await catalogService.getOne(cardId).lean()
        const isOwner = req.user?._id == oneCard.owner._id
        res.render('photos/details', { oneCard, isOwner, error: 'Unsuccessful deleteion' })
    }

})

router.post('/catalog/:cardName/:cardId/comments', async (req, res) => {

    const { cardName, cardId } = req.params
    const { message } = req.body
    const user = req.user._id

    try {
        await catalogService.addComment(cardId, { user, message })
        res.redirect(`/catalog/${cardName}/${cardId}`)
    } catch (err) {
        res.render('photos/details', { error: 'Unsuccessful Comment post!' })
    }

})

module.exports = router
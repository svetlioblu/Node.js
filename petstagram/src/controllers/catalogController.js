const router = require('express').Router()
const catalogService = require('../services/catalogService')
const { getErrorMessage } = require('../utils/errorHelpers')
const { isAuth } = require('../middlewears/authMiddlewear')

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
router.get('/catalog/:name/:cardId/edit', isAuth, async (req, res) => {
    const cardId = req.params.cardId
    try {
        const oneCard = await catalogService.getOne(cardId).lean()

        res.render('photos/edit', { oneCard })
    } catch (err) {
        res.render('photos/edit', { error: getErrorMessage(err) })
    }

})

router.post('/catalog/:name/:cardId/edit', isAuth, async (req, res) => {
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

router.get('/catalog/:name/:cardId/delete', isAuth, async (req, res) => {
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

router.post('/catalog/:cardName/:cardId/comments', isAuth, async (req, res) => {

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

router.get('/users/profile', isAuth, async (req, res) => {
    const userId = req.user._id
    try {
        const userPosts = await catalogService.getOneUserCards(userId).lean()

        res.render('users/profile', { userPosts, photoCount: userPosts.length })
    } catch (err) {
        res.render('users/profile', { error: 'Unsuccessful Own posts Load!' })
    }

})


module.exports = router
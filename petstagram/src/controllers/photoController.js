const router = require('express').Router()
const photoService = require('../services/photoService')
const { getErrorMessage } = require('../utils/errorHelpers')
router.get('/create', (req, res) => {
    res.render('photos/create')
})
router.post('/create', async (req, res) => {
    const photoCreateData = req.body
    try {
        await photoService.create(photoCreateData)
        res.redirect('/catalog')
    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }
})

module.exports = router 
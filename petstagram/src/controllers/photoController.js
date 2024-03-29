const router = require('express').Router()
const photoService = require('../services/photoService')
const { getErrorMessage } = require('../utils/errorHelpers')
const { isAuth } = require('../middlewears/authMiddlewear')

router.get('/create', (req, res) => {
    res.render('photos/create')
})

router.post('/create', isAuth, async (req, res) => {
    const photoCreateData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await photoService.create(photoCreateData)
        res.redirect('/catalog')
    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }
})

module.exports = router 
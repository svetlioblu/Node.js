const router = require('express').Router()
const animalService = require('../services/animalService')
const { getErrorMessage } = require('../utils/errorHelpers')


router.get('/', async (req, res) => {
    try {
        const latestUploadedAnuimals = await animalService.getAll().limit(3).sort({ '_id': -1 }).lean()

        res.render('home', { latestUploadedAnuimals })
    } catch (err) {
        res.render('home', { error: getErrorMessage(err) })
    }
})


router.get('/404', (req, res) => {
    res.render('404')

})


module.exports = router
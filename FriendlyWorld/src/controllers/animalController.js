const router = require('express').Router()
const animalService = require('../services/animalService')
const { getErrorMessage } = require('../utils/errorHelpers')
const { isAuth } = require('../middlewears/authMiddlewear')

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', isAuth, async (req, res) => {
    const animalCreateData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await animalService.create(animalCreateData)
        res.redirect('/dashboard')
    } catch (err) {
        res.render('create', { error: getErrorMessage(err) })
    }
})

///Working on dashBoard

router.get('/dashboard', async (req, res) => {
    try {
        const animals = await animalService.getAll().lean()
        res.render('dashboard', { animals })
    } catch (err) {
        res.render('dashboard', { error: getErrorMessage(err) })
    }
})

router.get('/dashboard/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId
    try {
        const oneAnimal = await animalService.getOne(animalId).populate('donations.user').lean()

        const isOwner = req.user?._id == oneAnimal.owner._id
        const isNotOwner = req.user?._id != oneAnimal.owner._id


        //console.log(oneAnimal.owner._id)

        res.render('details', { oneAnimal, isOwner, isNotOwner })
    } catch (err) {
        res.render('details', { error: getErrorMessage(err) })
    }
})

//GET Edit
router.get('/dashboard/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId
    try {
        const oneAnimal = await animalService.getOne(animalId).lean()

        res.render('edit', { oneAnimal })
    } catch (err) {
        res.render('photos/edit', { error: getErrorMessage(err) })
    }

})
// POST EDIT
router.post('/dashboard/:animalId/edit', isAuth, async (req, res) => {
    const editedData = req.body
    
    const animalId = req.params.animalId
    try {
        await animalService.edit(animalId, editedData)
        res.redirect(`/dashboard/${animalId}/details`)
    } catch (err) {

        res.render('edit', { error: getErrorMessage(err) })
    }
})


router.get('/search', (req, res) => {
    res.render('search')
})
module.exports = router 
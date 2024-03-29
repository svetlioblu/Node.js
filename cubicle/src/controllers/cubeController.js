const router = require('express').Router()

const cubeManager = require('../managers/cubeManager')
const accessoryManager = require('../managers/accessoryManager')
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers')
const { isAuth } = require('../middlewears/authMiddlewear')
const { extractErrorMessages } = require('../utils/errorHelpers')
const { get } = require('mongoose')


// !the controller in index.js is set to /cubes/create. Main layout a href = /cubes/create
//render the form create page
router.get('/create', isAuth, (req, res) => {

    res.render('cube/create')
})

//Send the data when the form is submited. The form has action /cubes/create and meth=POST
router.post('/create', isAuth, async (req, res) => {

    // req.body have the parced data to object due to the express middleware bodyparser config
    const { name, description, imageUrl, difficultyLevel } = req.body
    //The idea of destructoring is to have validation ...
    try {
        await cubeManager.create({
            name,
            description,
            imageUrl,
            difficultyLevel: Number(difficultyLevel),
            owner: req.user._id
        })
        res.redirect('/')

    } catch (err) {
        const errorMessages = extractErrorMessages(err)
        res.status(404).render('cube/create', { errorMessages })
    }

})

router.get('/:cubeId/details', async (req, res) => {

    const cube = await cubeManager.getOne(req.params.cubeId).lean()

    if (!cube) {
        return res.redirect('/404')
    }
    const isOwner = cube.owner?.toString() === req.user?._id

    res.render('cube/details', { cube, isOwner })
})

// cubeAttachController details page
router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean()

    const accessories = await accessoryManager.getAvailable(cube.accessories).lean()

    const hasAccsseories = accessories.length > 0

    res.render('accessory/attach', { cube, accessories, hasAccsseories })
})

router.post('/:cubeId/attach-accessory', async (req, res) => {
    //taking the name attribute comming from the select in attach.hbs
    //that wy will retutn the accessory comming fro mthe form
    const { accessory } = req.body
    const cubeId = req.params.cubeId

    await cubeManager.attachAccessory(cubeId, accessory)

    res.redirect(`/cubes/${cubeId}/details`)
})

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean()
    const options = getDifficultyOptionsViewData(cube.difficultyLevel)

    res.render('cube/deleteCubePage', { cube, options })
})
router.post('/:cubeId/delete', async (req, res) => {
    await cubeManager.delete(req.params.cubeId)
    res.redirect('/')
})

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean()
    //additional deffence if use postman
    if (cube.owner.toString() !== req.user._id) {
        return res.redirect('/404')
    }
    const options = getDifficultyOptionsViewData(cube.difficultyLevel)
    res.render('cube/editCubePage', { cube, options })
})
router.post('/:cubeId/edit', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    await cubeManager.update(req.params.cubeId, { name, description, imageUrl, difficultyLevel })
    res.redirect(`/cubes/${req.params.cubeId}/details`)
})
module.exports = router
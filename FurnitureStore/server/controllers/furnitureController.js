const router = require('express').Router()

const furnitureService = require('../services/furnitureService')

router.get('/', async (req, res) => {
    try {
        const furnitures = await furnitureService.getAll()

        res.status(200).json(furnitures)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        await furnitureService.create({
            ...req.body,
            _ownerId: req.user._id
        })

        res.status(201).end()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

})

module.exports = router
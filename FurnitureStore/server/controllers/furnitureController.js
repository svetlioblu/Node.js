const router = require('express').Router()

const furnitureService = require('../services/furnitureService')

router.post('/', async (req, res) => {
    try {
        await furnitureService.create(req.body)

        res.status(201).end()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

})

module.exports = router
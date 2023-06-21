const router = require('express').Router()

const userService = require('../services/userService')

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        await userService.register({ email, password })
        res.end()
    } catch (err) {

    }

})

module.exports = router
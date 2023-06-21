const router = require('express').Router()

const userService = require('../services/userService')

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await userService.register({ email, password })
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Some Error'
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const result = await userService.login(req.body)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Some Error'
        })
    }

})

router.get('/logout', (req, res) => {
    //TODO: Invalidate Token

    res.end()
})

module.exports = router
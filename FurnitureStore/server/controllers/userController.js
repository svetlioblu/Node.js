const router = require('express').Router()

const userService = require('../services/userService')

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userService.register({ email, password })

        res.json({
            email: user.email,
            AuthToken: 'noToken',
            UserId: user._id,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Some Error'
        })
    }

})

module.exports = router
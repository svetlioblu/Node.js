const router = require('express').Router()

const userManager = require('../managers/userManager')
const { extractErrorMessages } = require('../utils/errorHelpers')

router.get('/register', (req, res) => {
    res.render('user/registerPage')
})

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body
    try {
        await userManager.register({ username, password, repeatPassword })

        res.redirect('/users/login')
    } catch (err) {
        //res.status(400).send(err.message)
        //res.status(404).render('user/registerPage', { errorMessage: err.message })
        //const firstErrorMsg =Object.values(err.errors)[0].message
        //const errorMessages = Object.values(err.errors).map(x => x.message)
        const errorMessages = extractErrorMessages(err)

        res.status(404).render('user/registerPage', { errorMessages })
    }

})

router.get('/login', (req, res) => {
    res.render('user/loginPage')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const token = await userManager.login(username, password)
        res.cookie('auth', token, { httpOnly: true })
        res.redirect('/')
    } catch (err) {
        const errorMessages = [err.message]
        console.log(errorMessages)
        res.status(404).render('user/loginPage', {errorMessages})
        
    }

})

router.get('/logout', (req, res) => {
    res.clearCookie('auth')

    res.redirect('/')
})

module.exports = router
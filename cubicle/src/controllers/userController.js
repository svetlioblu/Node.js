const router = require('express').Router()

const userManager = require('../managers/userManager')

router.get('/register', (req, res) => {
    res.render('user/registerPage')
})

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body
    await userManager.register({ username, password, repeatPassword })

    res.redirect('users/loginPage')
})

router.get('/login',(req,res)=>{
    res.render('user/loginPage')
})

module.exports = router
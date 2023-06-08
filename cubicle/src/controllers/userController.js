const router = require('express').Router()

router.get('/register', (req, res) => {
    res.render('user/registerPage')
})

router.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body
     
    res.redirect('users/login')
})

module.exports = router
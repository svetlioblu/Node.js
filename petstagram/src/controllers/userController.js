const router = require('express').Router()

const userService = require('../services/userService')

router.get('/login', (req, res) => {
    res.render('users/login')
})
router.post('/login', (req, res) => {

})


router.get('/register', (req, res) => {
    res.render('users/register')
})



module.exports = router
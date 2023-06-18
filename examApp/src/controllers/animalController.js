const router = require('express').Router()
//const photoService = require('../services/photoService')
const { getErrorMessage } = require('../utils/errorHelpers')
const { isAuth } = require('../middlewears/authMiddlewear')

router.get('/create', (req, res) => {
    res.render('create')
})





module.exports = router 
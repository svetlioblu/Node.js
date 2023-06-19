const router = require('express').Router()
const animalService = require('../services/animalService')
router.get('/', async (req, res) => {
    const allAnimals = await animalService.getAll().limit(3).sort({'_id': 1}).lean()
    console.log(allAnimals)
  
    res.render('home')
})


router.get('/404', (req, res) => {
    res.render('404')

})


module.exports = router
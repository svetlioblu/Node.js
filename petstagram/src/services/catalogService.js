const Photo = require('../models/Photo')

exports.getAll = () => {
    return Photo.find().populate('owner')
}

exports.getOne = (cardId) => {
    return Photo.findById(cardId)
}
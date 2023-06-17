const Photo = require('../models/Photo')

exports.getAll = () => {
    return Photo.find().populate('owner')
}

exports.getOne = (cardId) => {
    return Photo.findById(cardId).populate('owner')
}

exports.delete = (cardId) => Photo.findByIdAndDelete(cardId)

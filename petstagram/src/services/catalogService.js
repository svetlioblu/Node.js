const Photo = require('../models/Photo')

exports.getAll = () => {
    return Photo.find().populate('owner')
}

exports.getOne = (cardId) => {
    return Photo.findById(cardId).populate('owner')
}

exports.edit = (cardId, editData) => {
    return Photo.findByIdAndUpdate(cardId, editData)
}

exports.delete = (cardId) => {
    return Photo.findByIdAndDelete(cardId)
}

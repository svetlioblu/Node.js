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

exports.addComment = async (cardId, commentData) => {
    const card = await Photo.findById(cardId)

    card.comments.push(commentData)
    //after push needs save
    return card.save()
}

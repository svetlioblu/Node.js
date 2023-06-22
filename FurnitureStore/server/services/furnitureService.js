const Furniture = require('../models/Furniture')

exports.create = (furnitureData) => Furniture.create(furnitureData)

exports.getAll = () => Furniture.find()

exports.getOne = (ownerId) => Furniture.findById(ownerId)

exports.update = (furnitureId, data) => Furniture.findByIdAndUpdate(furnitureId, data)

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId)



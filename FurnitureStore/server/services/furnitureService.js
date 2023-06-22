const Furniture = require('../models/Furniture')

exports.create = (furnitureData) => Furniture.create(furnitureData)

exports.getAll = async (qs) => {
    let query = Furniture.find()

    //if no where will take all
    if (qs.where) {
        let [fieldName, ownerId] = qs.where.split('=')
        ownerId = ownerId.replaceAll('"', '')
        query = query.where('_ownerId').eq(ownerId)
    }
    const result = await query
    return result
}

exports.getOne = (ownerId) => Furniture.findById(ownerId)

exports.update = (furnitureId, data) => Furniture.findByIdAndUpdate(furnitureId, data)

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId)



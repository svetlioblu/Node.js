const Animal = require('../models/Animal')

exports.create = (animalCreateData) => Animal.create(animalCreateData)

exports.getAll = () => {
    return Animal.find().populate('owner')
}

exports.getOne = (animalId) => {
    return Animal.findById(animalId).populate('owner')
}

exports.edit = (animalId, editData) => {
    return Animal.findByIdAndUpdate(animalId, editData)
}
exports.delete = (animalId) => {
    return Animal.findByIdAndDelete(animalId)
}

exports.donate = async (animalId, ownerId) => {
    const currentDonatedAnimal = await Animal.findById(animalId)
    currentDonatedAnimal.donations.push({ user:ownerId })
    currentDonatedAnimal.save()
 return
}

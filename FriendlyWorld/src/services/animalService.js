const Animal = require('../models/Animal')

exports.create = (animalCreateData) => Animal.create(animalCreateData)

exports.getAll = () => {
    return Animal.find().populate('owner')
}

exports.getOne = (animalId) => {
    return Animal.findById(animalId)
}

exports.edit = (animalId, editData) => {
    return Animal.findByIdAndUpdate(animalId, editData)
}
exports.delete = (animalId) => {
    return Animal.findByIdAndDelete(animalId)
}

exports.donate = async (animalId, ownerId) => {
    const currentDonatedAnimal = await Animal.findById(animalId)
    const isDonated = currentDonatedAnimal.donations.find(x => x.user == ownerId)
    if (!isDonated) {
        currentDonatedAnimal.donations.push({ user: ownerId })
        currentDonatedAnimal.save()
        return isDonated
    } else {
        throw new Error('You can donate only once for that Animal!')
    }
}

exports.search = async (searchQuery) => {
    const regex = new RegExp(searchQuery, 'i')
    return await Animal.find({ location: regex}).lean()
}
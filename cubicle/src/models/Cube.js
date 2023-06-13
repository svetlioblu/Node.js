const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required!'],
        minLength: [3, 'The name should have at least 3 chars!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'The description should have at least 10 chars!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match:[/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,'The URL is not correct. Add a valide one!']
    },
    difficultyLevel: Number,
    //relations
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Cube = mongoose.model('Cube', cubeSchema)

module.exports = Cube
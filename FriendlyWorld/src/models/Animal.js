const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        minLength: [2, 'The name has to be at least 2 chars !'],
    },
    years: {
        type: Number,
        required: [true, 'Years link is required !'],
        min: [1, 'The year is not correct, starts from 1'],
        max: [100, 'The year is not correct']


    },
    kind: {
        type: String,
        required: [true, 'Kind is required !'],
        minLength: [3, 'The kind has to be at least 2 chars !']

 
    },
    image: {
        type: String,
        required: [true, 'Image is required !'],
        match: [/^https?:\/\//, 'The imge format not match !']

    },
    need: {
        type: String,
        required: [true, 'Need is required !']
    },
    location: {
        type: String,
        required: [true, 'Location is required !']
    },
    description: {
        type: String,
        required: [true, 'Description is required !']
    },
    donations: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})


const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal
const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength:[3,'The name should be at least 3 chars long !'],
        required: [true, 'Name is required !']
    },
    image: {
        type: String,
        required: [true, 'Image link is required !'],
        match:[/^https?:\/\//,'The image URL is not in correct format!']
    },
    age: {
        type: Number,
        min:1,
        max:40,
        required: [true, 'Age is required !']
 
    },
    description: {
        type: String,
        required: [true, 'Description is required !']
    },
    location: {
        type: String,
        required: [true, 'Location is required !']
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            message: {
                type: String,
                required: [true, 'comment message is required!']
            }
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})


const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
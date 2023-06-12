const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value)
            },
            message: `Invalid password characters!`
        }
    }
})
// Model based validation. repeatPassword is passed as arg.Work with
//function declaration because of 'this'
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password Missmatch!!! ')
        }
    })

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
})


const User = mongoose.model('User', userSchema)

module.exports = User
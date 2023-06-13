const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'UserName is Required !'],
        minLength: [5, 'The name should be at least 5 chars! '],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required !'],
        minLength: [8, 'The password should be at least 8 chars! '],
        match: [/^[A-Za-z0-9]+$/, 'Password must be alphanumeric'],
    }
})
// Model based validation. repeatPassword is passed as arg.Work with
//function declaration because of 'this'
userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Password Missmatch!!! ')
        }
    })

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
})


const User = mongoose.model('User', userSchema)

module.exports = User
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Username is required!'],
        minLength:[10, 'Require minimum 10 chars!'],
        unique: true
    },
    password: {
        type: String,
        minLength:[4, 'Password Require minimum 4 chars!'],
        required: [true,'Password is required!']
    }
})

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!')
        }
    })
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User
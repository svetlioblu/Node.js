const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: [true,'Email is required!'],
        minlength:10
    },
    password: {
        type: String,
        required: [true,'Password is required!'],
        minlength:4
    }
})

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!')
        }
    })
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 5)
    this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User
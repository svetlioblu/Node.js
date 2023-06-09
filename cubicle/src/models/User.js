const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: String,
    password: String
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
//TODO if user already exists

const User = mongoose.model('User', userSchema)

module.exports = User
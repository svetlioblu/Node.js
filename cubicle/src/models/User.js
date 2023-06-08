const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})
// Model based validation. repeatPassword is passed as arg
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password Missmatch!!! ')
        }
    })

const User = mongoose.model('User', userSchema)

module.exports = User
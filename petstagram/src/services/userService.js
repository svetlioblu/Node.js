const User = require('../models/User')
const bcrypt = require('bcrypt')
const jsonWebToken = require('../lib/jwt')
const { secret } = require('../lib/secret')

exports.login = async (username, password) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error('Innvalid user or password!')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Innvalid user or password!')
    }
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    const token = await jsonWebToken.sign(payload, secret)
}

exports.register = async (userRegisterData) => {
    const user = await User.findOne({ username: userRegisterData.username })
    if (user) {
        throw new Error('Username already Exists !')
    }

    return User.create(userRegisterData)
}
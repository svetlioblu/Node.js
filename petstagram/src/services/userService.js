const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.login = async (username, password) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error('Innvalid user or password!')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Innvalid user or password!')
    }
    
}

exports.register = async (userRegisterData) => {
    const user = await User.findOne({ username: userRegisterData.username })
    if (user) {
        throw new Error('Username already Exists !')
    }

    return User.create(userRegisterData)
}
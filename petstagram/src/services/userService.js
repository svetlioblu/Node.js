const User = require('../models/User')

exports.login = (username, password) => {
    // const user = User.findOne({ username: username })
}

exports.register = async (userRegisterData) => {
    const user = await User.findOne({ username: userRegisterData.username })
    if (user) {
        throw new Error('Username already Exists !')
    }

    return User.create(userRegisterData)
}
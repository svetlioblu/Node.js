const User = require('../models/User')

exports.login = (username, password) => {
    // const user = User.findOne({ username: username })
}

exports.register = (userRegisterData) => {
    User.create(userRegisterData)
}
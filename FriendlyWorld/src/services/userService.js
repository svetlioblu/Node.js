const User = require('../models/User')
const bcrypt = require('bcrypt')

const { generateToken } = require('../lib/generateToken')

exports.login = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Innvalid user or password!')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Innvalid user or password!!')
    }

    return generateToken(user)
}

exports.register = async (userRegisterData) => {

    const isExistingUser = await User.findOne({ email: userRegisterData.email })
   

    if (isExistingUser) {
        throw new Error('UserEmail already Exists !')
    }
    //automatic login on register

    const user = await User.create(userRegisterData)

    return generateToken(user)
}
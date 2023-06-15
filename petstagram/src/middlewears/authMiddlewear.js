const jsonWebToken = require('../lib/jwt')
const { secret } = require('../lib/secret')
exports.auth = async (req, res, next) => {
    const token = req.cookies['auth']

    if (token) {
        try {
            const decodedToken = await jsonWebToken.verify(token, secret)
            req.user = decodedToken
            res.locals.user = decodedToken
            next()
        } catch (err) {
            res.clearCookie('auth')
            res.redirect('/users/login')
        }

    } else { 
        next()
    }
}
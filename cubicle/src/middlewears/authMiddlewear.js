const jwt = require('../lib/jwt')
const { SECRET } = require('../config/config')


exports.auth = async (req, res, next) => {
    const token = req.cookies['auth']

    if (token) {
        //validate token
        try {
            //verify checks the the expiration too
            const user = await jwt.verify(token, SECRET)
            //save the info from the token to request
            req.user = user
            next()

        } catch (err) {
            res.clearCookie('auth')
            res.redirect('/users/login')
        }
    } else {
        next()
    }

}
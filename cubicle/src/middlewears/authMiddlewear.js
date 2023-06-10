const jwt = require('../lib/jwt')
const { SECRET } = require('../config/config')


exports.auth = async (req, res, next) => {
    const token = req.cookies['auth']

    if (token) {
        //validate token
        try {
            //verify checks the the expiration too
            const decodedUser = await jwt.verify(token, SECRET)
            //save the info from the token to request
            req.user = decodedUser
            res.locals.user = decodedUser
            //res.locals provide varibeles for both req/res and can be acsessed fro mthe views
            res.locals.isAuthenticated = true

            next()

        } catch (err) {
            res.clearCookie('auth')
            res.redirect('/users/login')
        }
    } else {
        next()
    }

}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login')
    }
    next()
}
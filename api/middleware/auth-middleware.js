const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./../secrets')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        next({status: 401, message: 'token required'})
    } else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                next(err)
            } else {
                req.decodedJWT = decodedToken
                next()
            }
        })
    }
}

const forInstructor = (req, res, next) => {
    if (!req.decodedJWT.isInstructor) {
        next({status: 403, message: 'this is for instructor'})
    } else {
        next()
    }
}
module.exports = {
    restricted,
    forInstructor
}
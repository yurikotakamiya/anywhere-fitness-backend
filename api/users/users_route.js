const User = require('./users_model')
const router = require('express').Router()
const {
        validateInputs,
        uniqueUsername,
        usernameExists
        } = require('./../middleware/user-middleware')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./../secrets')
const bcrypt = require('bcryptjs')

router.post('/register', validateInputs, uniqueUsername, (req, res, next) => {
    const { username, password, isInstructor } = req.body
    const hash = bcrypt.hashSync(password, 12)
    User.create({username, password: hash, isInstructor})
        .then(user => {
            res.json(user)
        })
        .catch(e => next(e))
})

router.post('/login', validateInputs, usernameExists, (req, res, next) => {
    const { password } = req.body
    if (bcrypt.compareSync(password, req.user.password)) {
        const token = generateToken(req.user)
        res.json({
            message: `Welcome ${req.user.username}`,
            token
        })
    } else {
        next({status: 404, message: 'user not found'})
    }
})

// router.get('/logout', (req, res, next) => {
//     if (req.session.user) {
//         req.session.destroy(err => {
//             if (err) {
//                 next(err)
//             } else {
//                 res.json({message: 'logged out successfully'})
//             }
//         })
//     } else {
//         res.json({message: 'session was not found'})
//     }
// })

function generateToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        isInstructor: user.isInstructor,
    }
    const option = {
        expiresIn : '1d'
    }
    return jwt.sign(payload, JWT_SECRET, option)
}

module.exports = router